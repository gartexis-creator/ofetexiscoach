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
  title: 'Ofelia Texis · Coaching para mujeres | Soberanía Relacional',
  description:
    '¿Agotada, ansiosa, con la mente que no para? Coaching 1 a 1 para mujeres, online. Recupera tu calma, aunque a tu alrededor nada haya cambiado. Primera sesión gratis.',
  keywords: [
    'mentoring',
    'soberanía relacional',
    'claridad mental',
    'tres principios',
    'coaching para mujeres',
  ],
  openGraph: {
    title: 'Ofelia Texis · Coaching para mujeres | Soberanía Relacional',
    description:
      'La calma que no depende de nadie más. Coaching 1 a 1 para mujeres, basado en los Tres Principios.',
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
