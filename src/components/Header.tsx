import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, X, LogOut, Menu, ChevronDown } from 'lucide-react';
import { useShop, PageRoute } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setSelectedProductId,
    selectedBrandId,
    setSelectedBrandId,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    wishlist,
    user,
    logout,
    setIsAuthOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setShowSavedOnly,
  } = useShop();

  const [promoIndex, setPromoIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false);
  const [mobileBrandsExpanded, setMobileBrandsExpanded] = useState(false);
  const [desktopShopHovered, setDesktopShopHovered] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [scrolled, setScrolled] = useState(false);

  const promos = [
    'ELEVATE YOUR VISION | FREE SHIPPING ABOVE PKR 10,000',
    'SI. MIRAGE | HANDCRAFTED CLASSIC EYEWEAR',
    'EXCLUSIVELY YOURS | UP TO 40% OFF SELECT STYLES'
  ];

  const shopCategories = [
    { id: 'all', label: 'SHOP ALL' },
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'new-arrivals', label: 'NEW ARRIVALS' },
    { id: 'limited-edition', label: 'LIMITED EDITION' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const brandMatchIds = BRANDS.filter(b => b.name.toLowerCase().includes(query)).map(b => b.id);
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.frameShape.toLowerCase().includes(query) ||
          brandMatchIds.includes(p.brandId)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  const handleNavClick = (page: PageRoute) => {
    setActivePage(page);
    setSelectedProductId(null);
    setSelectedBrandId(null);
    setMobileMenuOpen(false);
    setShowSavedOnly(false);
  };

  const handleBrandClick = (brandId: string) => {
    setSelectedBrandId(brandId);
    setActivePage('brand');
    setSelectedProductId(null);
    setMobileMenuOpen(false);
    setDesktopShopHovered(false);
    setShowSavedOnly(false);
  };

  const handleShopCategoryClick = (categoryId: string, label: string) => {
    setActivePage('shop'); 
    setShowSavedOnly(false);
    
    if (categoryId === 'all') {
      setSearchQuery('');
    } else {
      setSearchQuery(label.toLowerCase()); 
    }
    
    setSelectedProductId(null);
    setMobileMenuOpen(false);
    setDesktopShopHovered(false);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          .font-classic {
            font-family: 'Playfair Display', serif !important;
            letter-spacing: 0.08em !important;
          }
          
          .font-clean {
            font-family: 'Montserrat', sans-serif !important;
          }

          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.015;
          }
        `}
      </style>

      {/* Promo Banner - Fixed on top with smooth collapse and fade on scroll */}
      <div 
        id="promo-banner" 
        className={`fixed top-0 left-0 right-0 bg-[#080808] text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-center font-clean overflow-hidden z-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-8 opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-500/30 to-transparent" />
        
        <AnimatePresence mode="wait">
          {!scrolled && (
            <motion.div
              key={promoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center font-clean text-neutral-200"
            >
              {promos[promoIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Header - Optimised positioning for absolute mobile alignment */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
          scrolled ? 'translate-y-0 md:translate-y-1.5' : 'translate-y-8 md:translate-y-[38px]'
        } px-0 md:px-8 pointer-events-none`}
      >
        <header 
          id="main-header" 
          className={`mx-auto max-w-6xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto backdrop-blur-md ${
            scrolled 
              ? 'bg-black/95 md:bg-black/90 border-b border-neutral-900 md:border md:border-white/10 text-white py-1 rounded-none md:rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.6)]' 
              : 'bg-white/95 border-b border-neutral-200/50 md:border md:border-neutral-200/80 text-black py-1.5 rounded-none md:rounded-full shadow-sm md:shadow-[0_15px_35px_rgba(0,0,0,0.15)]'
          }`}
        >
          <div className="absolute inset-0 bg-noise rounded-none md:rounded-full pointer-events-none" />
          <div className="px-4 sm:px-10 relative flex items-center justify-between h-12">
            
            {/* MOBILE ONLY */}
            <div className="flex items-center justify-between w-full md:hidden">
              <button
                className={`p-2 rounded-full transition-colors ${scrolled ? 'text-white hover:text-[#FF2800]' : 'text-black hover:text-[#FF2800]'}`}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6 transition-colors duration-300" />
              </button>
              
              <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
                <img 
                  src="/logo.png" 
                  alt="Si-Mirage" 
                  className={`h-5.5 object-contain transition-all duration-500 ${
                    scrolled ? 'invert brightness-200' : ''
                  }`} 
                />
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className={`p-2 relative rounded-full transition-colors duration-300 ${scrolled ? 'text-white hover:text-[#FF2800]' : 'text-black hover:text-[#FF2800]'}`}
              >
                <ShoppingBag className="w-5.5 h-5.5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#FF2800] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-clean">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* DESKTOP ONLY */}
            <div className="hidden md:flex items-center justify-between w-full">
              
              {/* Nav Links */}
              <div className="flex items-center gap-7 lg:gap-9 flex-1 justify-start">
                {/* HOME */}
                <button
                  onClick={() => handleNavClick('home')}
                  className={`group relative font-classic text-[13px] font-bold uppercase py-2 transition-colors duration-500 ease-in-out ${
                    activePage === 'home' 
                      ? (scrolled ? 'text-white' : 'text-black') 
                      : (scrolled ? 'text-neutral-300 hover:text-white' : 'text-neutral-800 hover:text-black')
                  }`}
                >
                  <span className="relative z-10 block transition-transform duration-500 ease-out group-hover:-translate-y-[2px]">
                    HOME
                  </span>
                  <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[1.5px] rounded-full bg-[#FF2800] transition-all duration-500 ease-out ${
                    activePage === 'home' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`} />
                </button>

                {/* SHOP */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setDesktopShopHovered(true)}
                  onMouseLeave={() => setDesktopShopHovered(false)}
                >
                  <button
                    onClick={() => handleNavClick('shop')}
                    className={`group relative font-classic text-[13px] font-bold uppercase flex items-center gap-1.5 py-1 transition-colors duration-500 ease-in-out ${
                      activePage === 'shop' 
                        ? (scrolled ? 'text-white' : 'text-black') 
                        : (scrolled ? 'text-neutral-300 hover:text-white' : 'text-neutral-800 hover:text-black')
                    }`}
                  >
                    <span className="relative z-10 block transition-transform duration-500 ease-out group-hover:-translate-y-[2px]">
                      SHOP
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-all duration-500 ease-out ${desktopShopHovered ? 'rotate-180 text-current' : 'text-current'}`} />
                    <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[1.5px] rounded-full bg-[#FF2800] transition-all duration-500 ease-out ${
                      activePage === 'shop' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`} />
                  </button>

                  <AnimatePresence>
                    {desktopShopHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute left-1/2 -translate-x-1/2 mt-3 w-[90vw] max-w-5xl border shadow-[0_25px_50px_rgba(0,0,0,0.3)] rounded-3xl p-8 z-50 overflow-hidden backdrop-blur-xl ${
                          scrolled 
                            ? 'bg-[#0c0c0c]/95 border-white/10 text-white' 
                            : 'bg-white/95 border-neutral-200/50 text-black'
                        }`}
                      >
                        <div className="absolute inset-0 bg-noise pointer-events-none" />
                        <div className="grid grid-cols-5 gap-8 relative z-10">
                          {/* Column 1: Collections */}
                          <div className={`space-y-4 pr-4 border-r ${scrolled ? 'border-white/10' : 'border-neutral-200/80'}`}>
                            <p className="text-[10px] tracking-[0.25em] font-sans font-extrabold text-[#FF2800] uppercase">
                              Collections
                            </p>
                            <div className="flex flex-col space-y-3">
                              {shopCategories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => handleShopCategoryClick(cat.id, cat.label)}
                                  className={`text-left font-classic text-[12px] font-bold transition-all duration-300 hover:text-[#FF2800] ${
                                    scrolled ? 'text-neutral-300' : 'text-neutral-800'
                                  }`}
                                >
                                  {cat.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Columns 2-5: Luxury Brands */}
                          <div className="col-span-4 space-y-4">
                            <p className="text-[10px] tracking-[0.25em] font-sans font-extrabold text-neutral-400 uppercase">
                              Luxury Brands
                            </p>
                            <div className="grid grid-cols-4 gap-x-6 gap-y-3.5">
                              {BRANDS.map((brand) => (
                                <button
                                  key={brand.id}
                                  onClick={() => handleBrandClick(brand.id)}
                                  className={`text-left font-sans text-[12px] tracking-wide block w-full transform transition-all duration-200 hover:text-[#FF2800] hover:translate-x-1 origin-left ${
                                    scrolled ? 'text-neutral-300' : 'text-neutral-700'
                                  }`}
                                >
                                  {brand.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CONTACT US */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`group relative font-classic text-[13px] font-bold uppercase py-2 transition-colors duration-500 ease-in-out ${
                    activePage === 'contact' 
                      ? (scrolled ? 'text-white' : 'text-black') 
                      : (scrolled ? 'text-neutral-300 hover:text-white' : 'text-neutral-800 hover:text-black')
                  }`}
                >
                  <span className="relative z-10 block transition-transform duration-500 ease-out group-hover:-translate-y-[2px]">
                    CONTACT US
                  </span>
                  <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[1.5px] rounded-full bg-[#FF2800] transition-all duration-500 ease-out ${
                    activePage === 'contact' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`} />
                </button>
              </div>

              {/* Center Logo */}
              <div
                className="cursor-pointer select-none transform transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] z-20 flex-shrink-0 relative mx-8"
                onClick={() => handleNavClick('home')}
              >
                <img 
                  src="/logo.png" 
                  alt="Si-Mirage" 
                  className={`h-7 lg:h-7.5 object-contain transition-all duration-500 ${
                    scrolled ? 'invert brightness-200' : ''
                  }`} 
                />
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-2.5 lg:gap-3.5 flex-1 justify-end">
                {/* SEARCH */}
                <button 
                  onClick={() => setIsSearchOpen(true)} 
                  className={`group relative p-2 rounded-full transition-colors duration-500 ${
                    scrolled ? 'text-neutral-300 hover:text-[#FF2800]' : 'text-neutral-800 hover:text-[#FF2800]'
                  }`}
                >
                  <Search className="w-5.5 h-5.5 relative z-10 transition-transform duration-500 ease-out group-hover:scale-110" />
                </button>

                {/* WISHLIST */}
                <button 
                  onClick={() => {
                    handleNavClick('shop');
                    setShowSavedOnly(true);
                  }} 
                  className={`group relative p-2 rounded-full transition-colors duration-500 ${
                    scrolled ? 'text-neutral-300 hover:text-[#FF2800]' : 'text-neutral-800 hover:text-[#FF2800]'
                  }`}
                >
                  <Heart className={`w-5.5 h-5.5 relative z-10 transition-transform duration-500 ease-out group-hover:scale-110 ${wishlist.length > 0 ? 'fill-[#FF2800] text-[#FF2800]' : ''}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 bg-[#FF2800] text-white text-[9px] font-bold font-clean rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* USER */}
                {user ? (
                  <div className="relative group">
                    <button className={`p-2 rounded-full transition-colors duration-500 ${
                      scrolled ? 'text-neutral-300 hover:text-[#FF2800]' : 'text-neutral-800 hover:text-[#FF2800]'
                    }`}>
                      <User className="w-5.5 h-5.5 transition-transform duration-500 ease-out group-hover:scale-110" />
                    </button>
                    <div className={`absolute right-0 top-full mt-3 w-56 border shadow-2xl py-2 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50 backdrop-blur-xl ${
                      scrolled ? 'bg-[#080808]/95 border-white/10' : 'bg-white/95 border-neutral-200/50'
                    }`}>
                      <div className="px-5 py-3 border-b border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400 font-clean">ACCOUNT</p>
                        <p className={`text-xs font-bold font-classic truncate mt-1 ${scrolled ? 'text-neutral-200' : 'text-neutral-900'}`}>{user.email}</p>
                      </div>
                      <button onClick={() => handleNavClick('admin')} className={`w-full text-left px-5 py-2.5 text-[12px] font-bold font-classic tracking-wider transition-colors duration-500 ${scrolled ? 'text-neutral-300 hover:bg-white/5 hover:text-[#FF2800]' : 'text-neutral-800 hover:bg-neutral-50 hover:text-[#FF2800]'}`}>
                        DASHBOARD
                      </button>
                      <button onClick={logout} className={`w-full text-left px-5 py-2.5 text-[12px] font-bold font-classic tracking-wider transition-colors duration-500 flex items-center space-x-2 ${scrolled ? 'text-neutral-300 hover:bg-white/5 hover:text-[#FF2800]' : 'text-neutral-800 hover:bg-neutral-50 hover:text-[#FF2800]'}`}>
                        <LogOut className="w-4 h-4 text-current" />
                        <span>LOGOUT</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAuthOpen(true)} 
                    className={`group relative p-2 rounded-full transition-colors duration-500 ${
                      scrolled ? 'text-neutral-300 hover:text-[#FF2800]' : 'text-neutral-800 hover:text-[#FF2800]'
                    }`}
                  >
                    <User className="w-5.5 h-5.5 relative z-10 transition-transform duration-500 ease-out group-hover:scale-110" />
                  </button>
                )}

                {/* CART */}
                <button 
                  onClick={() => setIsCartOpen(true)} 
                  className={`group relative p-2 rounded-full transition-colors duration-500 ${
                    scrolled ? 'text-neutral-300 hover:text-[#FF2800]' : 'text-neutral-800 hover:text-[#FF2800]'
                  }`}
                >
                  <ShoppingBag className="w-5.5 h-5.5 relative z-10 transition-transform duration-500 ease-out group-hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#FF2800] text-white text-[9px] font-bold font-clean rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

            </div>

          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[85vw] max-w-[340px] bg-black text-white z-[70] flex flex-col justify-between md:hidden overflow-y-auto border-r border-white/10"
            >
              <div className="absolute inset-0 bg-noise pointer-events-none" />
              <div>
                <div className="relative flex flex-col items-center border-b border-white/5 pb-8 pt-16 px-6">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-5 right-5 p-2.5 text-neutral-400 hover:text-white transition-all duration-300 border border-white/10 rounded-full bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img src="/logo.png" alt="Si-Mirage" className="h-9 object-contain select-none invert brightness-200" />
                </div>

                <div className="grid grid-cols-3 gap-1 p-4 mb-6 border-b border-white/5 bg-white/5">
                  <button onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }} className="flex flex-col items-center justify-center space-y-2 py-3 text-neutral-400 hover:text-white transition-colors duration-300">
                    <Search className="w-5.5 h-5.5" />
                    <span className="text-[10px] font-bold tracking-widest font-clean uppercase text-neutral-500">Search</span>
                  </button>
                  
                  <button onClick={() => { handleNavClick('shop'); setShowSavedOnly(true); setMobileMenuOpen(false); }} className="relative flex flex-col items-center justify-center space-y-2 py-3 text-neutral-400 hover:text-white transition-colors duration-300">
                    <Heart className={`w-5.5 h-5.5 ${wishlist.length > 0 ? 'fill-white text-white' : ''}`} />
                    <span className="text-[10px] font-bold tracking-widest font-clean uppercase text-neutral-500">Wishlist</span>
                  </button>

                  <button onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }} className="relative flex flex-col items-center justify-center space-y-2 py-3 text-neutral-400 hover:text-white transition-colors duration-300">
                    <ShoppingBag className="w-5.5 h-5.5" />
                    <span className="text-[10px] font-bold tracking-widest font-clean uppercase text-neutral-500">Cart</span>
                  </button>
                </div>

                <nav className="flex flex-col space-y-8 px-8">
                  <button onClick={() => handleNavClick('home')} className="flex items-center text-left font-classic text-[14px] font-bold text-neutral-300 hover:text-white transition-colors duration-300 uppercase">
                    HOME
                  </button>

                  <div className="flex flex-col w-full">
                    <button onClick={() => setMobileShopExpanded(!mobileShopExpanded)} className="flex items-center justify-between text-left font-classic text-[14px] font-bold text-neutral-300 hover:text-white transition-colors duration-300 w-full uppercase">
                      <span>SHOP</span>
                      <ChevronDown className={`w-4.5 h-4.5 transform transition-transform duration-300 ${mobileShopExpanded ? 'rotate-180 text-white' : 'text-neutral-500'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileShopExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden pl-4 flex flex-col space-y-6 mt-5 border-l border-white/10"
                        >
                          {/* Collections subsection */}
                          <div className="flex flex-col space-y-4">
                            <p className="text-[10px] tracking-widest text-neutral-500 font-bold uppercase">Collections</p>
                            {shopCategories.map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => handleShopCategoryClick(cat.id, cat.label)}
                                className="text-left font-classic text-[12px] font-bold text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 uppercase"
                              >
                                <span>{cat.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Brands nested accordion */}
                          <div className="flex flex-col w-full pt-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMobileBrandsExpanded(!mobileBrandsExpanded); }} 
                              className="flex items-center justify-between text-left font-classic text-[12px] font-bold text-neutral-400 hover:text-white transition-colors duration-300 w-full uppercase"
                            >
                              <span>Luxury Brands</span>
                              <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${mobileBrandsExpanded ? 'rotate-180 text-white' : 'text-neutral-500'}`} />
                            </button>
                            
                            <AnimatePresence>
                              {mobileBrandsExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden pl-3 grid grid-cols-2 gap-x-4 gap-y-3 mt-4 border-l border-white/5"
                                >
                                  {BRANDS.map((brand) => (
                                    <button
                                      key={brand.id}
                                      onClick={() => handleBrandClick(brand.id)}
                                      className="text-left font-sans text-[11px] text-neutral-400 hover:text-white transition-colors duration-300"
                                    >
                                      {brand.name}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button onClick={() => handleNavClick('heritage')} className="flex items-center text-left font-classic text-[14px] font-bold text-neutral-300 hover:text-white transition-colors duration-300 uppercase">
                    HERITAGE STORY
                  </button>

                  <button onClick={() => handleNavClick('contact')} className="flex items-center text-left font-classic text-[14px] font-bold text-neutral-300 hover:text-white transition-colors duration-300 uppercase">
                    CONTACT US
                  </button>
                </nav>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 pb-6 px-6 bg-[#040404]">
                {user ? (
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-neutral-400 font-clean mb-1">ACCOUNT</p>
                      <p className="text-sm font-bold font-classic text-white">{user.name}</p>
                    </div>
                    <button onClick={logout} className="p-2 text-neutral-400 hover:text-[#FF2800] transition-colors">
                      <LogOut className="w-5.5 h-5.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="w-full bg-white text-black py-4 font-classic text-[12px] font-bold uppercase hover:bg-[#FF2800] hover:text-white transition-colors duration-500"
                  >
                    SIGN IN
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern, Futuristic, Immersive Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-[100] overflow-y-auto px-6 py-12 sm:px-12 md:px-24 flex flex-col justify-start"
          >
            {/* Overlay Header */}
            <div className="max-w-6xl mx-auto w-full flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Si-Mirage" className="h-6 object-contain invert brightness-200" />
                <span className="text-[10px] tracking-[0.25em] font-sans font-extrabold text-neutral-500 uppercase ml-2 hidden sm:inline">Search Lab</span>
              </div>
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }} 
                className="text-neutral-400 hover:text-[#FF2800] transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Core Search Section */}
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
              {/* Input container */}
              <div className="relative border-b border-neutral-800 focus-within:border-[#FF2800] transition-colors duration-300 pb-3 mb-6">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH FOR SILHOUETTES, BRANDS, OR STYLES..."
                  className="w-full bg-transparent border-none outline-none font-classic text-xl sm:text-2xl md:text-3xl text-white placeholder-neutral-700 tracking-wider uppercase font-medium pr-10"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
              </div>

              {/* Suggestions */}
              {searchQuery.trim() === '' ? (
                <div className="mt-4">
                  <p className="text-[10px] tracking-widest text-neutral-500 font-bold uppercase mb-4">Suggested searches</p>
                  <div className="flex flex-wrap gap-2.5">
                    {['Sunglasses', 'Eyeglasses', 'Aviator', 'Round', 'Cartier', 'Balenciaga', 'New Arrivals'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-300 text-[11px] font-sans px-4 py-2 rounded-full cursor-pointer uppercase tracking-wider"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[10px] tracking-widest text-neutral-500 font-bold uppercase">
                      Search results ({searchResults.length})
                    </p>
                    {searchResults.length > 0 && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-[10px] tracking-wider text-neutral-400 hover:text-white transition-colors uppercase font-bold"
                      >
                        Clear query
                      </button>
                    )}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {searchResults.map((product) => {
                        const brandName = BRANDS.find(b => b.id === product.brandId)?.name || 'Luxury';
                        return (
                          <div 
                            key={product.id} 
                            onClick={() => {
                              setSelectedProductId(product.id);
                              setActivePage('pdp');
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 p-3 transition-all duration-300 flex flex-col justify-between"
                          >
                            <div className="aspect-[1/1.1] bg-neutral-900/40 flex items-center justify-center overflow-hidden mb-3 border border-neutral-900">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="h-4/5 object-contain transition-transform duration-500 group-hover:scale-105" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="text-[9px] tracking-widest text-[#FF2800] uppercase font-bold font-clean mb-0.5">
                                {brandName}
                              </p>
                              <h4 className="font-classic text-[11px] text-white uppercase tracking-wider group-hover:text-[#FF2800] transition-colors duration-200 line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="text-[9px] text-neutral-500 font-clean">{product.category}</p>
                              <p className="text-[10px] font-mono font-bold text-neutral-300 mt-2">
                                PKR {product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-neutral-950/20 border border-dashed border-neutral-900 rounded-2xl">
                      <p className="text-neutral-500 text-[10px] tracking-widest uppercase font-bold mb-3">
                        NO SILHOUETTES MATCHING "{searchQuery}"
                      </p>
                      <p className="font-classic text-sm text-neutral-400 max-w-sm uppercase italic leading-relaxed">
                        "Every silhouette is a mirage, yet yours remains to be discovered."
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-[10px] font-extrabold text-[#FF2800] hover:text-white transition-colors tracking-widest uppercase border-b border-[#FF2800] pb-1 cursor-pointer"
                      >
                        CLEAR SEARCH
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};