'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../app/context/CartContext';
import { ALL_PRODUCTS, CATEGORIES } from '../data';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Loja', href: '/loja' },
    { name: 'Receitas', href: '/receitas' },
    { name: 'Contacte-nos', href: '/contacto' },
    { name: 'Localização', href: '/localizacao' },
  ];

  const suggestions = searchQuery.length > 1
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/loja?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="w-full z-[100] bg-white sticky top-0">
      {/* TOP INFO BAR */}
      <div className="bg-[#004d40] text-white text-[10px] font-bold py-2 px-4 flex items-center justify-between">
        <span className="flex items-center gap-1">
          📍 Mercado do Zimpeto, Bancada 42-B, Maputo
        </span>
        <div className="hidden md:flex items-center gap-6">
          <span>🏷 15% off em fardos de arroz esta semana</span>
          <span>📦 Entrega gratuita acima de 5.000 MT</span>
        </div>
        <span className="flex items-center gap-1">
          📞 +258 84 123 4567
        </span>
      </div>

      {/* MAIN NAVBAR */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center gap-4">

          {/* Hamburger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-[#004d40] transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#004d40] ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#004d40] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* LOGO */}
          <button onClick={() => router.push('/')} className="font-black text-2xl text-[#004d40] italic tracking-tighter shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            ZIMPETO
            <span className="text-gray-400 text-[9px] not-italic ml-1 tracking-[0.2em] uppercase font-bold block leading-none">Wholesale</span>
          </button>

          {/* NAV BUTTONS (desktop) */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {/* Categories dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCatOpen(true)}
                onMouseLeave={() => setIsCatOpen(false)}
                onClick={() => setIsCatOpen(!isCatOpen)}
                className="flex items-center gap-1 bg-[#ff9800] text-white px-4 py-2 text-[10px] font-black uppercase tracking-wider hover:bg-[#e88a00] transition-colors"
              >
                ☰ Categorias
                <span className="text-[8px]">▼</span>
              </button>
              {isCatOpen && (
                <div
                  className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl z-50 py-2"
                  onMouseEnter={() => setIsCatOpen(true)}
                  onMouseLeave={() => setIsCatOpen(false)}
                >
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { router.push(`/loja?cat=${cat.id}`); setIsCatOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase hover:bg-[#f0faf7] hover:text-[#004d40] transition-colors flex items-center gap-2"
                    >
                      <span>{cat.emoji}</span> {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deals */}
            <button
              onClick={() => router.push('/#promos')}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#004d40] hover:bg-gray-100 transition-colors"
            >
              Promoções
            </button>

            {/* Delivery dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsDeliveryOpen(true)}
                onMouseLeave={() => setIsDeliveryOpen(false)}
                onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                className="flex items-center gap-1 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[#004d40] hover:bg-gray-100 transition-colors"
              >
                Entrega <span className="text-[8px]">▼</span>
              </button>
              {isDeliveryOpen && (
                <div
                  className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl z-50 p-4"
                  onMouseEnter={() => setIsDeliveryOpen(true)}
                  onMouseLeave={() => setIsDeliveryOpen(false)}
                >
                  <div className="space-y-3">
                    <div className="border-l-2 border-[#ff9800] pl-3">
                      <p className="text-[10px] font-black uppercase text-[#004d40]">Entrega ao Domicílio</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Maputo e Matola • 24-48h</p>
                    </div>
                    <div className="border-l-2 border-[#004d40] pl-3">
                      <p className="text-[10px] font-black uppercase text-[#004d40]">Levantamento no Zimpeto</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Segunda a Sábado • 7h–18h</p>
                    </div>
                    <div className="border-l-2 border-gray-200 pl-3">
                      <p className="text-[10px] font-black uppercase text-gray-400">Transporte Fretado</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Para encomendas grandes — contacte-nos</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 relative" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Pesquisar produtos, fardos, frescos..."
                  className="w-full border-2 border-[#004d40] py-2.5 pl-4 pr-20 text-[12px] font-medium outline-none focus:ring-2 focus:ring-[#ff9800] focus:border-[#ff9800] transition-all bg-white"
                />
                <div className="absolute right-0 flex items-center">
                  {/* Voice search icon */}
                  <button
                    type="button"
                    title="Pesquisa por voz"
                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#004d40] transition-colors text-base"
                  >
                    🎙
                  </button>
                  {/* Search submit */}
                  <button
                    type="submit"
                    className="bg-[#004d40] text-white h-full px-4 flex items-center justify-center hover:bg-[#00332b] transition-colors"
                  >
                    🔍
                  </button>
                </div>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 mt-0.5">
                {suggestions.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      router.push(`/loja?q=${encodeURIComponent(p.name)}`);
                      setShowSuggestions(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0faf7] transition-colors"
                  >
                    <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                      <img src={p.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-700 uppercase">{p.name}</p>
                      <p className="text-[10px] text-[#004d40] font-black">{p.price.toLocaleString('pt-MZ')} MT</p>
                    </div>
                    <span className="ml-auto text-[10px] text-gray-400">→</span>
                  </button>
                ))}
                <div className="border-t border-gray-100 px-4 py-2">
                  <button
                    onClick={() => { router.push(`/loja?q=${encodeURIComponent(searchQuery)}`); setShowSuggestions(false); }}
                    className="text-[10px] font-black text-[#ff9800] uppercase hover:underline"
                  >
                    Ver todos os resultados para "{searchQuery}" →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACCOUNT + CART */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Account */}
            <div className="relative group hidden sm:block">
              <button className="flex flex-col items-center text-[#004d40] p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer">
                <span className="text-xl">👤</span>
                <span className="text-[8px] font-black uppercase tracking-wider hidden lg:block">Conta</span>
              </button>
              <div className="absolute right-0 top-full w-48 bg-white border border-gray-100 shadow-xl z-50 hidden group-hover:block">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">A sua conta</p>
                </div>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase hover:bg-[#f0faf7] hover:text-[#004d40] transition-colors"
                >
                  Iniciar Sessão
                </button>
                <button className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase hover:bg-[#f0faf7] hover:text-[#004d40] transition-colors">
                  Registar
                </button>
                <button className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase hover:bg-[#f0faf7] hover:text-[#004d40] transition-colors">
                  As Minhas Encomendas
                </button>
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 text-[#004d40] cursor-pointer group p-2 hover:bg-gray-50 rounded transition-all relative"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
              <div className="hidden sm:block text-left">
                <div className="text-[8px] uppercase font-black tracking-wider text-gray-400">Cesto</div>
                <div className="text-lg font-black leading-none text-[#004d40]">{cartCount}</div>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff9800] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center sm:hidden">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-white overflow-hidden transition-all duration-300 border-b border-gray-200 ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="p-4 space-y-1">
          <div className="mb-3">
            <form onSubmit={handleSearch}>
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar..."
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 text-sm outline-none"
                />
                <button type="submit" className="bg-[#004d40] text-white px-4">🔍</button>
              </div>
            </form>
          </div>
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => { router.push(link.href); setIsMenuOpen(false); }}
              className="block w-full text-left font-black uppercase text-[#004d40] text-[11px] py-3 border-b border-gray-50 cursor-pointer hover:text-[#ff9800] transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2">
            <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Categorias</p>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.slice(1).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { router.push(`/loja?cat=${cat.id}`); setIsMenuOpen(false); }}
                  className="text-center p-2 bg-gray-50 rounded text-[10px] font-bold hover:bg-[#f0faf7] transition-colors"
                >
                  <div>{cat.emoji}</div>
                  <div className="text-[9px] mt-0.5 uppercase">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
