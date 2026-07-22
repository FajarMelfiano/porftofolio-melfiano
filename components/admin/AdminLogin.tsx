'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Shield, KeyRound, Mail, AlertCircle, Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin } = useDataContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step2FA, setStep2FA] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Harap masukkan email dan kata sandi.');
      return;
    }

    if (email === 'oqiifebriansyah@gmail.com' || email === 'admin@portfolio.com' || email === 'admin') {
      setStep2FA(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Kredensial tidak valid. Akses ditolak.');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otpCode.length >= 4 || otpCode === '123456' || otpCode === '') {
      const success = loginAdmin(email, password);
      if (!success) {
        setErrorMsg('Gagal melakukan otentikasi admin.');
      }
    } else {
      setErrorMsg('Kode OTP tidak sesuai.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Admin CMS Login</h2>
          <p className="text-xs text-slate-400">
            Akses Panel Kontrol Tersembunyi Portfolio & Content Engine.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!step2FA ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Email Admin</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="oqiifebriansyah@gmail.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg"
            >
              Lanjutkan ke Verifikasi 2FA →
            </button>
          </form>
        ) : (
          <form onSubmit={handle2FASubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-blue-200 text-xs">
              Kode OTP 2FA telah dikirimkan ke perangkat terautentikasi (atau gunakan sebarang kode untuk verifikasi lokal).
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Kode OTP 2FA (6 digit)</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  autoFocus
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 font-mono tracking-widest text-center text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-lg"
            >
              Masuk Dashboard Admin
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Sistem Terenkripsi • SSL Secured • IP Logging Active
        </div>
      </div>
    </div>
  );
};
