'use client';
import { useCart } from './context/CartContext';
import { useRouter } from 'next/navigation';

const DESTAQUES = [
  { id: 'p1', name: 'Arroz Grão Longo (5kg)', price: 1850, oldPrice: 2100, tag: 'POUPANÇA', img: 'https://www.cim.co.mz/DynamicData/Products/dourado_01-productimg.jpg' },
  { id: 'p2', name: 'Óleo Vegetal (3L)', price: 2400, oldPrice: 2650, tag: 'DESTAQUE', img: 'https://th.bing.com/th/id/R.03adedcb196981d0a38fb24b4c2d24a2?rik=dbCykLqpfCtv9A&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0407%2f8819%2f7533%2fproducts%2fClassico_1200x.png%3fv%3d1660656662&ehk=iEJ3hKK1Sr1%2fS6v2HBdk8uAdGOZKYBQwGFyhqIFfJms%3d&risl=&pid=ImgRaw&r=0' },
  { id: 'p9', name: 'Leite UHT (12x1L)', price: 1100, oldPrice: 1350, tag: 'ESSENCIAL', img: 'https://thfvnext.bing.com/th/id/OIP.oxIh84dZOKi-f2QGXdUAfgHaGy?w=197&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3' },
  { id: 'p10', name: 'Farinha de Trigo (15kg)', price: 2800, oldPrice: 3100, tag: 'VOLUME', img: 'https://tse2.mm.bing.net/th/id/OIP.IeXfSUuBxl62QHrU7Tu6QAHaHa?cb=thfvnextfalcon2&w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3' },
];

