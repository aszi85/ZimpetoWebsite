'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../app/context/CartContext';

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount, t } = useCart();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus close button when opened
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => closeRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  // Escape key closes panel
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) setIsCartOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[150] backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${t('cart')} — ${cartCount} ${t('itemsInCart')}`}
        className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white z-[200] flex flex-col shadow-2xl animate-slideIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100 bg-[#004d40] text-white">
          <div>
            <h2 className="font-black uppercase text-lg tracking-tight">{t('cart')}</h2>
            <p className="text-[10px] font-bold opacity-70 uppercase">{cartCount} {t('itemsInCart')}</p>
          </div>
          <button
            ref={closeRef}
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            aria-label={t('closeCart')}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" role="list" aria-label="Artigos no cesto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <svg aria-hidden="true" className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-black uppercase text-gray-400 text-sm mb-4">{t('emptyCart')}</p>
              <button
                onClick={() => { router.push('/loja'); setIsCartOpen(false); }}
                className="bg-[#004d40] text-white px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-colors rounded-sm"
              >
                {t('backToStore')}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                role="listitem"
                className="bg-gray-50 rounded-sm p-3 flex gap-3 border border-gray-100 hover:border-[#004d40]/20 transition-colors group"
              >
                {/* Product image */}
                <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-white border border-gray-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black uppercase text-gray-700 leading-tight truncate">{item.name}</p>
                  <p className="font-black text-[#004d40] text-sm mt-0.5">{(item.price * item.qtd).toLocaleString()},00 MT</p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2" role="group" aria-label={`${t('qty')}: ${item.qtd}`}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 bg-white border-2 border-gray-200 rounded font-black text-sm hover:border-[#004d40] hover:bg-[#004d40] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-all flex items-center justify-center"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      disabled={item.qtd <= 1}
                    >
                      −
                    </button>
                    <span className="text-sm font-black w-6 text-center" aria-live="polite" aria-label={`${item.qtd} unidades`}>{item.qtd}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 bg-white border-2 border-gray-200 rounded font-black text-sm hover:border-[#004d40] hover:bg-[#004d40] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-all flex items-center justify-center"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start p-1.5 text-gray-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label={`${t('remove')} ${item.name}`}
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t-2 border-gray-100 p-4 space-y-3 bg-white">
            {/* Total */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase text-gray-500">{t('total')}</span>
              <span className="text-2xl font-black text-[#004d40]" aria-live="polite">{cartTotal.toLocaleString()},00 MT</span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => { router.push('/checkout'); setIsCartOpen(false); }}
              className="w-full bg-[#ff9800] text-white py-4 font-black uppercase text-xs tracking-widest hover:bg-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm"
            >
              {t('checkout')}
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full border-2 border-gray-200 text-gray-500 py-3 font-black uppercase text-[10px] tracking-widest hover:border-[#004d40] hover:text-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#004d40] transition-colors rounded-sm"
            >
              {t('continueShopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
