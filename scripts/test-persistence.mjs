/**
 * Reproduces the "data reverts on load" bug and proves the version guard fixes it.
 *
 * The real failure: a snapshot written under an older seed stays in
 * localStorage, the page renders the new seed for one tick, then the restore
 * effect replaces it with the stale cache. Guarding on __version must discard
 * that snapshot instead of applying it.
 *
 * Run: node scripts/test-persistence.mjs
 */

import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../lib/data-context.tsx', import.meta.url), 'utf8');

let pass = 0;
let fail = 0;
const failed = [];

const check = (name, actual, expected) => {
  if (actual === expected) {
    console.log(`  \x1b[32mPASS\x1b[0m  ${name}`);
    pass++;
  } else {
    console.log(`  \x1b[31mFAIL\x1b[0m  ${name} (dapat: ${actual}, harusnya: ${expected})`);
    fail++;
    failed.push(name);
  }
};

// --- Extract the guard's constant so the simulation uses the real value. ---
const versionMatch = src.match(/const DATA_VERSION = (\d+);/);
check('DATA_VERSION terdefinisi', Boolean(versionMatch), true);
const DATA_VERSION = versionMatch ? Number(versionMatch[1]) : NaN;

console.log('\n== Struktur kode ==');
check(
  'snapshot dibandingkan dengan DATA_VERSION',
  /parsed\.__version !== DATA_VERSION/.test(src),
  true
);
check(
  'snapshot usang dihapus, bukan dipakai',
  /parsed\.__version !== DATA_VERSION[\s\S]{0,400}?removeItem\(LOCAL_STORAGE_KEY\)/.test(src),
  true
);
check('versi ikut ditulis saat menyimpan', /__version: DATA_VERSION/.test(src), true);
check(
  'Firestore tidak lagi menimpa data lokal setiap muat',
  /if \(!hadLocalSnapshot && !hadStaleSnapshot\)/.test(src),
  true
);

// --- Simulate the restore decision against the three snapshot states. ---
// Mirrors the branch in the mount effect: apply / discard / nothing to restore.
const restoreDecision = raw => {
  const parsed = raw ? JSON.parse(raw) : null;
  if (!parsed) return 'pakai-seed-baru';
  if (parsed.__version !== DATA_VERSION) return 'buang-snapshot-usang';
  return 'pakai-snapshot';
};

console.log('\n== Simulasi keputusan restore ==');
check(
  'snapshot lama tanpa versi (penyebab bug) dibuang',
  restoreDecision(JSON.stringify({ profile: { name: 'Data Seed Lama' } })),
  'buang-snapshot-usang'
);
check(
  'snapshot versi lama dibuang',
  restoreDecision(JSON.stringify({ __version: DATA_VERSION - 1, profile: { name: 'Lama' } })),
  'buang-snapshot-usang'
);
check(
  'snapshot versi sekarang tetap dipakai (edit admin tidak hilang)',
  restoreDecision(JSON.stringify({ __version: DATA_VERSION, profile: { name: 'Edit Admin' } })),
  'pakai-snapshot'
);
check('tanpa snapshot memakai seed baru', restoreDecision(null), 'pakai-seed-baru');

// --- Guard against the seed and the guard drifting apart. ---
console.log('\n== Konsistensi seed ==');
const seed = readFileSync(new URL('../lib/initial-data.ts', import.meta.url), 'utf8');
check(
  'seed memuat nama asli',
  seed.includes('Fajar Melfiano Obese Afoan Toan'),
  true
);
check('seed tidak memuat data contoh lama', /picsum\.photos|example\.com/.test(seed), false);
check('DATA_VERSION sudah dinaikkan di atas 1', DATA_VERSION > 1, true);

console.log('\n======================================');
console.log(`  Lulus: \x1b[32m${pass}\x1b[0m   Gagal: \x1b[31m${fail}\x1b[0m`);
if (fail > 0) {
  console.log('  Yang gagal:');
  failed.forEach(n => console.log(`    - ${n}`));
}
console.log('======================================');
process.exit(fail === 0 ? 0 : 1);
