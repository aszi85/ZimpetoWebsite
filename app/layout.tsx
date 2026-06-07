import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './context/CartContext';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import AddToCartPopup from '../components/AddToCartPopup';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Zimpeto Wholesale | Mercado de Atacado em Maputo',
  description: 'Compre produtos a granel e fardos directamente do Zimpeto. Arroz, óleo, farinhas, frescos e mais. Wholesale market Maputo.',
  keywords: 'wholesale, atacado, Maputo, Zimpeto, arroz, óleo, fardos, Moçambique',
  openGraph: {
    title: 'Zimpeto Wholesale',
    description: 'Mercado de Atacado em Maputo',
    locale: 'pt_MZ',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="bg-[#f2f2f2] min-h-screen w-full overflow-x-hidden">
        <CartProvider>
          <Navbar />
          <main id="main-content" className="w-full" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartSidebar />
          <AddToCartPopup />
        </CartProvider>
      </body>
    </html>
  );
}
