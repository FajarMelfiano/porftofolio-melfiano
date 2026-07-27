#!/usr/bin/env bash
# Curl-based smoke test for the portfolio.
#
# Scope note: the app is client-rendered, so curl only sees the SSR pass.
# Anything that needs a click, localStorage, or Firebase (theme toggle, modals,
# admin login, runtime <meta> injection) is NOT covered here and must be
# checked in a browser.
#
# Usage: bash scripts/smoke-test.sh [port]
set -uo pipefail

PORT="${1:-3113}"
BASE="http://localhost:$PORT"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PASS=0
FAIL=0
FAILED_NAMES=()

check() { # name, actual, expected
  if [ "$2" = "$3" ]; then
    printf '  \033[32mPASS\033[0m  %s\n' "$1"
    PASS=$((PASS + 1))
  else
    printf '  \033[31mFAIL\033[0m  %s (dapat: %s, harusnya: %s)\n' "$1" "$2" "$3"
    FAIL=$((FAIL + 1))
    FAILED_NAMES+=("$1")
  fi
}

check_min() { # name, actual, minimum
  if [ "$2" -ge "$3" ] 2>/dev/null; then
    printf '  \033[32mPASS\033[0m  %s (%s)\n' "$1" "$2"
    PASS=$((PASS + 1))
  else
    printf '  \033[31mFAIL\033[0m  %s (dapat: %s, minimal: %s)\n' "$1" "$2" "$3"
    FAIL=$((FAIL + 1))
    FAILED_NAMES+=("$1")
  fi
}

cleanup() { [ -n "${SERVER_PID:-}" ] && kill "$SERVER_PID" 2>/dev/null; }
trap cleanup EXIT

echo "==> Uji persistensi (regresi bug data ter-reset)"
if ! node scripts/test-persistence.mjs > /tmp/persist.log 2>&1; then
  cat /tmp/persist.log; exit 1
fi
echo "  persistensi OK"

echo "==> Build produksi"
if ! npm run build > /tmp/portfolio-build.log 2>&1; then
  echo "  BUILD GAGAL — 20 baris terakhir:"; tail -20 /tmp/portfolio-build.log; exit 1
fi
echo "  build OK"

echo "==> Menjalankan server di port $PORT"
npm run start -- -p "$PORT" > /tmp/portfolio-server.log 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 40); do
  curl -sf -o /dev/null "$BASE" && break
  sleep 1
done
if ! curl -sf -o /dev/null "$BASE"; then
  echo "  SERVER TIDAK MERESPONS"; tail -20 /tmp/portfolio-server.log; exit 1
fi
echo "  server siap"

HTML=$(curl -s "$BASE")
CSS_FILE=$(find .next/static/css -name '*.css' | head -1)
CSS=$(cat "$CSS_FILE")

echo
echo "== 1. Routing =="
check "beranda 200" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE")" "200"
check "rute admin via ?key= 200" \
  "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/?key=%2Fsecure-control-panel")" "200"
check "rute admin via ?admin=true 200" \
  "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/?admin=true")" "200"
check "path lama /secure-control-panel tetap 404 (dilewati lewat query)" \
  "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/secure-control-panel")" "404"

echo
echo "== 2. Seksi publik =="
# Only the sections marked visible in initial-data should render; the rest are
# hidden on purpose because they have no content yet.
VISIBLE=$(node -e "
const s=require('fs').readFileSync('lib/initial-data.ts','utf8');
const b=s.split('initialPageSections')[1].split('];')[0];
const re=/key: '([a-z]+)', isVisible: (true|false)/g;
let m,vis=[],hid=[];
while((m=re.exec(b))) (m[2]==='true'?vis:hid).push(m[1]);
console.log(JSON.stringify({vis,hid}));
")
for id in $(echo "$VISIBLE" | node -p "JSON.parse(require('fs').readFileSync(0)).vis.join(' ')"); do
  check "seksi #$id ter-render" "$(echo "$HTML" | grep -c "id=\"$id\"")" "1"
done
for id in $(echo "$VISIBLE" | node -p "JSON.parse(require('fs').readFileSync(0)).hid.join(' ')"); do
  check "seksi #$id tersembunyi" "$(echo "$HTML" | grep -c "id=\"$id\"")" "0"
done

echo
echo "== 3. Tema =="
check_min "skrip pra-paint tema ada" \
  "$(echo "$HTML" | grep -c 'PORTFOLIO_CMS_THEME')" 1
check_min "variabel --canvas punya nilai terang+gelap" \
  "$(echo "$CSS" | grep -oE '[-][-]canvas: *#[0-9a-fA-F]+' | sort -u | wc -l)" 2
check_min "variabel --fg punya nilai terang+gelap" \
  "$(echo "$CSS" | grep -oE '[-][-]fg: *#[0-9a-fA-F]+' | sort -u | wc -l)" 2
check_min "utilitas token beropacity dihasilkan" \
  "$(echo "$CSS" | grep -o 'color-mix' | wc -l)" 50
check "tidak ada warna hardcode lama di HTML" \
  "$(echo "$HTML" | grep -o '#050505\|#0F0F0F\|#1A1A1A' | wc -l)" "0"
check "tidak ada warna hardcode lama di komponen publik" \
  "$(grep -o '#050505\|#0F0F0F\|#111111\|#1A1A1A\|#0A0A0A\|#F5F5F5' components/public/*.tsx | wc -l)" "0"

