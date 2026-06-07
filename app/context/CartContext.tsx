'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'ts'; // ts = Xichangana/Tswa

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  pt: {
    siteName: 'Zimpeto Wholesale',
    tagline: 'Mercado de Atacado',
    search: 'Pesquisar fardos e produtos...',
    cart: 'Cesto',
    home: 'Início',
    store: 'Loja',
    recipes: 'Receitas',
    contact: 'Contacto',
    location: 'Localização',
    addToCart: 'Adicionar ao Cesto',
    addShort: '+ Cesto',
    continueShopping: 'Continuar a comprar',
    checkout: 'Finalizar Encomenda',
    emptyCart: 'O seu cesto está vazio.',
    backToStore: 'Voltar à loja',
    total: 'Total',
    remove: 'Remover',
    qty: 'Qtd',
    loading: 'A carregar...',
    added: 'Adicionado ao cesto!',
    deliveryDetails: 'Detalhes de Entrega',
    paymentConfirm: 'Pagamento & Confirmação',
    billingInfo: 'Informações de Facturação',
    fullName: 'Nome Completo',
    phone: 'Telemóvel (M-Pesa)',
    nuit: 'NUIT (opcional)',
    address: 'Endereço de Entrega',
    emergency: 'Contacto de Emergência (opcional)',
    continuePayment: 'Continuar para Pagamento',
    required: 'Obrigatório',
    totalToPay: 'Total a Pagar',
    transferTo: 'Transferir para',
    important: 'Importante',
    paymentNote: 'Após o pagamento, envie o comprovativo para o WhatsApp +258 84 000 0000. A sua encomenda só sairá do armazém após a verificação do crédito.',
    finish: 'Concluir e Voltar ao Início',
    unavailable: 'Indisponível de momento',
    sendProof: 'Enviar Comprovativo no WhatsApp',
    contactsTitle: 'Contactos',
    contactsTagline: 'Apoio ao Cliente • Maputo & Matola',
    location2: 'Localização',
    locationValue: 'Mercado do Zimpeto, Bancada 42-B',
    whatsapp: 'WhatsApp',
    name: 'Nome',
    message: 'Mensagem',
    send: 'Enviar',
    login: 'Aceder à Conta',
    loginTagline: 'Zimpeto Online Marketplace',
    emailPhone: 'Email ou Telefone',
    password: 'Palavra-Passe',
    loginBtn: 'Entrar no Painel',
    forgotPass: 'Esqueceu a senha?',
    qualityBulk: 'Qualidade Bulk',
    heroPitch: 'Preços de atacado diretamente do Zimpeto para a sua porta.',
    shopCatalog: 'Comprar Catálogo',
    dailyEssentials: 'Essenciais Diários',
    otherEssentials: 'Outros Essenciais',
    recipesTitle: 'Receitas',
    recipesTagline: 'Receitas da Nossa Terra',
    viewRecipe: 'Ver Receita',
    back: '← Voltar',
    savings: 'Poupança',
    catalogTitle: 'Catálogo Wholesale',
    searchResult: 'resultados para',
    noResults: 'Nenhum produto encontrado.',
    skipToMain: 'Saltar para o conteúdo principal',
    openCart: 'Abrir cesto de compras',
    closeCart: 'Fechar cesto',
    closeMenu: 'Fechar menu',
    openMenu: 'Abrir menu de navegação',
    itemsInCart: 'artigos no cesto',
    phoneError: 'Por favor insira um número de telemóvel válido (9 dígitos)',
    nameError: 'O nome é obrigatório',
    addressError: 'O endereço é obrigatório',
    cooksLike: 'Cozinhe como um Chef com produtos do Zimpeto.',
    chefDesc: 'O segredo do sabor está na frescura dos ingredientes. Use a nossa base de frescos e mercearia para elevar o nível do seu negócio ou jantar familiar.',
    exploreRecipes: 'Explorar Novas Receitas',
    ref: 'Ref',
    bankNIB: 'NIB Millenium BIM',
  },
  en: {
    siteName: 'Zimpeto Wholesale',
    tagline: 'Wholesale Market',
    search: 'Search bulk products...',
    cart: 'Cart',
    home: 'Home',
    store: 'Store',
    recipes: 'Recipes',
    contact: 'Contact',
    location: 'Location',
    addToCart: 'Add to Cart',
    addShort: '+ Cart',
    continueShopping: 'Continue Shopping',
    checkout: 'Checkout',
    emptyCart: 'Your cart is empty.',
    backToStore: 'Back to store',
    total: 'Total',
    remove: 'Remove',
    qty: 'Qty',
    loading: 'Loading...',
    added: 'Added to cart!',
    deliveryDetails: 'Delivery Details',
    paymentConfirm: 'Payment & Confirmation',
    billingInfo: 'Billing Information',
    fullName: 'Full Name',
    phone: 'Phone (M-Pesa)',
    nuit: 'NUIT (optional)',
    address: 'Delivery Address',
    emergency: 'Emergency Contact (optional)',
    continuePayment: 'Continue to Payment',
    required: 'Required',
    totalToPay: 'Total to Pay',
    transferTo: 'Transfer to',
    important: 'Important',
    paymentNote: 'After payment, send proof to WhatsApp +258 84 000 0000. Your order will only leave the warehouse after credit verification.',
    finish: 'Finish & Return Home',
    unavailable: 'Unavailable for now',
    sendProof: 'Send Proof on WhatsApp',
    contactsTitle: 'Contacts',
    contactsTagline: 'Customer Support • Maputo & Matola',
    location2: 'Location',
    locationValue: 'Zimpeto Market, Stand 42-B',
    whatsapp: 'WhatsApp',
    name: 'Name',
    message: 'Message',
    send: 'Send',
    login: 'Sign In',
    loginTagline: 'Zimpeto Online Marketplace',
    emailPhone: 'Email or Phone',
    password: 'Password',
    loginBtn: 'Enter Panel',
    forgotPass: 'Forgot password?',
    qualityBulk: 'Bulk Quality',
    heroPitch: 'Wholesale prices directly from Zimpeto to your door.',
    shopCatalog: 'Shop Catalog',
    dailyEssentials: 'Daily Essentials',
    otherEssentials: 'Other Essentials',
    recipesTitle: 'Recipes',
    recipesTagline: 'Recipes from Our Land',
    viewRecipe: 'View Recipe',
    back: '← Back',
    savings: 'Savings',
    catalogTitle: 'Wholesale Catalog',
    searchResult: 'results for',
    noResults: 'No products found.',
    skipToMain: 'Skip to main content',
    openCart: 'Open shopping cart',
    closeCart: 'Close cart',
    closeMenu: 'Close menu',
    openMenu: 'Open navigation menu',
    itemsInCart: 'items in cart',
    phoneError: 'Please enter a valid phone number (9 digits)',
    nameError: 'Name is required',
    addressError: 'Address is required',
    cooksLike: 'Cook like a Chef with Zimpeto products.',
    chefDesc: 'The secret of flavor lies in the freshness of ingredients. Use our fresh produce and grocery base to elevate your business or family dinner.',
    exploreRecipes: 'Explore New Recipes',
    ref: 'Ref',
    bankNIB: 'NIB Millenium BIM',
  },
  ts: {
    siteName: 'Zimpeto Wholesale',
    tagline: 'Xitolo xa ku xavisa kà ku tlhela',
    search: 'Lava swilo...',
    cart: 'Ndzhaka',
    home: 'Kaya',
    store: 'Xitolo',
    recipes: 'Swakudya',
    contact: 'Vutlhambeti',
    location: 'Ndhawu',
    addToCart: 'Engetela eka Ndzhaka',
    addShort: '+ Ndzhaka',
    continueShopping: 'Ya emahlweni ku xava',
    checkout: 'Hetisela Ku Xava',
    emptyCart: 'Ndzhaka ya wena yi nga na nchumu.',
    backToStore: 'Buyela eka xitolo',
    total: 'Xitalo',
    remove: 'Susa',
    qty: 'Ntlawa',
    loading: 'Ku layixa...',
    added: 'Ku engeteliwe eka ndzhaka!',
    deliveryDetails: 'Swivutiso swa Ku Hererisa',
    paymentConfirm: 'Ku Hakela & Ku Tiyisisa',
    billingInfo: 'Vutomi bya Ku Hakela',
    fullName: 'Vito Hinkwako',
    phone: 'Xirungamelo (M-Pesa)',
    nuit: 'NUIT (a swi laveki)',
    address: 'Ndhawu ya Ku Hererisa',
    emergency: 'Vutlhambeti bya Xidokodela (a swi laveki)',
    continuePayment: 'Ya Emahlweni eka Ku Hakela',
    required: 'Swi Laveka',
    totalToPay: 'Xitalo xa ku Hakela',
    transferTo: 'Rhumela eka',
    important: 'Swi Boha',
    paymentNote: 'Endzhaku ka ku hakela, rhumela vufaniso bya ku hakela eka WhatsApp +258 84 000 0000.',
    finish: 'Hetisa & Buyela Ekaya',
    unavailable: 'A ri kona sweswi',
    sendProof: 'Rhumela Vufaniso eka WhatsApp',
    contactsTitle: 'Vutlhambeti',
    contactsTagline: 'Mpfuneto wa Maxava • Maputo & Matola',
    location2: 'Ndhawu',
    locationValue: 'Xitolo xa Zimpeto, Ndzhaka 42-B',
    whatsapp: 'WhatsApp',
    name: 'Vito',
    message: 'Marito',
    send: 'Rhumela',
    login: 'Nghena eka Akawunti',
    loginTagline: 'Zimpeto Online Marketplace',
    emailPhone: 'Email kumbe Xirungamelo',
    password: 'Phasiwedi',
    loginBtn: 'Nghena',
    forgotPass: 'U rivalile phasiwedi?',
    qualityBulk: 'Ku Xava Kà ku Tlhela',
    heroPitch: 'Swixavo swa ku tlhela ku suka eka Zimpeto kuya eka n\'wina.',
    shopCatalog: 'Xava Sweswi',
    dailyEssentials: 'Swilo swa Siku na Siku',
    otherEssentials: 'Swilo Swin\'wana',
    recipesTitle: 'Swakudya',
    recipesTagline: 'Swakudya swa Misava ya Hina',
    viewRecipe: 'Vona Swakudya',
    back: '← Buyela',
    savings: 'Ku Ponisa',
    catalogTitle: 'Katalogo ya Ku Xava',
    searchResult: 'swiphemu swa',
    noResults: 'A ku ri na swilo.',
    skipToMain: 'Tlela eka nchumu lowukulu',
    openCart: 'Vula ndzhaka ya ku xava',
    closeCart: 'Pfala ndzhaka',
    closeMenu: 'Pfala menyu',
    openMenu: 'Vula menyu ya ku famba',
    itemsInCart: 'swilo eka ndzhaka',
    phoneError: 'Nghenisa nombolo ya xirungamelo leyi kahle (tinombolo ta 9)',
    nameError: 'Vito ri laveka',
    addressError: 'Ndhawu yi laveka',
    cooksLike: 'Pheka tani hi Chef hi ku tirhisa swilo swa Zimpeto.',
    chefDesc: 'Ximanga xa xiphemu xi nga eka ku tshwa ka swilo. Tirhisa swilo swa hina ku tlakusa xifundza xa wena.',
    exploreRecipes: 'Kambisisa Swakudya Swin\'wana',
    ref: 'Ref',
    bankNIB: 'NIB Millenium BIM',
  },
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  qtd: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'qtd'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAdded: string | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('pt');

  // Persist cart in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zimpeto_cart');
      if (saved) setCart(JSON.parse(saved));
      const savedLang = localStorage.getItem('zimpeto_lang') as Language;
      if (savedLang && ['pt', 'en', 'ts'].includes(savedLang)) setLanguage(savedLang);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('zimpeto_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try { localStorage.setItem('zimpeto_lang', lang); } catch {}
  };

  const t = (key: string): string => TRANSLATIONS[language][key] ?? TRANSLATIONS['pt'][key] ?? key;

  const addToCart = (product: Omit<CartItem, 'qtd'>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { ...product, qtd: 1 }];
    });
    setLastAdded(product.name);
    setTimeout(() => setLastAdded(null), 3000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQtd = Math.max(1, item.qtd + delta);
        return { ...item, qtd: newQtd };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qtd, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qtd, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity,
      cartCount, cartTotal, isCartOpen, setIsCartOpen, lastAdded,
      language, setLanguage: handleSetLanguage, t
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