const OUTROS_ESSENCIAIS = [
  { id: 'e1', name: 'Açúcar (1.5kg)', price: 720, img: 'https://tse2.mm.bing.net/th/id/OIP.hanjqpTIjZfoKyvYF2iJcQHaLH?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'e2', name: 'Sal Grosso (3kg)', price: 350, img: 'https://www.ranxo.co.mz/wp-content/uploads/2023/01/cristal-large.jpg' },
  { id: 'e3', name: 'Feijão (5kg)', price: 450, img: 'https://tse3.mm.bing.net/th/id/OIP.rf6hmrmlWrfPNTPaBAduQQHaHa?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'e4', name: 'Cebola Fardo', price: 480, img: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=200' },
  { id: 'e5', name: 'Detergente OMO', price: 1100, img: 'https://superbhyper.co.za/wp-content/uploads/2023/06/OMO-AUTO-LIQUID-COMFORT-1.5LT.jpg' },
  { id: 'e6', name: 'Água (8x0.25L)', price: 380, img: 'https://thfvnext.bing.com/th/id/OIP.NzOC3x1LToEQY-MoCP-5-AHaFO?w=273&h=193&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3' },
];

export default function HomePage() {
  const { addToCart, setIsCartOpen, t } = useCart();
  const router = useRouter();

  const handleQuickAdd = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const discount = (price: number, oldPrice: number) =>
    Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="w-full pb-20">

      {/* HERO */}
      <section aria-label="Promoção principal" className="relative h-[420px] md:h-[480px] bg-gray-900 overflow-hidden border-b-4 border-[#ff9800]">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        <div className="relative max-w-[1400px] mx-auto h-full flex flex-col justify-center px-6 md:px-8 text-white">
          <div className="bg-[#004d40]/92 p-6 md:p-8 max-w-lg">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff9800] mb-2">Zimpeto Wholesale</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic leading-none">
              {t('qualityBulk')}
            </h1>
            <p className="text-base md:text-lg mb-6 font-medium opacity-90 leading-relaxed">
              {t('heroPitch')}
            </p>
            <button
              onClick={() => router.push('/loja')}
              className="inline-flex items-center gap-2 bg-[#ff9800] text-white px-8 py-4 font-black uppercase text-sm hover:bg-white hover:text-[#004d40] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#004d40] transition-all rounded-sm"
            >
              {t('shopCatalog')}
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ESSENCIAIS DIÁRIOS */}
      <section aria-labelledby="essenciais-heading" className="max-w-[1400px] mx-auto py-14 px-4 md:px-6">
        <div className="flex items-baseline gap-4 mb-8">
          <h2 id="essenciais-heading" className="text-2xl font-black text-[#004d40] uppercase tracking-tighter">
            {t('dailyEssentials')}
          </h2>
          <span className="h-[2px] bg-[#004d40] flex-1 hidden md:block" aria-hidden="true"></span>
          <a href="/loja" className="text-[10px] font-black text-[#ff9800] uppercase tracking-widest hover:underline focus:outline-none focus:underline">
            {t('store')} →
          </a>
        </div>

        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTAQUES.map((p) => (
            <li key={p.id} className="bg-white group border border-gray-100 hover:shadow-xl transition-all flex flex-col focus-within:ring-2 focus-within:ring-[#004d40]">
              {/* Image */}
              <div className="h-56 overflow-hidden relative" aria-hidden="true">
                <img
                  src={p.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt=""
                  loading="lazy"
                />
                {/* Tag — Using principles ofGestalt: figure-ground, clear badge */}
                <div
                  className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-wider"
                  aria-label={`Etiqueta: ${p.tag}`}
                >
                  {p.tag}
                </div>
                {/* Discount badge */}
                <div
                  className="absolute top-2 right-2 bg-[#ff9800] text-white text-[9px] font-black px-2 py-1 rounded-full"
                  aria-label={`${discount(p.price, p.oldPrice)}% de desconto`}
                >
                  -{discount(p.price, p.oldPrice)}%
                </div>
              </div>

              {/* Content — Gestalt: proximity groups name+price together */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-gray-700 uppercase text-[11px] mb-2 leading-tight">{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-[#004d40]">{p.price.toLocaleString()},00 MT</span>
                  <span className="text-[10px] text-gray-400 line-through" aria-label={`Preço anterior: ${p.oldPrice.toLocaleString()} MT`}>
                    {p.oldPrice.toLocaleString()} MT
                  </span>
                </div>
                {/* CTA — clear affordance */}
                <button
                  onClick={() => handleQuickAdd(p)}
                  className="mt-auto w-full bg-[#004d40] text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-1 transition-all active:scale-95 rounded-sm"
                  aria-label={`${t('addToCart')}: ${p.name} — ${p.price.toLocaleString()},00 MT`}
                >
                  {t('addToCart')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* RECEITAS */}
      <section aria-labelledby="receitas-heading" className="bg-white py-16 px-6 border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
            className="relative group cursor-pointer overflow-hidden shadow-2xl h-72 md:h-auto rounded-sm"
            onClick={() => router.push('/receitas')}
            role="presentation"
            aria-hidden="true"
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[260px]"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-0 transition-opacity"></div>
          </div>
          <div className="space-y-6">
            <h2 id="receitas-heading" className="text-4xl md:text-5xl font-black text-[#004d40] uppercase tracking-tighter leading-tight">
              {t('cooksLike')}
            </h2>
            <p className="text-gray-600 font-medium text-base leading-relaxed">
              {t('chefDesc')}
            </p>
            <button
              onClick={() => router.push('/receitas')}
              className="inline-flex items-center gap-2 bg-[#004d40] text-white px-10 py-4 font-black uppercase text-xs tracking-widest shadow-lg hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 active:scale-95 transition-all rounded-sm"
            >
              {t('exploreRecipes')}
            </button>
          </div>
        </div>
      </section>

      {/* OUTROS ESSENCIAIS */}
      <section aria-labelledby="outros-heading" className="max-w-[1400px] mx-auto py-14 px-6">
        <h3 id="outros-heading" className="text-xl font-black uppercase text-[#004d40] mb-8 flex items-center gap-4">
          {t('otherEssentials')}
          <span className="h-[2px] bg-gray-200 flex-1" aria-hidden="true"></span>
        </h3>
        <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {OUTROS_ESSENCIAIS.map((item) => (
            <li key={item.id} className="bg-white p-4 border border-gray-100 hover:border-[#ff9800] transition-all group flex flex-col focus-within:ring-2 focus-within:ring-[#ff9800]">
              <div className="h-28 overflow-hidden mb-3 bg-gray-50" aria-hidden="true">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt=""
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-600 mb-1 leading-tight flex-1">{item.name}</p>
              <p className="font-black text-[#004d40] mb-3 text-sm">{item.price.toLocaleString()},00 MT</p>
              <button
                onClick={() => handleQuickAdd(item)}
                className="w-full bg-[#f4f4f4] text-[#004d40] py-2 text-[9px] font-black uppercase tracking-tight hover:bg-[#ff9800] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-all rounded-sm"
                aria-label={`${t('addToCart')}: ${item.name}`}
              >
                {t('addShort')}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* TRUST BADGES */}
      <section aria-label="Diferenciais Zimpeto" className="bg-[#004d40] text-white py-10 px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '', label: 'Entrega Rápida', sub: 'Maputo & Matola' },
            { icon: '', label: 'Fardos Completos', sub: 'Directo do armazém' },
            { icon: '', label: 'M-Pesa & Banco', sub: 'Pagamento fácil' },
            { icon: '', label: 'Qualidade Garantida', sub: 'Produtos frescos' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">{badge.icon}</span>
              <div>
                <p className="font-black uppercase text-[11px] tracking-wide">{badge.label}</p>
                <p className="text-[10px] opacity-60 font-medium">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
