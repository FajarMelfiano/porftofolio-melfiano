'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase, uploadFile, deleteFile } from '@/lib/supabase';
import {
  PanelHeader,
  Card,
  EmptyState,
  DeleteConfirmBar,
  useArmedDelete,
} from './ui';
import {
  Folder,
  Image as ImageIcon,
  FileText,
  Upload,
  Copy,
  Trash2,
  Check,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image';

interface StorageFile {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
  } | null;
}

export function AdminFileManager() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('portfolio-files').list();
      if (error) {
        console.error('Error fetching files:', error);
      } else {
        // filter out placeholder .emptyFolderPlaceholder if it exists
        const actualFiles = data?.filter((f) => f.name !== '.emptyFolderPlaceholder') || [];
        // sort by newest
        actualFiles.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        setFiles(actualFiles);
      }
    } catch (e) {
      console.error('Exception loading files:', e);
    } finally {
      setLoading(false);
    }
  };

  const { armedId, trigger } = useArmedDelete(async (name) => {
    // get public url from name to use existing deleteFile helper
    const { data } = supabase.storage.from('portfolio-files').getPublicUrl(name);
    const success = await deleteFile(data.publicUrl);
    if (success) {
      loadFiles();
    }
  });

  useEffect(() => {
    let mounted = true;
    const fetchInitialFiles = async () => {
      try {
        const { data, error } = await supabase.storage.from('portfolio-files').list();
        if (mounted) {
          if (error) {
            console.error('Error fetching files:', error);
          } else {
            const actualFiles = data?.filter((f) => f.name !== '.emptyFolderPlaceholder') || [];
        actualFiles.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
            setFiles(actualFiles);
          }
          setLoading(false);
        }
      } catch (e) {
        if (mounted) {
          console.error('Exception loading files:', e);
          setLoading(false);
        }
      }
    };
    fetchInitialFiles();
    return () => { mounted = false; };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(file);
    if (url) {
      loadFiles();
    }
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (fileName: string) => {
    const { data } = supabase.storage.from('portfolio-files').getPublicUrl(fileName);
    navigator.clipboard.writeText(data.publicUrl);
    setCopiedId(fileName);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isImage = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    return ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext || '');
  };

  const formatBytes = (bytes: number | null | undefined, decimals = 2) => {
    if (!bytes || !+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Folder />}
        title="File Manager"
        subtitle="Kelola aset gambar dan dokumen di penyimpanan Supabase."
        action={
          <div className="flex items-center space-x-3">
            <button
              onClick={loadFiles}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Muat ulang"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition"
            >
              {uploading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{uploading ? 'Mengunggah...' : 'Unggah File'}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        }
      />

      {loading && files.length === 0 ? (
        <Card>
          <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
            <span>Memuat file...</span>
          </div>
        </Card>
      ) : files.length === 0 ? (
        <Card>
          <EmptyState message="Belum ada file di penyimpanan. Unggah file pertama Anda." />
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => {
            const publicUrl = supabase.storage.from('portfolio-files').getPublicUrl(file.name).data.publicUrl;
            const isImg = isImage(file.name);

            return (
              <div
                key={file.id}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col"
              >
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                  {isImg ? (
                    <Image
                      src={publicUrl}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-slate-400" />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(file.name)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm"
                      title="Salin URL"
                    >
                      {copiedId === file.name ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm"
                      title="Buka file"
                    >
                      <Upload className="w-4 h-4 rotate-45" />
                    </a>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {formatBytes(file.metadata?.size || 0)}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    {armedId === file.name ? (
                      <div className="-ml-1">
                        <DeleteConfirmBar onCancel={() => trigger('')} />
                      </div>
                    ) : (
                      <>
                        <div className="text-[10px] text-slate-400 truncate">
                          {new Date(file.created_at || 0).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => trigger(file.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/40 transition"
                          aria-label="Hapus file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
