'use client';
import { useCart } from '../app/context/CartContext';

export default function AddToCartPopup() {
  const { lastAdded, t } = useCart();

  if (!lastAdded) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] animate-fadeIn"
    >
      <div className="bg-[#004d40] text-white px-6 py-3 shadow-2xl flex items-center gap-3 rounded-sm">
        <svg aria-hidden="true" className="w-5 h-5 text-[#ff9800] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider">{t('added')}</p>
          <p className="text-[10px] opacity-70 font-medium truncate max-w-[180px]">{lastAdded}</p>
        </div>
      </div>
    </div>
  );
}
