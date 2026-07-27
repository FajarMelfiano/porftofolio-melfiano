'use client';

import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { updatePassword, updateEmail, updateProfile, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useDataContext } from '@/lib/data-context';
import {
  PanelHeader,
  Card,
  FormSection,
  Field,
  TextInput,
  FormActions,
  SavedBanner,
} from './ui';

export function AdminUserManager() {
  const { adminUser } = useDataContext();

  // Profile states
  const [displayName, setDisplayName] = useState(adminUser?.name || '');
  const [email, setEmail] = useState(adminUser?.email || '');
  const [photoURL, setPhotoURL] = useState(adminUser?.avatar || '');

  // Password states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  // Sync state if user changes, but avoid constant re-renders by checking values.
  // Using an effect for this isn't strictly necessary if we rely on keying the component,
  // but this ensures fields reset if auth state changes from underneath.
  // A better way would be using derived state or letting React handle it.
  // We'll remove the useEffect and rely on the initial state, as the admin layout
  // shouldn't switch users without a full reload anyway.

  if (!adminUser) {
    return (
      <div className="p-8 text-center text-slate-500">
        Memuat data pengguna...
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      const updates: { displayName?: string; photoURL?: string } = {};
      if (displayName !== auth.currentUser.displayName) updates.displayName = displayName;
      if (photoURL !== auth.currentUser.photoURL) updates.photoURL = photoURL;

      if (Object.keys(updates).length > 0) {
        await updateProfile(auth.currentUser, updates);
      }

      if (email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }
      
      // Update local state is handled implicitly by Firebase Auth listener in data-context, but we can show success message
      setProfileMessage({ type: 'ok', text: 'Profil berhasil diperbarui.' });
      setTimeout(() => setProfileMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      if (error.code === 'auth/requires-recent-login') {
        setProfileMessage({ type: 'error', text: 'Sesi telah berakhir. Silakan logout dan login kembali untuk mengubah email.' });
      } else {
        setProfileMessage({ type: 'error', text: `Gagal memperbarui profil: ${error.message}` });
      }
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Konfirmasi password tidak cocok.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password minimal 6 karakter.' });
      return;
    }

    setIsSavingPassword(true);
    setPasswordMessage(null);

    try {
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage({ type: 'ok', text: 'Password berhasil diubah.' });
      setTimeout(() => setPasswordMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/requires-recent-login') {
        setPasswordMessage({ type: 'error', text: 'Sesi telah berakhir. Silakan logout dan login kembali untuk mengubah password.' });
      } else {
        setPasswordMessage({ type: 'error', text: `Gagal mengubah password: ${error.message}` });
      }
    } finally {
      setIsSavingPassword(false);
    }
  };


  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<UserCircle className="w-6 h-6" />}
        title="Profil Pengguna"
        subtitle="Kelola profil dan pengaturan keamanan akun Anda."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Form */}
        <Card>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <FormSection title="Informasi Profil">
              <div className="space-y-4">
                 {profileMessage && profileMessage.type === 'error' && (
                  <div className="p-3 text-sm rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                    {profileMessage.text}
                  </div>
                )}
                
                <Field label="Nama Lengkap">
                  <TextInput
                    value={displayName}
                    onChange={setDisplayName}
                    placeholder="Nama yang ditampilkan"
                  />
                </Field>
                
                <Field label="Email" required hint="Mengubah email mungkin memerlukan verifikasi ulang.">
                  <TextInput
                    value={email}
                    onChange={setEmail}
                    type="email"
                    required
                  />
                </Field>
                
                <Field label="URL Foto Profil">
                  <TextInput
                    value={photoURL}
                    onChange={setPhotoURL}
                    placeholder="https://..."
                  />
                  {photoURL && (
                    <div className="mt-3">
                      <p className="text-xs text-slate-500 mb-1">Preview:</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoURL} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-slate-200" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </Field>
              </div>
            </FormSection>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50"
              >
                {isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}
              </button>
              <SavedBanner show={profileMessage?.type === 'ok'} message={profileMessage?.text} />
            </div>
          </form>
        </Card>

        {/* Password Form */}
        <Card>
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <FormSection title="Ubah Password">
              <div className="space-y-4">
                 {passwordMessage && passwordMessage.type === 'error' && (
                  <div className="p-3 text-sm rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                    {passwordMessage.text}
                  </div>
                )}

                <Field label="Password Baru" required>
                  <TextInput
                    value={newPassword}
                    onChange={setNewPassword}
                    type="password"
                    required
                  />
                </Field>
                
                <Field label="Konfirmasi Password Baru" required>
                  <TextInput
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    type="password"
                    required
                  />
                </Field>
              </div>
            </FormSection>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
               <button
                type="submit"
                disabled={isSavingPassword || !newPassword || !confirmPassword}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50"
              >
                {isSavingPassword ? 'Menyimpan...' : 'Ubah Password'}
              </button>
              <SavedBanner show={passwordMessage?.type === 'ok'} message={passwordMessage?.text} />
            </div>
          </form>
        </Card>

      </div>
    </div>
  );
}
