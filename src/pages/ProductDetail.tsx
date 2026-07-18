import React, { useState, useRef, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Star, Heart, ShoppingBag, Plus, Minus, Maximize2, ShieldCheck, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const { selectedProductId, addToCart, wishlist, toggleWishlist, setIsCartOpen, setActivePage, products } = useShop();

  // Find the selected product, fallback to the first product if undefined
  const product = useMemo(() => {
    const list = products.length > 0 ? products : PRODUCTS;
    return list.find((p) => p.id === selectedProductId) || list[0];
  }, [selectedProductId, products]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Accordion Toggles
  const [activeAccordion, setActiveAccordion] = useState<'specs' | 'shipping' | 'reviews' | null>('specs');

  // Zoom on hover states and references
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Review states
  const [reviews, setReviews] = useState([
    { author: 'Suleman K.', rating: 5, date: '2026-07-01', text: 'Exceptional craftsmanship. The beveled temples capture the sunlight perfectly. Lightweight and extremely comfortable.' },
    { author: 'Mehak A.', rating: 4, date: '2026-06-25', text: 'The lens clarity is incredible. Looks beautiful, although slightly larger than expected for my face shape.' }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = zoomContainerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.images[activeImageIdx] || product.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCartClick = () => {
    addToCart(product, quantity, selectedColorIdx);
  };

  const handleBuyNowClick = () => {
    addToCart(product, quantity, selectedColorIdx);
    setIsCartOpen(true);
  };

  const handleColorSelect = (idx: number) => {
    setSelectedColorIdx(idx);
    // Optionally switch the active image to the color's image
    const colorOpt = product.colors[idx];
    if (colorOpt && colorOpt.image) {
      const imgIdx = product.images.indexOf(colorOpt.image);
      if (imgIdx > -1) {
        setActiveImageIdx(imgIdx);
      }
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newReviewText) return;

    const newRev = {
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      text: newReviewText
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor('');
    setNewRating(5);
    setNewReviewText('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const toggleAccordion = (section: 'specs' | 'shipping' | 'reviews') => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 text-black selection:bg-[#FF2800] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumbs row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-neutral-100 pb-4">
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-black transition-colors text-[10px] tracking-[0.2em] font-sans font-extrabold uppercase"
          >
            <span>&larr; BACK TO EYEWEAR SHOP</span>
          </button>
          
          <div className="text-[10px] tracking-widest text-zinc-400 font-sans uppercase">
            <span>COLLECTIONS</span>
            <span className="mx-2">&middot;</span>
            <span>{product.category}</span>
            <span className="mx-2">&middot;</span>
            <span className="text-black font-semibold">{product.name}</span>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: IMAGE GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-neutral-50 border overflow-hidden relative rounded-xs shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Image Stage (with Zoom magnification and Lightbox trigger) */}
            <div className="flex-1 relative aspect-[1/1.1] bg-neutral-50 border border-neutral-100 overflow-hidden group">
              <div
                ref={zoomContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full cursor-zoom-in relative"
              >
                <img
                  src={product.images[activeImageIdx] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated Zoom Lens */}
                <div
                  className="absolute inset-0 pointer-events-none hidden md:block bg-no-repeat border border-gray-200 shadow-md transition-opacity"
                  style={zoomStyle}
                />
              </div>

              {/* Lightbox button shortcut */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-sm hover:scale-105 transition-all"
                aria-label="Maximize view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: STICKY DETAILS */}
        <div className="lg:col-span-5 space-y-8 sticky top-28">
          
          <div className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] tracking-[0.3em] font-display uppercase text-amber-700 font-bold mb-1.5">
                  {product.frameShape} &middot; {product.category}
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2.5 border border-gray-100 hover:border-black rounded-full shadow-xs transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-black text-black' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Stars rating */}
            <div className="flex items-center space-x-1.5 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-zinc-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-950 font-sans mt-0.5">{product.rating}</span>
              <span className="text-xs text-gray-400 font-sans mt-0.5">({reviews.length} reviews)</span>
            </div>

            {/* Product Pricing */}
            <div className="mt-5 flex items-baseline space-x-3">
              <span className="text-xl font-bold text-gray-950 font-sans">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through font-sans">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Color swatch selection */}
          <div>
            <h3 className="text-[10px] tracking-widest font-display text-gray-400 uppercase font-bold mb-3">
              FRAME COLOR: <span className="text-black">{product.colors[selectedColorIdx]?.name || product.frameColor}</span>
            </h3>
            <div className="flex space-x-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(idx)}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    selectedColorIdx === idx ? 'border-black ring-1 ring-black scale-105' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  aria-label={`Select ${color.name} color`}
                >
                  <span className="w-5 h-5 rounded-full block border border-zinc-100" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-4 border-b border-neutral-100 pb-8">
            <h3 className="text-[10px] tracking-widest font-sans text-neutral-400 uppercase font-extrabold">QUANTITY</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Selector */}
              <div className="flex items-center justify-between border border-neutral-200 bg-white h-12 w-full sm:w-32 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3.5 text-neutral-500 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold font-sans text-sm text-black select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3.5 text-neutral-500 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddToCartClick}
                className="flex-1 bg-white border border-black hover:bg-neutral-50 text-black font-sans text-xs tracking-widest font-extrabold uppercase h-12 flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNowClick}
                className="flex-1 bg-[#FF2800] hover:bg-[#D62200] text-white font-sans text-xs tracking-widest font-extrabold uppercase h-12 flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* ACCORDION DRAWER TABS (Details, Shipping, Reviews) */}
          <div className="space-y-3">
            
            {/* TAB 1: Specs */}
            <div className="border border-gray-100 rounded-sm">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 text-left transition-colors font-display"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">DETAILS & ATELIER SPECS</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${activeAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 'specs' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-100 font-sans text-xs text-gray-600 space-y-4">
                      <p className="leading-relaxed">{product.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-[11px]">
                        <div>
                          <p className="text-zinc-400 uppercase font-semibold">Frame Shape</p>
                          <p className="text-black font-semibold mt-0.5">{product.specs.frameShape}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400 uppercase font-semibold">Frame Material</p>
                          <p className="text-black font-semibold mt-0.5">{product.specs.frameMaterial}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400 uppercase font-semibold">Lens Treatment</p>
                          <p className="text-black font-semibold mt-0.5">{product.specs.treatment}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400 uppercase font-semibold">Dimensions</p>
                          <p className="text-black font-semibold mt-0.5 font-mono">{product.specs.dimensions.size} (Lens: {product.specs.dimensions.lensHeight} | Temple: {product.specs.dimensions.templeLength})</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TAB 2: Shipping */}
            <div className="border border-gray-100 rounded-sm">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 text-left transition-colors font-display"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">PREMIUM DELIVERY & RETURNS</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 'shipping' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-100 font-sans text-xs text-gray-600 space-y-3.5 leading-relaxed">
                      <p>
                        <strong>Free Priority Shipping:</strong> All orders above PKR 10,000 are eligible for free secure priority transport across Pakistan. Hand-checked and packaged at our Lahore workshop.
                      </p>
                      <p>
                        <strong>Delivery Time:</strong> 2-3 business days via TCS Priority Express. Trackable live link sent on dispatched.
                      </p>
                      <p>
                        <strong>Secure Returns:</strong> Complete peace of mind. We offer a 7-day hassle-free structural return or exchange policy on all frames provided they remain in premium original packaging.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TAB 3: Reviews */}
            <div className="border border-gray-100 rounded-sm">
              <button
                onClick={() => toggleAccordion('reviews')}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 text-left transition-colors font-display"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">REVIEWS ({reviews.length})</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${activeAccordion === 'reviews' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === 'reviews' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-100 space-y-6">
                      
                      {/* Live Review Form */}
                      <form onSubmit={handleAddReview} className="bg-gray-50 p-4 border border-gray-200 rounded-xs space-y-3">
                        <h4 className="text-[10px] tracking-widest font-display text-gray-800 font-bold uppercase">WRITE A CLIENT REVIEW</h4>
                        
                        {reviewSuccess && (
                          <div className="bg-emerald-50 text-emerald-800 text-[10px] p-2.5 rounded-xs border border-emerald-100">
                            Thank you! Your verified product review has been submitted successfully.
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[8px] tracking-widest text-zinc-400 font-display font-semibold uppercase mb-1">YOUR NAME</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Zainab A."
                              value={newAuthor}
                              onChange={(e) => setNewAuthor(e.target.value)}
                              className="w-full bg-white border border-gray-200 text-xs font-sans px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] tracking-widest text-zinc-400 font-display font-semibold uppercase mb-1">RATING (1-5)</label>
                            <select
                              value={newRating}
                              onChange={(e) => setNewRating(Number(e.target.value))}
                              className="w-full bg-white border border-gray-200 text-xs font-sans px-2 py-2 cursor-pointer"
                            >
                              <option value="5">5 Stars</option>
                              <option value="4">4 Stars</option>
                              <option value="3">3 Stars</option>
                              <option value="2">2 Stars</option>
                              <option value="1">1 Star</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[8px] tracking-widest text-zinc-400 font-display font-semibold uppercase mb-1">REVIEW COMMENT</label>
                          <textarea
                            required
                            rows={2}
                            placeholder="Describe comfort, fit, look, optical weight..."
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-xs font-sans px-3 py-2 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-black text-white font-display text-[9px] tracking-widest font-bold uppercase py-2 hover:bg-neutral-800 transition-colors"
                        >
                          SUBMIT REVIEW
                        </button>
                      </form>

                      {/* List of reviews */}
                      <div className="space-y-4 divide-y divide-gray-100 pt-2">
                        {reviews.map((rev, i) => (
                          <div key={i} className="pt-4 first:pt-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-xs font-bold text-gray-900 font-display uppercase">{rev.author}</p>
                                <div className="flex text-amber-500 mt-1">
                                  {[...Array(5)].map((_, rIdx) => (
                                    <Star key={rIdx} className={`w-3 h-3 ${rIdx < rev.rating ? 'fill-amber-500' : 'text-zinc-200'}`} />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[10px] text-zinc-400 font-mono">{rev.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 font-sans mt-2 leading-relaxed">{rev.text}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <p className="text-[10px] text-gray-400 font-sans flex items-center justify-center space-x-1 border-t border-gray-100 pt-6">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
            <span>Authenticated Si-Mirage masterpiece. Guaranteed 2-year warranty included.</span>
          </p>

        </div>

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] overflow-hidden flex items-center justify-center"
            >
              <img
                src={product.images[activeImageIdx] || product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-xs border border-zinc-900"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </div>
  );
};
