'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, ArrowUp, ArrowDown, Inbox, UploadCloud, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase';

/**
 * Shared building blocks for the admin panels.
 *
 * Every manager screen is the same shape — a header, a list of records, and a
 * form — so the pieces live here instead of being re-typed per entity.
 */

type Bilingual = { id: string; en: string };

const inputClass =
  'w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 ' +
  'dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 ' +
  'dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition';

// ---------------------------------------------------------------- layout ---

export const PanelHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}> = ({ icon, title, subtitle, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
        <span className="text-blue-500">{icon}</span>
        <span>{title}</span>
      </h2>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
    {action}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div
    className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const AddButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition"
  >
    <Plus className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <div className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0 border-slate-200 dark:border-slate-800">
    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</h4>
    {children}
  </div>
);

export const Grid: React.FC<{ cols?: 2 | 3; children: React.ReactNode }> = ({
  cols = 2,
  children
}) => (
  <div className={`grid grid-cols-1 gap-4 ${cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
    {children}
  </div>
);

export const FormActions: React.FC<{ onCancel: () => void; saveLabel?: string }> = ({
  onCancel,
  saveLabel = 'Simpan'
}) => (
  <div className="flex items-center space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
    <button
      type="submit"
      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1.5 transition"
    >
      <Check className="w-4 h-4" />
      <span>{saveLabel}</span>
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition"
    >
      Batal
    </button>
  </div>
);

export const SavedBanner: React.FC<{ show: boolean; message?: string }> = ({
  show,
  message = 'Perubahan berhasil disimpan!'
}) =>
  show ? (
    <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold flex items-center space-x-2">
      <Check className="w-4 h-4 text-emerald-500" />
      <span>{message}</span>
    </div>
  ) : null;

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center space-y-2">
    <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-700" />
    <span>{message}</span>
  </div>
);

// ---------------------------------------------------------------- fields ---

export const Field: React.FC<{
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, hint, required, children }) => (
  <div>
    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[11px] text-slate-500 mt-1">{hint}</p>}
  </div>
);

export const TextInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}> = ({ value, onChange, placeholder, type = 'text', required }) => (
  <input
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    className={inputClass}
  />
);

export const TextArea: React.FC<{
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
}> = ({ value, onChange, rows = 3, placeholder, required, mono }) => (
  <textarea
    rows={rows}
    required={required}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    className={`${inputClass} ${mono ? 'font-mono' : ''}`}
  />
);

export const NumberInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ value, onChange, min, max }) => (
  <input
    type="number"
    min={min}
    max={max}
    value={Number.isFinite(value) ? value : 0}
    onChange={e => onChange(Number(e.target.value))}
    className={inputClass}
  />
);

export function Select<T extends string>({
  value,
  onChange,
  options
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value as T)} className={inputClass}>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export const Toggle: React.FC<{
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ label, hint, checked, onChange }) => (
  <label className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
    <span>
      <span className="font-bold text-slate-700 dark:text-slate-300 block">{label}</span>
      {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
    </span>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="w-4 h-4 text-blue-600 rounded shrink-0"
    />
  </label>
);

export const ColorInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange
}) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="h-10 w-14 rounded-xl cursor-pointer bg-transparent"
    />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`${inputClass} font-mono`}
    />
  </div>
);

export function ImageUploader({
  label,
  value,
  onChange,
  folder = 'general',
  accept = 'image/*',
  helperText
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  helperText?: string;
}) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const url = await uploadFile(file, folder);
    setIsUploading(false);

    if (url) {
      onChange(url);
    } else {
      alert('Gagal mengunggah file. Periksa koneksi atau ukuran file.');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 font-bold">{label}</label>
      {value ? (
        <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          {value.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={value} className="w-full h-auto object-cover" controls />
          ) : (
            <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg hover:bg-rose-500 transition-colors backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full max-w-sm h-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            ) : (
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" />
            )}
            <p className="mb-1 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-blue-500">Klik untuk unggah</span> atau drag & drop
            </p>
            <p className="text-xs text-slate-500">{helperText || `Maks. 5MB (${accept})`}</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFile}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}

// ------------------------------------------------------------- bilingual ---

export const BilingualText: React.FC<{
  label: string;
  value: Bilingual;
  onChange: (v: Bilingual) => void;
  required?: boolean;
  hint?: string;
}> = ({ label, value, onChange, required, hint }) => (
  <Grid>
    <Field label={`${label} (Indonesia)`} required={required} hint={hint}>
      <TextInput
        value={value.id}
        required={required}
        onChange={v => onChange({ ...value, id: v })}
      />
    </Field>
    <Field label={`${label} (English)`} hint="Kosongkan untuk memakai teks Indonesia.">
      <TextInput value={value.en} onChange={v => onChange({ ...value, en: v })} />
    </Field>
  </Grid>
);

export const BilingualArea: React.FC<{
  label: string;
  value: Bilingual;
  onChange: (v: Bilingual) => void;
  rows?: number;
  required?: boolean;
  mono?: boolean;
}> = ({ label, value, onChange, rows = 3, required, mono }) => (
  <Grid>
    <Field label={`${label} (Indonesia)`} required={required}>
      <TextArea
        rows={rows}
        mono={mono}
        required={required}
        value={value.id}
        onChange={v => onChange({ ...value, id: v })}
      />
    </Field>
    <Field label={`${label} (English)`} hint="Kosongkan untuk memakai teks Indonesia.">
      <TextArea rows={rows} mono={mono} value={value.en} onChange={v => onChange({ ...value, en: v })} />
    </Field>
  </Grid>
);

// ------------------------------------------------------------------ lists ---

/** Comma-separated text in, `string[]` out. */
export const TagsInput: React.FC<{
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <>
    <TextInput
      value={value.join(', ')}
      placeholder={placeholder}
      onChange={v =>
        onChange(
          v
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
        )
      }
    />
    {value.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {value.map((t, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono"
          >
            {t}
          </span>
        ))}
      </div>
    )}
  </>
);

export const StringListEditor: React.FC<{
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}> = ({ value, onChange, placeholder, addLabel = 'Tambah baris' }) => {
  const setAt = (i: number, v: string) => onChange(value.map((x, j) => (j === i ? v : x)));
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item}
            placeholder={placeholder}
            onChange={e => setAt(i, e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 shrink-0"
            aria-label="Hapus baris"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ''])}
        className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
};

/** Repeatable `{ id, en }` rows — used for responsibilities, achievements, etc. */
export const BilingualListEditor: React.FC<{
  value: Bilingual[];
  onChange: (v: Bilingual[]) => void;
  addLabel?: string;
}> = ({ value, onChange, addLabel = 'Tambah baris' }) => {
  const setAt = (i: number, v: Bilingual) => onChange(value.map((x, j) => (j === i ? v : x)));
  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div
          key={i}
          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Baris {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => {
                  const next = [...value];
                  [next[i - 1], next[i]] = [next[i], next[i - 1]];
                  onChange(next);
                }}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 disabled:opacity-30"
                aria-label="Naikkan"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={i === value.length - 1}
                onClick={() => {
                  const next = [...value];
                  [next[i + 1], next[i]] = [next[i], next[i + 1]];
                  onChange(next);
                }}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 disabled:opacity-30"
                aria-label="Turunkan"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                aria-label="Hapus baris"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <input
            value={item.id}
            placeholder="Teks Bahasa Indonesia"
            onChange={e => setAt(i, { ...item, id: e.target.value })}
            className={inputClass}
          />
          <input
            value={item.en}
            placeholder="English text (opsional)"
            onChange={e => setAt(i, { ...item, en: e.target.value })}
            className={inputClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { id: '', en: '' }])}
        className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
};

// ------------------------------------------------------------- list rows ---

export const ItemRow: React.FC<{
  thumbnail?: string;
  title: string;
  meta?: string;
  badges?: { label: string; tone?: 'ok' | 'warn' | 'muted' }[];
  /** Omit for records that have no edit form — the pencil is then hidden. */
  onEdit?: () => void;
  onDelete: () => void;
  extraActions?: React.ReactNode;
}> = ({ thumbnail, title, meta, badges, onEdit, onDelete, extraActions }) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
    <div className="flex items-center space-x-3 min-w-0">
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnail}
          alt=""
          className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
        />
      )}
      <div className="min-w-0">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{title}</h4>
        {meta && <p className="text-slate-500 truncate">{meta}</p>}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {badges.map((b, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  b.tone === 'ok'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : b.tone === 'warn'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {b.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="flex items-center space-x-2 shrink-0">
      {extraActions}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/70 transition"
          aria-label="Ubah"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={onDelete}
        className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/70 transition"
        aria-label="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/**
 * Two-step delete. A single click arms the button and a second within a few
 * seconds performs the delete — replaces `confirm()`, which is blocked in some
 * embedded browsers and can't be styled.
 */
export const useArmedDelete = (onConfirm: (id: string) => void) => {
  const [armedId, setArmedId] = useState<string | null>(null);

  const trigger = (id: string) => {
    if (armedId === id) {
      onConfirm(id);
      setArmedId(null);
      return;
    }
    setArmedId(id);
    window.setTimeout(() => setArmedId(cur => (cur === id ? null : cur)), 4000);
  };

  return { armedId, trigger };
};

export const DeleteConfirmBar: React.FC<{ onCancel: () => void }> = ({ onCancel }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-bold">
    <span>Klik hapus sekali lagi untuk konfirmasi</span>
    <button onClick={onCancel} aria-label="Batalkan hapus">
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
);
