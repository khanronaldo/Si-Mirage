import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/ProductCard';
import { ShimmerText } from '../components/ShimmerText';
import { SlidersHorizontal, X, Heart, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Shop: React.FC = () => {
  const { wishlist, activePage, products, showSavedOnly, setShowSavedOnly } = useShop();

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Mobile Filter Overlay toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination state (Show More 15 at a time)
  const [visibleCount, setVisibleCount] = useState<number>(15);

  // Reset pagination when filter criteria change
  useEffect(() => {
    setVisibleCount(15);
  }, [selectedBrands, selectedGenders, selectedCategories, priceRange, showSavedOnly, sortBy, activePage]);

  // Filter list constants
  const categoriesList = ['Sunglasses', 'Eyeglasses', 'Blue-Light'];
  const gendersList = ['Unisex', 'Male', 'Female'];

  // Toggle handlers
  const handleToggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

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

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedCategories([]);
    setPriceRange(150000);
    setShowSavedOnly(false);
    setSortBy('featured');
  };

  // Filtered and sorted products memo
  const filteredProducts = useMemo(() => {
    const listToFilter = products.length > 0 ? products : PRODUCTS;
    let result = [...listToFilter];

    // Filter by collections/specials if routing matches
    if (activePage === 'new-arrivals') {
      result = result.filter((p) => p.tag === 'NEW');
    } else if (activePage === 'best-sellers') {
      result = result.filter((p) => p.rating >= 4.8);
    } else if (activePage === 'collections') {
      result = result.filter((p) => p.tag === 'LIMITED' || p.category === 'Limited');
    }

    // Filter by Brand checkbox list
    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brandId && selectedBrands.includes(p.brandId));
    }

    // Filter by Gender checkbox list
    if (selectedGenders.length > 0) {
      result = result.filter((p) => p.gender && selectedGenders.includes(p.gender));
    }

    // Filter by Category checkbox list
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by Price limit
    result = result.filter((p) => p.price <= priceRange);

    // Filter by Wishlist
    if (showSavedOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Sorting block
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedBrands, selectedGenders, selectedCategories, priceRange, showSavedOnly, sortBy, wishlist, activePage]);

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 selection:bg-[#FF2800] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header Page Heading */}
        <div className="border-b border-neutral-100 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#FF2800] font-extrabold mb-1">
              {activePage === 'new-arrivals' ? 'NEW IN STOCK' : activePage === 'best-sellers' ? 'POPULAR PICKS' : activePage === 'collections' ? 'ATELIER EXCLUSIVES' : 'ATELIER ESSENTIALS'}
            </p>
            <h1 className="font-classic text-3xl sm:text-4xl tracking-widest text-black uppercase leading-none font-bold mt-2">
              <ShimmerText
                text={
                  activePage === 'new-arrivals'
                    ? 'NEW ARRIVALS'
                    : activePage === 'best-sellers'
                    ? 'BEST SELLERS'
                    : activePage === 'collections'
                    ? 'LIMITED COLLECTIONS'
                    : 'ALL SILHOUETTES'
                }
                baseColor="#000000"
                shimmerColor="#FF2800"
              />
            </h1>
          </div>
          
          {/* Active Route Filter Indicator */}
          {activePage !== 'shop' && (
            <span className="mt-4 md:mt-0 text-[9px] tracking-[0.2em] font-sans bg-black text-white px-3.5 py-1.5 uppercase font-extrabold rounded-none shadow-sm">
              Filtered by: {activePage.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Main Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* DESKTOP SIDEBAR FILTERS COLUMN */}
          <aside className="hidden lg:block space-y-8 sticky top-32 self-start max-h-[calc(100vh-12rem)] overflow-y-auto pr-6 scrollbar-thin">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="font-sans text-xs tracking-[0.25em] font-extrabold text-black uppercase">FILTERS</h2>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-sans tracking-widest font-bold text-neutral-400 hover:text-[#FF2800] flex items-center space-x-1.5 uppercase transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Filter 1: Gender */}
            <div className="space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">GENDER</h3>
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
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {gender}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Categories */}
            <div className="space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">CATEGORY</h3>
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
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {cat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter 3: Brands (all 27 luxury brands with scroll) */}
            <div className="space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">LUXURY BRANDS</h3>
              <div className="flex flex-col space-y-2.5 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                {BRANDS.map((brand) => {
                  const isChecked = selectedBrands.includes(brand.id);
                  return (
                    <div
                      key={brand.id}
                      className="flex items-center space-x-2.5 group cursor-pointer"
                      onClick={() => handleToggleBrand(brand.id)}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#FF2800] bg-[#FF2800] text-white'
                            : 'border-neutral-300 group-hover:border-black bg-white'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500 group-hover:text-black'}`}>
                        {brand.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter 4: Price Limit */}
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">MAX PRICE</h3>
                <span className="text-xs font-bold text-black font-mono">PKR {priceRange.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={150000}
                step={5000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#FF2800] bg-neutral-100 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>PKR 20,000</span>
                <span>PKR 150,000</span>
              </div>
            </div>

            {/* Filter 5: Show Wishlist Saved Items */}
            <div className="pt-2">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`w-full flex items-center justify-between border p-3.5 text-left transition-all rounded-none ${
                  showSavedOnly
                    ? 'border-[#FF2800] bg-neutral-50 text-black font-semibold'
                    : 'border-neutral-200 text-neutral-500 hover:border-black'
                }`}
              >
                <span className="text-[10px] font-sans tracking-widest uppercase font-extrabold">Saved Wishlist</span>
                <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-[#FF2800] text-[#FF2800]' : 'text-neutral-400'}`} />
              </button>
            </div>

          </aside>

          {/* PRODUCTS DIRECTORY & LISTINGS COLUMN */}
          <main className="lg:col-span-3">
            
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-neutral-50 border border-neutral-100 p-4 mb-10 text-xs font-sans gap-4">
              <p className="text-neutral-500">
                Displaying <strong className="text-black font-semibold">{filteredProducts.length}</strong> bespoke silhouettes
              </p>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                {/* Mobile Filter Drawer trigger */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center space-x-1.5 text-black hover:text-[#FF2800] font-extrabold uppercase tracking-widest text-[11px]"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#FF2800]" />
                  <span>Filters</span>
                </button>

                {/* Sort selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400 hidden md:inline uppercase tracking-widest text-[10px] font-bold">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-neutral-200 px-3 py-2 focus:outline-none focus:border-black uppercase tracking-wider text-[10px] font-bold cursor-pointer"
                  >
                    <option value="featured">Featured models</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {visibleCount < filteredProducts.length && (
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 15)}
                      className="border-2 border-black hover:bg-[#FF2800] hover:border-[#FF2800] hover:text-white text-black font-sans text-xs tracking-[0.25em] uppercase font-extrabold py-4 px-10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                    >
                      SHOW MORE
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-28 border border-dashed border-neutral-200 bg-neutral-50/50">
                <SlidersHorizontal className="w-10 h-10 text-neutral-300 mx-auto mb-5" />
                <h3 className="font-sans text-xs tracking-widest font-extrabold text-black uppercase mb-1.5">NO SILHOUETTES MATCHED</h3>
                <p className="text-xs text-neutral-400 font-sans max-w-sm mx-auto mb-8">
                  No exquisite frames match your filtration selections. Try relaxing your parameters or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-black hover:bg-[#FF2800] text-white font-sans text-xs tracking-widest uppercase font-extrabold py-3.5 px-8 transition-colors duration-300"
                >
                  RESET ACTIVE FILTERS
                </button>
              </div>
            )}

          </main>
        </div>

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

                    {/* Mobile Brands checklist */}
                    <div className="space-y-3">
                      <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">LUXURY BRANDS</h3>
                      <div className="flex flex-col space-y-2.5 max-h-52 overflow-y-auto pr-2 border-l border-neutral-100 pl-3">
                        {BRANDS.map((brand) => {
                          const isChecked = selectedBrands.includes(brand.id);
                          return (
                            <div
                              key={brand.id}
                              className="flex items-center space-x-2.5 group cursor-pointer"
                              onClick={() => handleToggleBrand(brand.id)}
                            >
                              <div
                                className={`w-4 h-4 border flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'border-[#FF2800] bg-[#FF2800] text-white'
                                    : 'border-neutral-300 bg-white'
                                }`}
                              >
                                {isChecked && (
                                  <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-xs transition-colors ${isChecked ? 'text-black font-semibold' : 'text-neutral-500'}`}>
                                {brand.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobile Price Limit Filter */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[10px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold">MAX PRICE</h3>
                        <span className="text-xs font-bold text-black font-mono">PKR {priceRange.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={20000}
                        max={150000}
                        step={5000}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full accent-[#FF2800] bg-neutral-100 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>

                    {/* Mobile Saved Filter Toggle */}
                    <button
                      onClick={() => setShowSavedOnly(!showSavedOnly)}
                      className={`w-full flex items-center justify-between border p-3.5 text-left transition-all ${
                        showSavedOnly
                          ? 'border-[#FF2800] bg-neutral-50 text-black font-semibold'
                          : 'border-neutral-200 text-neutral-500 hover:border-black'
                      }`}
                    >
                      <span className="text-[10px] font-sans tracking-widest uppercase font-extrabold">Saved Wishlist</span>
                      <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-[#FF2800] text-[#FF2800]' : 'text-neutral-400'}`} />
                    </button>
                  </div>

                  <div className="border-t border-neutral-100 pt-6 mt-6 space-y-2.5">
                    <button
                      onClick={handleResetFilters}
                      className="w-full border border-neutral-200 hover:border-black text-neutral-500 hover:text-black py-3.5 font-sans text-xs tracking-widest uppercase font-extrabold transition-colors duration-300"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full bg-black text-white py-3.5 font-sans text-xs tracking-[0.2em] font-bold uppercase hover:bg-neutral-900 transition-colors duration-300"
                    >
                      VIEW RESULTS ({filteredProducts.length})
                    </button>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
