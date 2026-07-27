import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fajar Melfiano | Pelajar SMK & Cloud Computing Enthusiast',
  description:
    'Portofolio Fajar Melfiano Obese Afoan Toan — pelajar SMK Krian 1 Sidoarjo yang menekuni Linux, otomasi, pengembangan web, dan cloud computing.',
};

// Applies the saved theme before first paint. Without this the page renders in
// the default theme and then snaps to the saved one once React hydrates.
const themeScript = `
(function () {
  try {
    var mode = localStorage.getItem('PORTFOLIO_CMS_THEME');
    if (!mode) {
      // Fall back to the admin Theme panel's saved mode so the very first
      // paint after an import or a fresh browser still matches.
      var raw = localStorage.getItem('PORTFOLIO_CMS_DATA_V1');
      if (raw) mode = (JSON.parse(raw).themeSettings || {}).mode || '';
    }
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var isDark = mode ? mode === 'dark' : true;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="bg-canvas text-fg antialiased selection:bg-fg selection:text-canvas font-sans min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
