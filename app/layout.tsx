import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oqii Febriansyah | Senior Product Architect & Engineer',
  description: 'Sophisticated Dark Portfolio Engine - Personal website & Admin CMS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" style={{ backgroundColor: '#050505', colorScheme: 'dark' }}>
      <body className="bg-[#050505] text-[#F5F5F5] antialiased selection:bg-white selection:text-black font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
