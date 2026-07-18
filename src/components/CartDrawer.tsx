import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    addMockOrder,
    setActivePage,
    setSelectedProductId
  } = useShop();

  // Checkout form visibility and values
  const [isCheckout, setIsCheckout] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  
  // Checkout progress
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !phone) return;

    setIsSubmitting(true);

    // Simulate luxury API call delay
    setTimeout(() => {
      const itemsToOrder = cart.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.selectedColor.image || item.product.image,
        colorName: item.selectedColor.name,
        colorHex: item.selectedColor.hex
      }));

      // Generate simulated order id
      const orderId = `SM-${Math.floor(1000 + Math.random() * 9000)}`;

      // Save order in mock DB
      const fullShippingAddress = `${address}, ${city}`;
      addMockOrder(name, email, itemsToOrder, fullShippingAddress, phone);
      
      // Complete state changes
      setIsSubmitting(false);
      setOrderSuccess(orderId);
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset states after animations complete
    setTimeout(() => {
      setIsCheckout(false);
      setOrderSuccess(null);
    }, 300);
  };

  const handleGoToShop = () => {
    setIsCartOpen(false);
    setSelectedProductId(null);
    setActivePage('shop');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full relative"
          >
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display text-sm tracking-[0.2em] font-bold text-black uppercase">
                {orderSuccess ? 'SUCCESS' : isCheckout ? 'SECURE CHECKOUT' : `SHOPPING BAG (${cartCount})`}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 text-gray-400 hover:text-black rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              
              {/* ORDER PLACED SUCCESS PANEL */}
              {orderSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="mb-6 text-amber-700"
                  >
                    <CheckCircle2 className="w-16 h-16 stroke-1.5" />
                  </motion.div>
                  
                  <h4 className="font-display text-base tracking-widest font-bold text-black uppercase mb-2">
                    ORDER PLACED SUCCESSFULLY!
                  </h4>
                  <p className="text-xs text-gray-500 font-sans max-w-xs mb-6">
                    Thank you for choosing Si-Mirage Eyewear. Your handcrafted eyewear is being prepared at our atelier.
                  </p>

                  <div className="w-full bg-gray-50 p-4 rounded-sm border border-gray-100 text-left font-sans text-xs space-y-2.5 mb-8">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-400">Order Reference:</span>
                      <span className="font-bold text-black">{orderSuccess}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Delivery:</span>
                      <span className="font-semibold text-gray-800">2-3 Business Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery Courier:</span>
                      <span className="font-semibold text-gray-800">TCS Priority Express</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 pt-2 border-t border-gray-200 text-center italic">
                      A shipping confirmation has been dispatched.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-black hover:bg-neutral-950 text-white py-3.5 font-display text-xs tracking-widest uppercase font-bold transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : isCheckout ? (
                /* CHECKOUT FORM VIEW */
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <p className="text-[10px] tracking-widest text-gray-400 font-display uppercase font-bold border-b border-gray-100 pb-2 mb-4">
                    SHIPPING & DELIVERY
                  </p>
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-2.5 focus:bg-white focus:border-black transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ali@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-2.5 focus:bg-white focus:border-black transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">
                      CONTACT PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-2.5 focus:bg-white focus:border-black transition-all"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">
                      STREET ADDRESS
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Apartment, House No, Street, Area Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-2.5 focus:bg-white focus:border-black transition-all resize-none"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">
                      CITY
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-2.5 focus:bg-white focus:border-black transition-all cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                    </select>
                  </div>

                  <p className="text-[10px] tracking-widest text-gray-400 font-display uppercase font-bold border-b border-gray-100 pb-2 pt-2 mb-3">
                    PAYMENT OPTIONS
                  </p>

                  {/* COD and Card Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`py-3 px-4 border text-center transition-all flex flex-col items-center justify-center ${
                        paymentMethod === 'COD'
                          ? 'border-black bg-neutral-50 text-black'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] font-display font-bold tracking-widest">CASH ON DELIVERY</span>
                      <span className="text-[8px] text-gray-400 font-sans mt-0.5">Pay upon package arrival</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`py-3 px-4 border text-center transition-all flex flex-col items-center justify-center ${
                        paymentMethod === 'CARD'
                          ? 'border-black bg-neutral-50 text-black'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] font-display font-bold tracking-widest">CREDIT / DEBIT CARD</span>
                      <span className="text-[8px] text-gray-400 font-sans mt-0.5">Pay securely online</span>
                    </button>
                  </div>

                  {paymentMethod === 'CARD' && (
                    <div className="bg-amber-50/50 border border-amber-600/20 text-[10px] text-amber-900 p-3 rounded-xs font-sans leading-relaxed">
                      <strong>Card checkout simulation:</strong> In our demo environment, card details are auto-bypassed. Your transaction will still be processed securely.
                    </div>
                  )}

                  {/* Submission triggers in the drawer footer */}
                  <div className="hidden">
                    <button id="hidden-checkout-submit-btn" type="submit" />
                  </div>
                </form>
              ) : cart.length === 0 ? (
                /* EMPTY BAG VIEW */
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-16 h-16 text-zinc-200 mb-4 flex items-center justify-center rounded-full bg-zinc-50">
                    <Trash2 className="w-8 h-8 stroke-1" />
                  </div>
                  <h4 className="font-display text-xs tracking-widest font-bold text-gray-800 uppercase mb-2">
                    YOUR ATELIER BAG IS EMPTY
                  </h4>
                  <p className="text-xs text-gray-400 font-sans max-w-xs mb-6">
                    Explore our luxury eyewear collections and discover timeless styles custom designed to reflect your perspective.
                  </p>
                  <button
                    onClick={handleGoToShop}
                    className="bg-black hover:bg-neutral-900 text-white py-3 px-6 font-display text-[10px] tracking-widest uppercase font-bold transition-all"
                  >
                    EXPLORE ALL SILHOUETTES
                  </button>
                </div>
              ) : (
                /* LIST OF CART ITEMS */
                <div className="space-y-4">
                  <p className="text-[10px] tracking-widest text-gray-400 font-display uppercase font-bold border-b border-gray-100 pb-2 mb-2">
                    BAG SELECTIONS
                  </p>
                  <div className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor.name}`} className="py-4 flex items-center space-x-4">
                        <img
                          src={item.selectedColor.image || item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover bg-gray-50 border border-gray-100 rounded-sm shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs font-bold text-gray-900 truncate tracking-tight pr-1">
                              {item.product.name}
                            </h4>
                            <span className="text-xs font-bold text-gray-950 font-sans shrink-0">
                              PKR {(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-gray-400 font-sans mt-0.5 flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: item.selectedColor.hex }} />
                            <span>{item.selectedColor.name}</span>
                          </p>

                          <div className="flex items-center justify-between mt-2.5">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.quantity - 1)}
                                className="p-1 text-gray-500 hover:text-black hover:bg-gray-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-gray-800 font-sans">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.quantity + 1)}
                                className="p-1 text-gray-500 hover:text-black hover:bg-gray-50"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                              className="text-gray-400 hover:text-red-600 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Summary & Checkout button */}
            {cart.length > 0 && !orderSuccess && (
              <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                <div className="space-y-2.5 font-sans mb-5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>PKR {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Atelier Premium Shipping</span>
                    <span className="text-emerald-700 font-semibold uppercase">
                      {cartTotal >= 10000 ? 'FREE' : 'PKR 1,500'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-900 border-t border-gray-200 pt-2.5 text-sm font-bold">
                    <span>Total Amount</span>
                    <span>
                      PKR {(cartTotal >= 10000 ? cartTotal : cartTotal + 1500).toLocaleString()}
                    </span>
                  </div>
                </div>

                {isCheckout ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => document.getElementById('hidden-checkout-submit-btn')?.click()}
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-neutral-900 text-white py-3.5 font-display text-xs tracking-[0.2em] font-bold uppercase flex items-center justify-center space-x-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          <span>PROCESSING TRANSACTION...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                          <span>PLACE ORDER (PKR {(cartTotal >= 10000 ? cartTotal : cartTotal + 1500).toLocaleString()})</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsCheckout(false)}
                      disabled={isSubmitting}
                      className="w-full bg-white border border-gray-200 hover:border-black text-gray-500 hover:text-black py-2.5 font-display text-[10px] tracking-widest uppercase font-semibold transition-colors disabled:opacity-50"
                    >
                      Back to Bag Selections
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-black hover:bg-neutral-900 text-white py-3.5 font-display text-xs tracking-[0.2em] font-bold uppercase flex items-center justify-center space-x-2 transition-colors group"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <p className="text-[9px] text-gray-400 text-center font-sans mt-3.5 flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Your luxury experience is safeguarded by 256-bit bank security.</span>
                </p>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
