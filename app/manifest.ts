import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fajar Melfiano | Portfolio & CMS',
    short_name: 'Melfiano',
    description: 'Portofolio Fajar Melfiano Obese Afoan Toan — Pelajar SMK & Cloud Computing Enthusiast',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#0f0f0f',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
