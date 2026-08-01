'use client';

import { useEffect } from 'react';

export function PwaRegistry() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.debug('PWA ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.debug('PWA ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return null;
}
