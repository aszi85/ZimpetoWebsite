'use client';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, Suspense } from 'react';

const PRODUCTS = [
  { id: 'p1', name: 'Arroz Don Pato (25kg)', price: 1850, img: 'https://static.itdg.com.br/images/640-360/1cf623e79f8751af3e8b3edd83f23258/arroz-branco-soltinho.jpg', category: 'cereal' },
  { id: 'p2', name: 'Óleo Vegetal Somol (5L)', price: 800, img: 'https://cdn.bazara.co.mz/media/catalog/product/cache/bf49dd73f0c5af308fe168a7669f00fa/v/n/vns-6001565023842.jpg', category: 'oleo' },
  { id: 'p3', name: 'Farinha Milho (10kg)', price: 750, img: 'https://cdn.bazara.co.mz/media/catalog/product/cache/bf49dd73f0c5af308fe168a7669f00fa/t/m/tm-cim7050.jpg', category: 'cereal' },
  { id: 'p4', name: 'Caixa Tomate (15kg)', price: 800, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0q3Y1bw4Sbi0huvUu2rheKwY_-nV-IE8zWw&s', category: 'fresco' },
  { id: 'p5', name: 'Açúcar Castanho (10kg)', price: 900, img: 'https://cdn.recheio.co.mz/assets/images/uploads/productimages/SugarNacional1KGBrown20230320T135548-3.jpg', category: 'mercearia' },
  { id: 'p6', name: 'Feijão Manteiga (5kg)', price: 450, img: 'https://www.sontu.pt/imagens/produtos/20200910111049_resize.jpg', category: 'mercearia' },
  { id: 'p7', name: 'Batata Nacional (10kg)', price: 550, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOo06Z50yFQp_coFIYG91Jx7TMa4QnpPjEbw&s', category: 'fresco' },
  { id: 'p8', name: 'Cebola Branca (10kg)', price: 480, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOsOTmuT9CEm1M0jup5xEfPLETj-ho1U3oQ&s', category: 'fresco' },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'cereal', label: 'Cereais' },
  { id: 'oleo', label: 'Óleos' },
  { id: 'fresco', label: 'Frescos' },
  { id: 'mercearia', label: 'Mercearia' },
];

function LojaContent() {
  const { addToCart, t } = useCart();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQ, setSearchQ] = useState(queryParam);
  const [category, setCategory] = useState('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchQ = p.name.toLowerCase().includes(searchQ.toLowerCase());
      return matchCat && matchQ;
    });
  }, [searchQ, category]);

  const handleAdd = (p: typeof PRODUCTS[0]) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-14">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-[#004d40] uppercase tracking-tighter mb-1 border-l-4 border-[#ff9800] pl-4">
          {t('catalogTitle')}
        </h1>
        <p className="text-[11px] font-bold text-gray-400 uppercase pl-5">
          {filtered.length} {t('searchResult')} {searchQ ? `"${searchQ}"` : t('store')}
        </p>
      </div>

      {/* Search + Filter — Gestalt: grouped controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8" role="search" aria-label="Filtrar produtos">
        <div className="relative flex-1">
          <label htmlFor="loja-search" className="sr-only">{t('search')}</label>
          <input
            id="loja-search"
            type="search"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder={t('search')}
            className="w-full border-2 border-gray-200 py-3 px-4 pr-10 text-sm focus:outline-none focus:border-[#ff9800] transition-colors rounded-sm"
          />
          <svg aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>

        {/* Category filter — Gestalt: similarity, same style = same type */}
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por categoria">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
              className={`shrink-0 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#ff9800] rounded-sm ${
                category === cat.id
                  ? 'bg-[#004d40] text-white border-[#004d40]'
                  : 'bg-white text-[#004d40] border-gray-200 hover:border-[#004d40]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center" role="status" aria-live="polite">
          <p className="font-black uppercase text-gray-400 text-lg mb-4">{t('noResults')}</p>
          <button
            onClick={() => { setSearchQ(''); setCategory('all'); }}
            className="text-[#ff9800] font-black uppercase text-xs underline focus:outline-none"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <ul
          role="list"
          aria-live="polite"
          aria-label={`${filtered.length} produtos`}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filtered.map((p) => (
            <li key={p.id} className="bg-white border border-gray-100 hover:shadow-lg transition-shadow flex flex-col focus-within:ring-2 focus-within:ring-[#004d40]">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden" aria-hidden="true">
                <img
                  src={p.img}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-bold uppercase text-[10px] text-gray-500 mb-1 leading-tight">{p.name}</h2>
                <p className="text-xl font-black text-[#004d40] mb-4">{p.price.toLocaleString()},00 MT</p>
                <button
                  onClick={() => handleAdd(p)}
                  className={`mt-auto py-3 text-[9px] font-black uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-[#ff9800] active:scale-95 rounded-sm ${
                    addedId === p.id
                      ? 'bg-[#004d40] text-white'
                      : 'bg-[#1a1a1a] text-white hover:bg-[#ff9800]'
                  }`}
                  aria-label={`${t('addToCart')}: ${p.name} — ${p.price.toLocaleString()},00 MT`}
                >
                  {addedId === p.id ? '✓ Adicionado' : `${t('addShort')}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Loja() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black uppercase text-[#004d40]">A carregar...</div>}>
      <LojaContent />
    </Suspense>
  );
}
