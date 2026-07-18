import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ShimmerText } from '../components/ShimmerText';
import { SlidersHorizontal, RotateCcw, ArrowLeft, Search, Check, X, Shield, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_EDITORIALS, EditorialBlock, EditorialHighlight } from '../data/brandEditorials';

export const BrandPage: React.FC = () => {
  const { selectedBrandId, setActivePage, setSelectedBrandId, products } = useShop();

  // Find the selected brand, default to Cartier if none selected
  const brand = useMemo(() => {
    return BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[0];
  }, [selectedBrandId]);

  // Local filters state
  const [localSearch, setLocalSearch] = useState('');
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Reset local filters on brand change
  useEffect(() => {
    setLocalSearch('');
    setSelectedGenders([]);
    setSelectedCategories([]);
    setMobileFiltersOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedBrandId]);

  // Filter lists constants
  const categoriesList = ['Sunglasses', 'Eyeglasses', 'Blue-Light'];
  const gendersList = ['Unisex', 'Male', 'Female'];

  // Toggle handlers
  const handleToggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    setSelectedGenders([]);
    setSelectedCategories([]);
  };

  // Get matching products for this brand
  const brandProducts = useMemo(() => {
    const list = products.length > 0 ? products : PRODUCTS;
    let result = list.filter((p) => p.brandId === brand.id);

    // Apply local search
    if (localSearch.trim() !== '') {
      const query = localSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.frameShape.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Apply gender filters
    if (selectedGenders.length > 0) {
      result = result.filter((p) => p.gender && selectedGenders.includes(p.gender));
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    return result;
  }, [brand.id, localSearch, selectedGenders, selectedCategories]);

  // Map high fashion background banner images based on origin
  const bannerImage = useMemo(() => {
    if (brand.origin.includes('France')) {
      return 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80';
    } else if (brand.origin.includes('Italy')) {
      return 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80';
    } else if (brand.origin.includes('UK') || brand.origin.includes('Switzerland')) {
      return 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=80';
    }
    return 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1600&q=80';
  }, [brand.origin]);

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 selection:bg-[#FF2800] selection:text-white">
      
      {/* Dynamic Luxury Hero Banner - Shifted upwards slightly for absolute visual balance */}
      <div className="relative h-[300px] sm:h-[350px] bg-neutral-900 overflow-hidden flex items-center justify-center">
        <img
          src={bannerImage}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 filter grayscale contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        
        {/* Brand Name overlay inside Banner - Lifted slightly for a high-fashion airy aesthetic */}
        <div className="relative text-center z-10 px-4 max-w-4xl -translate-y-2">
          <button
            onClick={() => {
              setActivePage('shop');
              setSelectedBrandId(null);
            }}
            className="inline-flex items-center space-x-2 text-white/75 hover:text-[#FF2800] transition-colors text-[10px] tracking-[0.2em] font-sans font-extrabold uppercase mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5px]" />
            <span>BACK TO SHOP DIRECTORY</span>
          </button>
          
          <h1 className="font-classic text-5xl sm:text-7xl tracking-widest text-white uppercase leading-none font-bold">
            <ShimmerText text={brand.name} baseColor="#FFFFFF" shimmerColor="#FF2800" />
          </h1>
          <p className="text-[#FF2800] text-xs sm:text-sm tracking-[0.4em] font-sans font-extrabold uppercase mt-4">
            {brand.origin.toUpperCase()} &middot; EST. {brand.est}
          </p>
        </div>
      </div>

      {/* Narrative Block & Editorial Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16 border-b border-neutral-100">
          <div className="lg:col-span-1 space-y-3">
            <span className="text-[10px] tracking-[0.25em] font-sans font-extrabold text-[#FF2800] uppercase">
              The Heritage Profile
            </span>
            <h2 className="font-classic text-2xl tracking-widest text-black uppercase font-bold leading-tight">
              HERITAGE & ATELIER ORIGINS
            </h2>
            <div className="flex flex-col space-y-1.5 pt-2 text-xs text-neutral-500 font-sans">
              <p><strong>HQ:</strong> {brand.origin}</p>
              <p><strong>Established:</strong> Year {brand.est}</p>
              <p><strong>Curation Status:</strong> Hand-Selected Bespoke Partner</p>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col justify-center">
            <p className="font-classic text-neutral-600 text-sm sm:text-base leading-relaxed tracking-wide italic">
              "{brand.story}"
            </p>
            <div className="w-16 h-[2px] bg-[#FF2800] mt-6" />
          </div>
        </div>

        {/* Localized Filter Toolbar & Catalog Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LOCAL FILTER SIDEBAR - Hidden on mobile, only shown on desktop */}
          <aside className="hidden lg:block space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="font-sans text-xs tracking-[0.25em] font-extrabold text-black uppercase">
                FILTER BESPOKE
              </h3>
              {(localSearch || selectedGenders.length > 0 || selectedCategories.length > 0) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-sans tracking-widest font-bold text-[#FF2800] flex items-center space-x-1.5 uppercase transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Filter: Search within brand */}
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">
                SEARCH DESIGN
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Round, Acetate..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white text-xs px-3.5 py-2.5 outline-none font-sans tracking-wide transition-all rounded-none"
                />
                <Search className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter: Gender */}
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">
                GENDER SUITE
              </h4>
              <div className="flex flex-col space-y-2.5">
                {gendersList.map((gender) => {
                  const isChecked = selectedGenders.includes(gender);
                  return (
                    <div
                      key={gender}
                      className="flex items-center space-x-2.5 group cursor-pointer"
                      onClick={() => handleToggleGender(gender)}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#FF2800] bg-[#FF2800] text-white'
                            : 'border-neutral-300 group-hover:border-black bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                      <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {gender}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter: Category */}
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">
                CATEGORY SUITE
              </h4>
              <div className="flex flex-col space-y-2.5">
                {categoriesList.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <div
                      key={cat}
                      className="flex items-center space-x-2.5 group cursor-pointer"
                      onClick={() => handleToggleCategory(cat)}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#FF2800] bg-[#FF2800] text-white'
                            : 'border-neutral-300 group-hover:border-black bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                      <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {cat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* BRAND PRODUCTS GRID */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 p-4 mb-8 text-xs text-neutral-500 font-sans">
              <div className="flex items-center justify-between w-full">
                <span>
                  Curation lists <strong className="text-black font-semibold">{brandProducts.length}</strong> luxurious designs
                </span>
                
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center space-x-1.5 text-black hover:text-[#FF2800] font-extrabold uppercase tracking-widest text-[11px]"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#FF2800]" />
                  <span>Filters</span>
                </button>

                <span className="hidden sm:inline-block text-[9px] tracking-widest text-[#FF2800] font-extrabold uppercase bg-white px-2.5 py-1 border border-neutral-100">
                  {brand.name.toUpperCase()} ATELIER
                </span>
              </div>
            </div>

            {brandProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {brandProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-neutral-200 bg-neutral-50/50">
                <SlidersHorizontal className="w-8 h-8 text-neutral-300 mx-auto mb-4" />
                <h4 className="font-sans text-xs tracking-widest font-extrabold text-black uppercase mb-1">
                  NO ATELIER MODELS MATCHED
                </h4>
                <p className="text-xs text-neutral-400 font-sans max-w-xs mx-auto mb-6">
                  No matching designs found for {brand.name} under current parameters. Try resetting your active filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-black hover:bg-[#FF2800] text-white font-sans text-[10px] tracking-widest uppercase font-extrabold py-3 px-6 transition-all duration-300"
                >
                  RESET LOCAL ATELIER FILTERS
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Brand Editorial & Curation Story Section */}
      {(() => {
        const editorial = BRAND_EDITORIALS[brand.id];
        if (!editorial) return null;
        return (
          <section className="mt-24 border-t border-neutral-100 bg-neutral-50/50 py-20 px-4 sm:px-6 lg:px-8 selection:bg-[#FF2800] selection:text-white">
            <div className="max-w-7xl mx-auto">
              
              {/* Header Title */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#FF2800] uppercase mb-3 block">
                  EXCLUSIVE DIRECTORY PROFILE
                </span>
                <h2 className="font-classic text-3xl sm:text-4xl tracking-widest text-black uppercase font-bold mb-4">
                  {editorial.title}
                </h2>
                <p className="text-xs tracking-[0.25em] text-neutral-400 font-sans font-extrabold uppercase">
                  {editorial.subtitle}
                </p>
                <div className="w-16 h-[2px] bg-[#FF2800] mx-auto mt-6" />
              </div>

              {/* Main Content Splits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-20">
                {/* Left Block: The Statement */}
                <div className="space-y-6">
                  <div className="border-l-2 border-[#FF2800] pl-6 py-2">
                    <span className="text-[9px] tracking-widest font-sans font-extrabold text-neutral-400 uppercase block mb-1">
                      THE HOUSE SIGNATURE
                    </span>
                    <h3 className="font-classic text-xl sm:text-2xl tracking-wider text-black uppercase font-bold">
                      {editorial.statementTitle}
                    </h3>
                  </div>
                  <p className="font-classic text-neutral-600 text-sm sm:text-base leading-relaxed tracking-wide italic">
                    "{editorial.statementText}"
                  </p>
                </div>

                {/* Right Block: Curation and Optional Innovation */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="font-sans text-[11px] tracking-widest font-extrabold text-black uppercase">
                      {editorial.curationTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed tracking-wide">
                      {editorial.curationText}
                    </p>
                  </div>

                  {editorial.innovationTitle && editorial.innovationText && (
                    <div className="space-y-4 pt-6 border-t border-neutral-100">
                      <h4 className="font-sans text-[11px] tracking-widest font-extrabold text-black uppercase text-[#FF2800]">
                        {editorial.innovationTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed tracking-wide">
                        {editorial.innovationText}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bento Highlights of Curation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {editorial.highlights.map((item, idx) => {
                  const icons = [Sparkles, Award, Shield];
                  const IconComponent = icons[idx] || Sparkles;
                  return (
                    <div key={idx} className="bg-white border border-neutral-100 p-8 flex flex-col justify-between hover:border-[#FF2800]/30 transition-all duration-300">
                      <div>
                        <div className="w-10 h-10 bg-neutral-50 flex items-center justify-center text-[#FF2800] mb-6">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h4 className="font-classic text-xs tracking-widest text-black uppercase font-bold mb-3">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-500 font-sans leading-relaxed tracking-wide">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-neutral-300 mt-6 block">
                        // CORE_METRIC_0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* INSURED DELIVERY PANEL */}
              <div className="bg-black text-white p-8 sm:p-12 md:p-16 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-neutral-900/40 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl">
                  <span className="text-[9px] tracking-[0.25em] font-sans font-extrabold text-[#FF2800] uppercase mb-4 block">
                    NATIONWIDE LOGISTICS
                  </span>
                  <h3 className="font-classic text-xl sm:text-2xl md:text-3xl tracking-widest uppercase font-bold mb-4">
                    {editorial.deliveryTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed tracking-wide max-w-2xl mb-8">
                    {editorial.deliveryText}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-neutral-900 pt-6 text-[10px] tracking-widest font-sans font-extrabold text-neutral-500 uppercase">
                    <div>Carrier: <span className="text-white">TCS Pakistan</span></div>
                    <div>Insurance: <span className="text-white">Fully Insured</span></div>
                    <div>Packaging: <span className="text-white">Si Mirage Signature Case</span></div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        );
      })()}

      {/* MOBILE FILTER SIDEBAR OVERLAY */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            
            {/* Backdrop closes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileFiltersOpen(false)}
            />

            <div className="absolute inset-y-0 left-0 max-w-full flex">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-80 bg-white p-6 shadow-2xl flex flex-col justify-between h-full overflow-y-auto selection:bg-[#FF2800] selection:text-white"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <h2 className="font-sans text-xs tracking-[0.25em] font-extrabold text-black uppercase">FILTERS</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 text-neutral-400 hover:text-black"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filter: Search within brand */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">
                      SEARCH DESIGN
                    </h4>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Round, Acetate..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white text-xs px-3.5 py-2.5 outline-none font-sans tracking-wide transition-all rounded-none"
                      />
                      <Search className="absolute right-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Mobile Gender filter */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">GENDER</h3>
                    <div className="flex flex-wrap gap-2">
                      {gendersList.map((gender) => {
                        const isChecked = selectedGenders.includes(gender);
                        return (
                          <button
                            key={gender}
                            onClick={() => handleToggleGender(gender)}
                            className={`text-[11px] px-3.5 py-2 border transition-all font-sans tracking-wide uppercase ${
                              isChecked
                                ? 'bg-[#FF2800] text-white border-[#FF2800] font-bold'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                            }`}
                          >
                            {gender}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile categories filter */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">CATEGORY</h3>
                    <div className="flex flex-wrap gap-2">
                      {categoriesList.map((cat) => {
                        const isChecked = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            onClick={() => handleToggleCategory(cat)}
                            className={`text-[11px] px-3.5 py-2 border transition-all font-sans tracking-wide uppercase ${
                              isChecked
                                ? 'bg-[#FF2800] text-white border-[#FF2800] font-bold'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-black'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <button
                    onClick={() => {
                      handleResetFilters();
                      setMobileFiltersOpen(false);
                    }}
                    className="w-full bg-neutral-100 hover:bg-[#FF2800] hover:text-white text-neutral-800 text-[10px] font-sans tracking-[0.2em] uppercase font-extrabold py-3 px-4 transition-colors"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