echo
echo "== 4. Pengaturan yang tersambung =="
check_min "border radius memakai var(--radius)" \
  "$(grep -o 'rounded-\[var(--radius)\]' components/public/*.tsx | wc -l)" 100
check_min "plugin typography aktif (kelas prose)" \
  "$(echo "$CSS" | grep -o 'prose' | wc -l)" 100
check "react-markdown terpasang" \
  "$(node -e "process.stdout.write(require('./package.json').dependencies['react-markdown']?'1':'0')")" "1"

echo
echo "== 5. Identitas =="
check "tidak ada sisa nama lama di kode" \
  "$(grep -ril 'oqii\|febriansyah' --include='*.ts' --include='*.tsx' --include='*.json' \
      lib components app 2>/dev/null | wc -l)" "0"
check "tidak ada data contoh lama (picsum/example.com)" \
  "$(grep -c 'picsum.photos\|example.com' lib/initial-data.ts)" "0"
check_min "repo GitHub asli tertaut di proyek" \
  "$(grep -c 'github.com/FajarMelfiano' lib/initial-data.ts)" 8
check_min "nama baru muncul di HTML" \
  "$(echo "$HTML" | grep -c 'Fajar Melfiano')" 1

echo
echo "== 6. Autentikasi =="
check "tidak ada bypass password lama (pass.length >= 4)" \
  "$(grep -r 'pass.length >= 4' lib components 2>/dev/null | wc -l)" "0"
check "tidak ada bypass OTP kosong" \
  "$(grep -r "otpCode === ''" components 2>/dev/null | wc -l)" "0"
check_min "Firebase Auth dipakai" \
  "$(grep -c 'signInWithEmailAndPassword' lib/data-context.tsx)" 1
check "sesi admin tidak lagi dipulihkan dari localStorage" \
  "$(grep -c "getItem('PORTFOLIO_CMS_ADMIN_SESSION')" lib/data-context.tsx)" "0"

echo
echo "== 7. Persistensi =="
check "localStorage dibaca saat mount" \
  "$(grep -c 'getItem(LOCAL_STORAGE_KEY)' lib/data-context.tsx)" "1"
check_min "import memulihkan seluruh entitas" \
  "$(sed -n '/const importDatabaseJSON/,/^  };/p' lib/data-context.tsx | grep -c 'if (parsed\.')" 20
check "Firestore memakai database bernama" \
  "$(grep -c 'firestoreDatabaseId' lib/firebase.ts)" "2"

echo
echo "== 8. Keamanan berkas =="
check ".gitignore ada" "$([ -f .gitignore ] && echo 1 || echo 0)" "1"
check ".env diabaikan git" \
  "$(git check-ignore .env.local >/dev/null 2>&1 && echo 1 || echo 0)" "1"
check "node_modules diabaikan git" \
  "$(git check-ignore node_modules >/dev/null 2>&1 && echo 1 || echo 0)" "1"

echo
echo "== 9. Cakupan panel admin =="
# Every entity with CRUD in the context must have a manager wired into the layout.
for m in Profile Hero Skills Experience Education Projects Certificates Achievements \
         Organizations Trainings Publications Services Blog Testimonials Gallery CV \
         Messages Subscribers Theme PageBuilder SEO System AuditLog; do
  file=$(find components/admin -iname "Admin${m}*.tsx" | head -1)
  check "panel $m ada" "$([ -n "$file" ] && echo 1 || echo 0)" "1"
done

check_min "semua panel di-import AdminLayout" \
  "$(grep -c "^import { Admin" components/admin/AdminLayout.tsx)" 24
check_min "tab terdaftar di menu" \
  "$(grep -oE "id: '[a-z]+'," components/admin/AdminLayout.tsx | wc -l)" 23
check_min "case render per tab" \
  "$(grep -oE "case '[a-z]+': return <Admin" components/admin/AdminLayout.tsx | wc -l)" 22

echo
echo "== 10. Kelengkapan context =="
for fn in addSkillCategory updateSkillCategory deleteSkillCategory updateGalleryItem \
          updateCVVersion updateSubscriber deleteSubscriber clearAuditLogs; do
  check "context punya $fn" "$(grep -c "  const $fn = " lib/data-context.tsx)" "1"
done
check "skillCategories ikut disimpan" \
  "$(grep -c 'if (parsed.skillCategories)' lib/data-context.tsx)" "2"

echo
echo "== 11. Kualitas kode admin =="
check "tidak ada confirm() yang memblokir" \
  "$(grep -rn 'confirm(' components/admin/*.tsx \
      | grep -v 'confirmClear\|confirmReset\|setConfirm\|DeleteConfirm\|replaces .confirm' \
      | wc -l)" "0"
check "tidak ada warna hardcode gelap di panel admin" \
  "$(grep -roE '.{5}bg-slate-950' components/admin/*.tsx | grep -vc 'dark:bg-slate-950' || true)" "0"

echo
echo "======================================"
printf '  Lulus: \033[32m%d\033[0m   Gagal: \033[31m%d\033[0m\n' "$PASS" "$FAIL"
if [ "$FAIL" -gt 0 ]; then
  echo "  Yang gagal:"
  for n in "${FAILED_NAMES[@]}"; do echo "    - $n"; done
fi
echo "======================================"
[ "$FAIL" -eq 0 ]
