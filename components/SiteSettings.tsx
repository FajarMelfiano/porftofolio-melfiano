'use client';

import { useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';

/**
 * Applies the admin-configured theme and SEO settings to the live document.
 *
 * Both panels used to persist their values and stop there — nothing read them
 * back. Because the whole app is client-rendered, the head has to be patched at
 * runtime rather than through Next's static `metadata` export.
 */

const FONT_STACKS: Record<string, string> = {
  'Plus Jakarta Sans': "'Plus Jakarta Sans', system-ui, sans-serif",
  'Inter': "'Inter', system-ui, sans-serif",
  'Outfit': "'Outfit', system-ui, sans-serif",
  'Playfair Display': "'Playfair Display', Georgia, serif"
};

const RADIUS_VALUES: Record<string, string> = {
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.75rem',
  full: '1.5rem'
};

/** Creates the tag on first use, then keeps updating the same one. */
const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export const SiteSettings: React.FC = () => {
  const { themeSettings, seoSettings, isDarkMode, setIsDarkMode } = useDataContext();

  // --- Theme ---
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--primary', themeSettings.primaryColor);
    root.style.setProperty('--secondary', themeSettings.secondaryColor);
    root.style.setProperty('--accent', themeSettings.accentColor);
    root.style.setProperty('--radius', RADIUS_VALUES[themeSettings.borderRadius] ?? RADIUS_VALUES.sm);
    root.style.setProperty(
      '--font-sans',
      FONT_STACKS[themeSettings.fontFamily] ?? FONT_STACKS['Plus Jakarta Sans']
    );

    // Honours the "Aktifkan Animasi" switch; the class is consumed in globals.css.
    root.classList.toggle('no-animations', !themeSettings.enableAnimations);
  }, [themeSettings]);

  // --- Colour mode ---
  // themeSettings.mode is the persisted preference; the navbar toggle is the
  // ad-hoc override. 'system' follows the OS and keeps following it.
  useEffect(() => {
    if (themeSettings.mode === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mql.matches);
      const onChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    setIsDarkMode(themeSettings.mode === 'dark');
  }, [themeSettings.mode, setIsDarkMode]);

  // --- SEO ---
  useEffect(() => {
    if (seoSettings.metaTitle) document.title = seoSettings.metaTitle;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: seoSettings.metaDescription || ''
    });
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: seoSettings.keywords || ''
    });
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: seoSettings.authorName || ''
    });

    // Open Graph
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: seoSettings.metaTitle || ''
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seoSettings.metaDescription || ''
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    if (seoSettings.ogImage) {
      upsertMeta('meta[property="og:image"]', {
        property: 'og:image',
        content: seoSettings.ogImage
      });
    }
    if (seoSettings.canonicalUrl) {
      upsertMeta('meta[property="og:url"]', {
        property: 'og:url',
        content: seoSettings.canonicalUrl
      });
      upsertLink('canonical', seoSettings.canonicalUrl);
    }

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image'
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: seoSettings.metaTitle || ''
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seoSettings.metaDescription || ''
    });
    if (seoSettings.ogImage) {
      upsertMeta('meta[name="twitter:image"]', {
        name: 'twitter:image',
        content: seoSettings.ogImage
      });
    }

    if (seoSettings.googleSearchConsoleMeta) {
      upsertMeta('meta[name="google-site-verification"]', {
        name: 'google-site-verification',
        content: seoSettings.googleSearchConsoleMeta
      });
    }
  }, [seoSettings]);

  // Keeps the dark class in sync when the mode preference wins over the toggle.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return null;
};
