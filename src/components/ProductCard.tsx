import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActivePage, setSelectedProductId, addToCart, wishlist, toggleWishlist } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, 0); // Add first color option by default
    // Switch or let them see cart
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const salePercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer bg-white relative flex flex-col justify-between"
      onClick={handleCardClick}
    >
      
      {/* Product Image Stage */}
      <div className="relative aspect-[1/1.1] overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
        
        {/* SALE or NEW or LIMITED Badges */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-[9px] font-bold font-display tracking-widest px-2.5 py-1 z-10 select-none">
            {product.tag === 'SALE' && salePercentage > 0 ? `-${salePercentage}% OFF` : product.tag}
          </span>
        )}

        {/* Wishlist Shortcut Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-sm hover:scale-105 transition-all z-10"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-black text-black' : 'text-gray-400'}`} />
        </button>

        {/* Core Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Slick Hover Action Overlay (Quick Add to Bag) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-3 font-display text-[10px] tracking-widest uppercase font-bold shadow-lg flex items-center justify-center space-x-2 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>

      {/* Product Metadata Footer */}
      <div className="pt-4 pb-2 flex flex-col items-center text-center">
        <p className="text-[10px] uppercase font-display tracking-widest text-zinc-400 font-bold mb-1">
          {product.frameShape} &middot; {product.category}
        </p>
        <h3 className="text-sm font-semibold tracking-tight text-gray-900 group-hover:text-amber-800 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {/* Rating Star list */}
        <div className="flex items-center space-x-1 mt-1.5">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-zinc-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-zinc-400 font-sans">({product.reviewsCount})</span>
        </div>

        {/* Pricing Segment */}
        <div className="mt-2.5 flex items-center space-x-2">
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through font-sans">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-xs font-bold text-gray-950 font-sans">
            PKR {product.price.toLocaleString()}
          </span>
        </div>
      </div>

    </motion.div>
  );
};
