import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
import ScrollReveal from './components/ScrollReveal';
import ChromeGate from './components/ChromeGate';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  title: 'Soberanía Relacional | Mentoring de Alta Claridad',
  description:
    'Acompaño a mujeres líderes atrapadas en el sobrepensamiento y la autoexigencia a recuperar calma y claridad para habitar una vida en mayor bienestar — sin depender de que su entorno cambie.',
  keywords: [
    'mentoring',
    'soberanía relacional',
    'claridad mental',
    'tres principios',
    'coaching para mujeres',
  ],
  openGraph: {
    title: 'Soberanía Relacional | Mentoring de Alta Claridad',
    description:
      'Mentoring exclusivo para la mujer que elige la paz. Basado en los Tres Principios y la Soberanía Interna.',
    type: 'website',
    locale: 'es_ES',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDF0F0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${jost.variable}`}>
      <body>
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        {children}
        <ChromeGate>
          <Footer />
          <WhatsappButton />
        </ChromeGate>
        <ScrollReveal />
      </body>
    </html>
  );
}
