'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { systemSettings } = useDataContext();

  if (!systemSettings.enableWhatsAppButton || !systemSettings.whatsAppNumber) {
    return null;
  }

  const encodedMsg = encodeURIComponent(systemSettings.whatsAppDefaultMessage || 'Halo, saya ingin berdiskusi!');
  const whatsappUrl = `https://wa.me/${systemSettings.whatsAppNumber}?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 py-3 rounded-[var(--radius)] bg-fg text-canvas font-bold text-[10px] uppercase tracking-widest shadow-2xl border border-fg/20 hover:bg-fg/90 transition-all duration-300 font-mono"
      title="Chat WhatsApp Direct"
    >
      <MessageSquare className="w-4 h-4" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};
