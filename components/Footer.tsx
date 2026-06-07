'use client';
import { useCart } from '../app/context/CartContext';

export default function Footer() {
  const { t } = useCart();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#004d40] text-white mt-16" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-black text-xl italic tracking-tighter mb-2">ZIMPETO<span className="text-gray-400 text-[10px] not-italic ml-1 tracking-widest uppercase font-bold">Wholesale</span></p>
          <p className="text-[11px] font-medium opacity-60 uppercase tracking-wide">{t('tagline')}</p>
        </div>
        <div>
          <h3 className="font-black uppercase text-[10px] tracking-widest mb-4 text-[#ff9800]">{t('contact')}</h3>
          <address className="not-italic space-y-1.5 text-[11px] font-medium opacity-80">
            <p>{t('locationValue')}</p>
            <p>WhatsApp: +258 84 886 2188</p>
            <p>Mpesa: 84 886 2188</p>
          </address>
        </div>
        <div>
          <h3 className="font-black uppercase text-[10px] tracking-widest mb-4 text-[#ff9800]">Links</h3>
          <nav aria-label="Links do rodapé">
            <ul className="space-y-1.5 text-[11px] font-medium opacity-80">
              {['/loja', '/receitas', '/contacto', '/localizacao'].map((href, i) => {
                const labels = [t('store'), t('recipes'), t('contact'), t('location')];
                return (
                  <li key={href}>
                    <a href={href} className="hover:text-[#ff9800] focus:outline-none focus:underline transition-colors">
                      {labels[i]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 max-w-[1400px] mx-auto flex items-center justify-between">
        <p className="text-[10px] font-medium opacity-40 uppercase">© {year} Zimpeto Wholesale LDA</p>
        <p className="text-[10px] font-medium opacity-40 uppercase">Maputo, Moçambique 🇲🇿</p>
      </div>
    </footer>
  );
}
