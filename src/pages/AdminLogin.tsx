import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShimmerText } from '../components/ShimmerText';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { setActivePage } = useShop();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Always clear previous admin login session upon visiting the portal to force credentials
  useEffect(() => {
    localStorage.removeItem('sm_admin_logged_in');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username === 'admin' && password === 'adminpassword123') {
      localStorage.setItem('sm_admin_logged_in', 'true');
      setActivePage('admin');
    } else {
      setError('Invalid administrative credentials. Access denied.');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 flex items-center justify-center selection:bg-[#FF2800] selection:text-white">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        
        {/* Outer card with subtle border and floating style */}
        <div className="bg-white border border-neutral-100 p-8 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF2800]" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 text-[#FF2800] flex items-center justify-center mx-auto mb-4 rounded-none">
              <Shield className="w-5 h-5 stroke-[2px]" />
            </div>
            
            <p className="text-[10px] tracking-[0.35em] font-sans font-extrabold text-[#FF2800] uppercase mb-1">
              Atelier Security
            </p>
            <h2 className="font-classic text-2xl tracking-widest text-black uppercase font-bold mt-2">
              <ShimmerText text="PORTAL SIGN IN" baseColor="#000000" shimmerColor="#FF2800" />
            </h2>
            <p className="text-neutral-400 text-xs font-sans mt-2">
              Please authenticate to access the Si-Mirage Business Engine.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-4 mb-6 text-red-700 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF2800]" />
              <span className="text-xs font-sans font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-[9px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold mb-1.5">
                Username Reference
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white text-xs px-4 py-3 outline-none font-mono tracking-wider transition-all rounded-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[9px] tracking-[0.2em] font-sans text-neutral-400 uppercase font-extrabold mb-1.5">
                Atelier Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white text-xs px-4 py-3 pr-10 outline-none font-mono tracking-wider transition-all rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign in Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-[#FF2800] py-3.5 font-sans text-xs tracking-widest uppercase font-extrabold shadow-md transition-colors duration-300"
              >
                SECURE SIGN IN
              </button>
            </div>
          </form>

          {/* Secure notice */}
          <p className="text-center text-[9px] text-neutral-400 font-sans tracking-wide mt-8">
            Connection is protected &bull; Authorized personnel only
          </p>
        </div>

        {/* Back to main link */}
        <div className="text-center mt-6">
          <button
            onClick={() => setActivePage('home')}
            className="text-[10px] tracking-widest text-neutral-400 hover:text-black font-sans font-bold uppercase transition-colors"
          >
            &larr; Return to main gallery
          </button>
        </div>

      </div>
    </div>
  );
};
