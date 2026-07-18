import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, register, setActivePage } = useShop();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSimulationBypass, setShowSimulationBypass] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError('Name is required');
          return;
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An authentication error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await login();
    } catch (err: any) {
      console.error('Error signing in with Google:', err);
      const errMsg = err?.message || err?.toString() || '';
      
      if (
        errMsg.includes('popup-blocked') || 
        errMsg.includes('api-key-not-valid') || 
        errMsg.includes('auth/api-key-not-valid') ||
        errMsg.includes('auth/popup-blocked') ||
        errMsg.includes('restricted') ||
        errMsg.includes('invalid-api-key') ||
        errMsg.includes('Firebase')
      ) {
        setError('Google Sign-In is unavailable in this sandboxed preview iframe. Please use the standard Registration or Sign In fields below, or click the bypass button below to sign in with a simulated Google Account.');
        setShowSimulationBypass(true);
      } else {
        setError(errMsg || 'An unexpected error occurred during Google sign in.');
      }
    }
  };

  const handleSimulatedGoogleLogin = async () => {
    setError(null);
    try {
      // Register or login a simulated google user
      await register('Google Sandbox Tester', 'google.tester@mirage-atelier.com', 'google_sandbox_test_123');
    } catch (err: any) {
      const errMsg = err?.message || '';
      if (errMsg.includes('already exists') || errMsg.includes('already registered')) {
        try {
          await login('google.tester@mirage-atelier.com', 'google_sandbox_test_123');
        } catch (loginErr: any) {
          setError(loginErr.message || 'Simulated Google Sign-In failed.');
        }
      } else {
        setError(errMsg || 'Simulated Google Sign-In failed.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        
        {/* Backdrop close */}
        <div className="absolute inset-0" onClick={() => setIsAuthOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white w-full max-w-md rounded-sm shadow-2xl relative overflow-hidden border border-gray-100 z-10"
        >
          
          {/* Header Close Trigger */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h3 className="font-display text-xl tracking-[0.2em] font-bold text-black uppercase">
                {isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
              </h3>
              <p className="text-xs text-gray-400 mt-2 font-sans">
                {isSignUp ? 'Join Si-Mirage for early access and customized benefits' : 'Sign in to access your luxury orders and saved wishlist'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-3.5 mb-5 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Optional Name field for Signup */}
              {isSignUp && (
                <div>
                  <label className="block text-[10px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-sm font-sans px-4 py-3 focus:bg-white transition-colors"
                  />
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-[10px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1.5">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-sm font-sans pl-10 pr-4 py-3 focus:bg-white transition-colors"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[10px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-sm font-sans pl-10 pr-4 py-3 focus:bg-white transition-colors"
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                </div>
              </div>

              {/* Forgot password */}
              {!isSignUp && (
                <div className="text-right">
                  <button type="button" className="text-[10px] font-display font-semibold text-gray-400 hover:text-black uppercase tracking-wider">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-black hover:bg-neutral-900 text-white py-3.5 font-display text-xs tracking-[0.2em] font-bold uppercase transition-colors"
              >
                {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
              </button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[9px] font-display text-gray-400 tracking-widest font-bold">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Google Authentication Button */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full bg-white border border-gray-200 hover:border-black text-gray-800 py-3 font-display text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-3 transition-colors cursor-pointer"
              >
                {/* SVG Google icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>

              {showSimulationBypass && (
                <button
                  onClick={handleSimulatedGoogleLogin}
                  type="button"
                  className="w-full bg-[#FFF9F2] border border-amber-200 hover:border-amber-500 text-amber-900 py-3 font-display text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer rounded-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>BYPASS WITH DEMO GOOGLE ACCOUNT</span>
                </button>
              )}
            </div>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center mt-8 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-[10px] font-display font-semibold text-gray-500 hover:text-black uppercase tracking-wider space-x-1"
              >
                <span>{isSignUp ? 'Already have an account?' : 'Need an account?'}</span>
                <span className="text-amber-800 underline ml-1">{isSignUp ? 'Sign In' : 'Register Now'}</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
