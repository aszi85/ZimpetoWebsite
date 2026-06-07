'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '../app/context/CartContext';
import type { Language } from '../app/context/CartContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen, language, setLanguage, t } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('store'), href: '/loja' },
    { name: t('recipes'), href: '/receitas' },
    { name: t('cart'), href: '/checkout' },
    { name: t('contact'), href: '/contacto' },
    { name: t('location'), href: '/localizacao' },
  ];

  const LANG_FLAGS: Record<Language, string> = { pt: 'PT', en: 'EN', ts: 'TS' };
  const LANG_LABELS: Record<Language, string> = { pt: 'Português', en: 'English', ts: 'Xichangana' };

  // Close menu on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard: close menu on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/loja?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-[#ff9800] focus:text-white focus:px-4 focus:py-2 focus:font-black focus:uppercase focus:text-xs focus:rounded"
      >
        {t('skipToMain')}
      </a>

      <nav
        className="w-full z-[100] bg-white border-b-2 border-gray-100 shadow-sm-10"
        role="navigation"
        aria-label="Navegação principal"
        ref={menuRef}
      >
        {/* TOP BAR */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center gap-4">

          {/* HAMBURGER — mobile */}
          <button
            ref={menuBtnRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            <span className="sr-only">{isMenuOpen ? t('closeMenu') : t('openMenu')}</span>
            <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
              <span className={`block w-full h-0.5 bg-[#004d40] transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-[#004d40] transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-[#004d40] transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* LOGO */}
          <button
            onClick={() => router.push('/')}
            className="font-black text-xl md:text-2xl text-[#004d40] italic tracking-tighter shrink-0 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#ff9800] rounded transition-opacity"
            aria-label="Zimpeto Wholesale — Ir para Início"
          >
            ZIMPETO
            <span className="text-gray-400 text-[10px] not-italic ml-1 tracking-widest uppercase font-bold hidden sm:inline">
              Wholesale
            </span>
          </button>

          {/* SEARCH — desktop */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex relative max-w-2xl"
            role="search"
            aria-label="Pesquisar produtos"
          >
            <label htmlFor="search-input" className="sr-only">{t('search')}</label>
            <input
              id="search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder={t('search')}
              className={`w-full border-2 rounded-sm py-2.5 px-4 text-sm outline-none transition-all ${
                searchFocused ? 'border-[#ff9800] shadow-md' : 'border-[#004d40]'
              }`}
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-[#004d40] text-white px-8 rounded-r-sm hover:bg-[#ff9800] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-label="Pesquisar"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </form>

          {/* RIGHT: LANGUAGE + CART */}
          <div className="ml-auto flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative group" role="group" aria-label="Seleccionar idioma">
              <button
                className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-black uppercase text-[#004d40] border border-gray-200 rounded hover:border-[#ff9800] focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-all"
                aria-haspopup="true"
                aria-label={`Idioma: ${LANG_LABELS[language]}`}
              >
                <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {LANG_FLAGS[language]}
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-xl overflow-hidden opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all z-50 min-w-[140px]">
                {(['pt', 'en', 'ts'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`block w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase hover:bg-[#004d40] hover:text-white focus:outline-none focus:bg-[#004d40] focus:text-white transition-colors ${language === lang ? 'bg-[#004d40]/10 text-[#004d40]' : ''}`}
                    aria-current={language === lang ? 'true' : undefined}
                  >
                    {LANG_FLAGS[lang]} — {LANG_LABELS[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 text-[#004d40] font-bold p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff9800] rounded transition-all group"
              aria-label={`${t('openCart')} — ${cartCount} ${t('itemsInCart')}`}
            >
              <svg aria-hidden="true" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div className="hidden sm:block text-[10px] uppercase leading-none">
                {t('cart')}<br/>
                <span className="text-base font-black">{cartCount}</span>
              </div>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 sm:hidden bg-[#ff9800] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* GREEN NAV BAR — desktop */}
        <div className="bg-[#004d40] text-white hidden sm:block">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`py-4 px-4 text-[11px] font-black uppercase tracking-[0.15em] border-b-4 ${
                isActive(link.href) ? 'text-[#ff9800] border-[#ff9800]' : 'border-transparent hover:text-[#ff9800]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

        {/* MOBILE MENU */}
        <div
          id="mobile-menu"
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[500px] border-b-2 border-gray-100' : 'max-h-0'}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="p-4 space-y-3">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex gap-2" role="search">
              <label htmlFor="mobile-search" className="sr-only">{t('search')}</label>
              <input
                id="mobile-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="flex-1 p-3 bg-gray-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#ff9800]"
              />
              <button type="submit" className="bg-[#004d40] text-white px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9800]" aria-label="Pesquisar">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </form>

            {/* Mobile language switcher */}
            <div className="flex gap-2" role="group" aria-label="Seleccionar idioma">
              {(['pt', 'en', 'ts'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-2 text-[10px] font-black uppercase rounded border transition-all focus:outline-none focus:ring-2 focus:ring-[#ff9800] ${
                    language === lang
                      ? 'bg-[#004d40] text-white border-[#004d40]'
                      : 'bg-white text-[#004d40] border-gray-200 hover:border-[#004d40]'
                  }`}
                  aria-current={language === lang ? 'true' : undefined}
                >
                  {LANG_FLAGS[lang]}
                </button>
              ))}
            </div>

            {/* Nav links */}
            <ul role="list" className="divide-y divide-gray-100">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => { router.push(link.href); setIsMenuOpen(false); }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`flex items-center gap-2 w-full text-left font-black uppercase text-xs py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9800] rounded transition-colors ${
                      isActive(link.href) ? 'text-[#ff9800]' : 'text-[#004d40]'
                    }`}
                  >
                    {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#ff9800]" aria-hidden="true"></span>}
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
