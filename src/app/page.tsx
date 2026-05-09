'use client';
import { useCart } from './context/CartContext';
import { useRouter } from 'next/navigation';
import { PROMO_PRODUCTS, ALL_PRODUCTS, CATEGORIES, RECIPES } from '../data';

const OUTROS_ESSENCIAIS = ALL_PRODUCTS.filter(p => !PROMO_PRODUCTS.find(pp => pp.id === p.id)).slice(0, 6);

export default function HomePage() {
  const { setPopupProduct, setIsCartOpen } = useCart();
  const router = useRouter();

  return (
    <div className="w-full pb-20">

      {/* HERO BANNER */}
      <section className="relative h-[420px] md:h-[500px] bg-gray-900 overflow-hidden border-b-4 border-[#ff9800]">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Mercado Atacado"
        />
        <div className="relative max-w-[1400px] mx-auto h-full flex flex-col justify-center px-6 md:px-10 text-white">
          <div className="bg-[#004d40]/90 p-6 md:p-10 max-w-xl">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9800] mb-3">Mercado do Zimpeto • Maputo</div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic leading-tight">
              Qualidade Bulk<br/>a Preços Justos
            </h1>
            <p className="text-base md:text-lg mb-6 font-medium text-gray-200">
              Fardos, frescos e mercearia. Directamente do Zimpeto para a sua porta.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/loja')}
                className="bg-[#ff9800] text-white px-6 py-3 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#004d40] transition-all cursor-pointer"
              >
                Ver Catálogo
              </button>
              <button
                onClick={() => document.getElementById('promos')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-6 py-3 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#004d40] transition-all cursor-pointer"
              >
                Ver Promoções
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* USP STRIP */}
      <div className="bg-[#004d40] text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-4 text-center">
          {[
            { icon: '🚚', text: 'Entrega gratuita acima de 5.000 MT' },
            { icon: '📦', text: 'Fardos e produtos a granel' },
            { icon: '📍', text: 'Zimpeto, Maputo' },
            { icon: '📞', text: 'WhatsApp: +258 84 123 4567' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* PROMOÇÕES SECTION */}
      <section id="promos" className="max-w-[1400px] mx-auto py-12 px-4 md:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9800] mb-1">Esta semana</div>
            <h2 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter italic">Promoção</h2>
          </div>
          <button
            onClick={() => router.push('/loja')}
            className="text-[10px] font-black uppercase text-[#004d40] border-b-2 border-[#ff9800] pb-0.5 hover:text-[#ff9800] transition-colors"
          >
            Ver tudo →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROMO_PRODUCTS.map(p => (
            <div key={p.id} className="bg-white group border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="h-52 overflow-hidden relative bg-gray-50">
                <img
                  src={p.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={p.name}
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-wider">
                  {p.tag}
                </div>
                {p.oldPrice && (
                  <div className="absolute top-2 right-2 bg-[#ff9800] text-white text-[9px] font-black px-2 py-1">
                    -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-black text-gray-800 uppercase text-[11px] mb-2 leading-tight">{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-[#004d40]">{p.price.toLocaleString('pt-MZ')} MT</span>
                  {p.oldPrice && (
                    <span className="text-[10px] text-gray-400 line-through">{p.oldPrice.toLocaleString('pt-MZ')} MT</span>
                  )}
                </div>
                <button
                  onClick={() => setPopupProduct(p)}
                  className="mt-auto w-full bg-[#004d40] text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff9800] transition-colors cursor-pointer active:scale-95"
                >
                  Adicionar ao Cesto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECIPES SECTION */}
      <section className="bg-white py-16 px-4 md:px-6 border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9800] mb-1">Inspiração culinária</div>
              <h2 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter italic">Receitas da Nossa Terra</h2>
            </div>
            <button
              onClick={() => router.push('/receitas')}
              className="hidden sm:block text-[10px] font-black uppercase text-[#004d40] border-b-2 border-[#ff9800] pb-0.5 hover:text-[#ff9800] transition-colors"
            >
              Ver todas →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECIPES.map(r => (
              <div
                key={r.id}
                onClick={() => router.push(`/receitas#recipe-${r.id}`)}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-black text-sm uppercase tracking-wide leading-tight mb-1">{r.title}</p>
                  <div className="flex items-center gap-3 text-[9px] text-white/80 font-bold uppercase">
                    <span>⏱ {r.time}</span>
                    <span>👥 {r.servings} pess.</span>
                    <span>{r.difficulty}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-[#ff9800] text-white text-[9px] font-black px-2 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver Receita
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => router.push('/receitas')}
              className="bg-[#004d40] text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff9800] transition-colors"
            >
              Ver Todas as Receitas
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-[1400px] mx-auto py-14 px-4 md:px-6">
        <div className="mb-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9800] mb-1">Navegue por</div>
          <h2 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter italic">Categorias</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => router.push(`/loja?cat=${cat.id}`)}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#004d40] group-hover:shadow-md transition-all duration-200 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-105">
                {cat.emoji}
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-600 group-hover:text-[#004d40] transition-colors text-center leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* OUTROS ESSENCIAIS */}
      <section className="bg-white border-t border-gray-100 py-14 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-xl font-black uppercase text-[#004d40] mb-8 flex items-center gap-4 italic">
            Outros Essenciais <span className="h-[2px] bg-gray-200 flex-1"></span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {OUTROS_ESSENCIAIS.map(item => (
              <div key={item.id} className="bg-[#f2f2f2] p-3 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-md transition-all group flex flex-col">
                <div className="h-28 overflow-hidden mb-3 bg-white rounded">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.name}
                  />
                </div>
                <p className="text-[10px] font-black uppercase text-gray-600 mb-1 leading-tight">{item.name}</p>
                <p className="font-black text-[#004d40] text-sm mb-3">{item.price.toLocaleString('pt-MZ')} MT</p>
                <button
                  onClick={() => setPopupProduct(item)}
                  className="mt-auto w-full bg-[#1a1a1a] text-white py-2 text-[9px] font-black uppercase tracking-tighter hover:bg-[#ff9800] transition-colors cursor-pointer"
                >
                  + Cesto
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#004d40] py-16 px-6 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Cozinhe como um Chef</h2>
          <p className="text-gray-300 text-sm mb-8 font-medium">
            Use a nossa base de frescos e mercearia para elevar o nível do seu negócio ou jantar familiar.
          </p>
          <button
            onClick={() => router.push('/receitas')}
            className="bg-[#ff9800] text-white px-10 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#004d40] transition-all active:scale-95"
          >
            Explorar Receitas
          </button>
        </div>
      </section>
    </div>
  );
}
