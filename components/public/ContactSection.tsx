'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, language, addMessage, systemSettings } = useDataContext();

  const [form, setForm] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    subject: '',
    serviceType: 'Konsultasi Arsitektur Web',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.senderName || !form.senderEmail || !form.message) {
      setErrorMsg(getTranslation(language, 'contact.errorIncomplete'));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.senderEmail)) {
      setErrorMsg(getTranslation(language, 'contact.errorInvalidEmail') || 'Email tidak valid.');
      return;
    }

    addMessage({
      senderName: form.senderName,
      senderEmail: form.senderEmail,
      senderPhone: form.senderPhone,
      subject: form.subject || 'Kontak dari website portofolio',
      serviceType: form.serviceType,
      message: form.message
    });

    setSubmitted(true);
    setErrorMsg('');
    setTimeout(() => setSubmitted(false), 5000);
    setForm({
      senderName: '',
      senderEmail: '',
      senderPhone: '',
      subject: '',
      serviceType: 'Konsultasi Arsitektur Web',
      message: ''
    });
  };

  const encodedMsg = encodeURIComponent(systemSettings.whatsAppDefaultMessage || 'Halo, saya ingin berdiskusi!');
  const whatsappUrl = `https://wa.me/${systemSettings.whatsAppNumber}?text=${encodedMsg}`;

  return (
    <section id="contact" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Mail className="w-3.5 h-3.5 text-fg/80" />
            <span>Inquiries & Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'contact.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-6 shadow-xl">
              <h3 className="text-xl font-serif italic text-fg">
                {getTranslation(language, 'contact.directContact')}
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-[var(--radius)] bg-inset border border-fg/10 flex items-center justify-center text-fg shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-fg/40 text-[10px] uppercase tracking-wider font-mono block">{getTranslation(language, 'about.email')}</span>
                    <a href={`mailto:${profile.email}`} className="font-mono text-fg hover:underline">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-[var(--radius)] bg-inset border border-fg/10 flex items-center justify-center text-fg shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-fg/40 text-[10px] uppercase tracking-wider font-mono block">{getTranslation(language, 'contact.whatsappAndPhone')}</span>
                    <a href={`tel:${profile.phone}`} className="font-mono text-fg hover:underline">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-[var(--radius)] bg-inset border border-fg/10 flex items-center justify-center text-fg shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-fg/40 text-[10px] uppercase tracking-wider font-mono block">{getTranslation(language, 'about.location')}</span>
                    <span className="font-mono text-fg">{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              {systemSettings.enableWhatsAppButton && (
                <div className="pt-4 border-t border-fg/10">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-fg text-canvas font-bold text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 rounded-[var(--radius)] hover:bg-fg/90 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{getTranslation(language, 'contact.directChatWhatsapp')}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 shadow-xl">
              <h3 className="text-xl font-serif italic text-fg">
                {getTranslation(language, 'contact.sendMessage')}
              </h3>

              {submitted && (
                <div className="p-4 bg-surface-2 border border-fg/20 text-fg text-xs flex items-center space-x-2 font-mono">
                  <CheckCircle className="w-4 h-4 text-fg shrink-0" />
                  <span>{getTranslation(language, 'contact.successMsg')}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-red-900/20 dark:bg-red-900/30 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                    {getTranslation(language, 'contact.name')} *
                  </label>
                  <input
                    type="text"
                    value={form.senderName}
                    onChange={e => setForm({ ...form, senderName: e.target.value })}
                    placeholder="e.g. Rian Hidayat"
                    className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg placeholder-fg/30 focus:outline-none focus:border-fg/40 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                    {getTranslation(language, 'contact.email')} *
                  </label>
                  <input
                    type="email"
                    value={form.senderEmail}
                    onChange={e => setForm({ ...form, senderEmail: e.target.value })}
                    placeholder="rian@company.com"
                    className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg placeholder-fg/30 focus:outline-none focus:border-fg/40 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                    {getTranslation(language, 'contact.phone')}
                  </label>
                  <input
                    type="text"
                    value={form.senderPhone}
                    onChange={e => setForm({ ...form, senderPhone: e.target.value })}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg placeholder-fg/30 focus:outline-none focus:border-fg/40 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                    {getTranslation(language, 'contact.serviceType')}
                  </label>
                  <select
                    value={form.serviceType}
                    onChange={e => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg focus:outline-none focus:border-fg/40 font-mono"
                  >
                    <option value="Konsultasi Arsitektur Web">{getTranslation(language, 'contact.serviceOption1') || 'Konsultasi Arsitektur Web'}</option>
                    <option value="Generative AI Integration">{getTranslation(language, 'contact.serviceOption2') || 'Generative AI Integration'}</option>
                    <option value="Penawaran Kerja Kontrak">{getTranslation(language, 'contact.serviceOption3') || 'Penawaran Kerja Kontrak'}</option>
                    <option value="Lainnya">{getTranslation(language, 'contact.serviceOption4') || 'Lainnya'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                  {getTranslation(language, 'contact.subject')}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Konsultasi Arsitektur Next.js 15"
                  className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg placeholder-fg/30 focus:outline-none focus:border-fg/40 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50 block mb-1">
                  {getTranslation(language, 'contact.message')} *
                </label>
                  <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder={getTranslation(language, 'contact.messagePlaceholder')}
                  className="w-full px-4 py-2.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg placeholder-fg/30 focus:outline-none focus:border-fg/40 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-fg text-canvas font-bold text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 rounded-[var(--radius)] hover:bg-fg/90 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'contact.send')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
