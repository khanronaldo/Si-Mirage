import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useShop, PageRoute } from '../context/ShopContext';
import { ArrowRight, Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';
import { useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

// 3D Error Boundary for Footer
class ThreeDErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("3D Model load in footer failed, using beautiful geometry fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Beautiful wireframe fallback geometry that rotates automatically
const GeometricGlassesFallback: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left Lens Rim */}
      <mesh position={[-0.6, 0, 0]}>
        <torusGeometry args={[0.35, 0.03, 8, 32]} />
        <meshStandardMaterial color="#FF2800" wireframe />
      </mesh>
      
      {/* Right Lens Rim */}
      <mesh position={[0.6, 0, 0]}>
        <torusGeometry args={[0.35, 0.03, 8, 32]} />
        <meshStandardMaterial color="#FF2800" wireframe />
      </mesh>
      
      {/* Nose Bridge */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Left Temple */}
      <mesh position={[-0.9, 0.05, -0.5]} rotation={[Math.PI / 2, 0, -Math.PI / 12]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>

      {/* Right Temple */}
      <mesh position={[0.9, 0.05, -0.5]} rotation={[Math.PI / 2, 0, Math.PI / 12]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
};

// Auto-rotating glasses model — rotation is driven manually via useFrame so there is
// no OrbitControls / drag / zoom / pan of any kind. Purely decorative, no interaction.
const RotatingGlasses: React.FC<{ path: string }> = ({ path }) => {
  const { scene } = useGLTF(path);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
};

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedProductId } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Lazy-mount the 3D canvas only once it's actually scrolled into view (footer sits
  // at the very bottom of the page, so this avoids paying its render cost until needed).
  const modelWrapperRef = useRef<HTMLDivElement>(null);
  const isModelInView = useInView(modelWrapperRef, { margin: '150px' });
  const [modelValid, setModelValid] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/model3.glb', { method: "HEAD" })
      .then((res) => {
        if (!active) return;
        const contentType = res.headers.get("content-type") || "";
        if (res.ok && !contentType.includes("text/html")) {
          setModelValid(true);
        } else {
          setModelValid(false);
        }
      })
      .catch(() => {
        if (!active) return;
        setModelValid(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLinkClick = (page: PageRoute) => {
    setActivePage(page);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#050505] text-white pt-10 pb-8 sm:pt-12 sm:pb-12 border-t border-zinc-900 overflow-hidden">
      
      {/* 100% Foolproof way to load Google Fonts in React without @import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

      <style>{`
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        /* Continuous Bottom Shimmer */
        @keyframes subtleReflection {
          0% { background-position: 250% 0; }
          100% { background-position: -250% 0; }
        }
        .animate-si-shimmer {
          background: linear-gradient(
            110deg, 
            #1a1a1a 35%, 
            #1a1a1a 45%, 
            #FF2800 50%, 
            #1a1a1a 55%, 
            #1a1a1a 65%
          );
          background-size: 250% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: subtleReflection 8s ease-in-out infinite;
        }

        /* One-Time Top Box Shimmer */
        @keyframes oneTimeReflection {
          0% { background-position: 250% 0; }
          100% { background-position: -250% 0; }
        }
        .animate-shimmer-once {
          background: linear-gradient(
            110deg, 
            #ffffff 35%, 
            #ffffff 45%, 
            #FF2800 50%, 
            #ffffff 55%, 
            #ffffff 65%
          );
          background-size: 250% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: oneTimeReflection 3s ease-in-out 1 forwards;
        }
      `}</style>

      {/* Global Playfair Display wrapper for all normal texts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-playfair">
        
        {/* Minimal 3D Showcase & Brand Box */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-zinc-950/40 border border-zinc-900 rounded-2xl p-5 sm:p-6 md:p-8 mb-10 sm:mb-12">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 space-y-3 text-center md:text-left">
            {/* Top Logo - Playfair Display Italic with ONE-TIME Shimmer */}
            <h3 className="font-playfair italic font-bold text-2xl sm:text-3xl animate-shimmer-once tracking-wider">
              SI. MIRAGE
            </h3>
            <p className="text-sm sm:text-base text-zinc-400">
              Handcrafted luxury eyewear sculpted for the avant-garde.
            </p>
          </div>
          
          {/* 3D Canvas Area — properly centered & sized */}
          <div className="w-full md:w-1/2 h-40 sm:h-44 md:h-52 flex items-center justify-center md:justify-end bg-transparent relative">
            <div
              ref={modelWrapperRef}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 pointer-events-none"
            >
              {isModelInView && (
                <Canvas
                  camera={{ position: [0, 0, 3], fov: 35 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, powerPreference: 'high-performance' }}
                >
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[3, 4, 3]} intensity={1} />
                  <directionalLight position={[-3, -2, -3]} intensity={0.3} />
                  {modelValid ? (
                    <ThreeDErrorBoundary fallback={<GeometricGlassesFallback />}>
                      <Suspense fallback={null}>
                        <RotatingGlasses path="/model3.glb" />
                      </Suspense>
                    </ThreeDErrorBoundary>
                  ) : (
                    <GeometricGlassesFallback />
                  )}
                </Canvas>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 mb-10 sm:mb-12 font-playfair">
          
          {/* Column 1: Explore */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-bold mb-5 font-playfair">Explore</h5>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300 font-playfair">
              <li><button onClick={() => handleLinkClick('shop')} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">All Collections</button></li>
              <li><button onClick={() => handleLinkClick('best-sellers' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">The Luxury Edit</button></li>
              <li><button onClick={() => handleLinkClick('new-arrivals' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">New Arrivals</button></li>
              <li><button onClick={() => handleLinkClick('heritage')} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">Our Story & Atelier</button></li>
            </ul>
          </div>

          {/* Column 2: Insider */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-bold mb-5 font-playfair">Insider</h5>
            <ul className="space-y-3 text-sm sm:text-base text-gray-500 font-playfair">
              <li><span className="cursor-not-allowed">Atelier Program</span></li>
              <li><span className="cursor-not-allowed">Careers & Internships</span></li>
              <li><span className="cursor-not-allowed">Sustainability Pledge</span></li>
              <li><span className="cursor-not-allowed">Atelier Press</span></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-bold mb-5 font-playfair">Support</h5>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300 font-playfair">
              <li><button onClick={() => handleLinkClick('contact' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">Contact Us</button></li>
              <li><button onClick={() => handleLinkClick('faq' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">FAQ & Guides</button></li>
              <li><button onClick={() => handleLinkClick('shipping' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">Shipping & Returns</button></li>
              <li><button onClick={() => handleLinkClick('warranty' as any)} className="hover:text-[#FF2800] transition-colors text-left cursor-pointer">Warranty & Repairs</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="col-span-2 lg:col-span-1">
            <h5 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-bold mb-5 font-playfair">Newsletter</h5>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed font-playfair">
              Join the Mirage list for early access to limited collections and new-season colors.
            </p>
            
            {subscribed ? (
              <div className="bg-zinc-900 border border-[#FF2800]/30 text-[#FF2800] px-3 py-2 text-sm rounded-sm">
                Successfully added to our roster.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-zinc-700 pb-2 focus-within:border-[#FF2800] transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm w-full focus:outline-none placeholder-zinc-600 text-white pr-2 font-sans"
                  required
                />
                <button type="submit" className="text-zinc-500 hover:text-[#FF2800] transition-colors cursor-pointer" aria-label="Subscribe">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex space-x-5 mt-8">
              <a href="#" className="text-zinc-500 hover:text-[#FF2800] transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-zinc-500 hover:text-[#FF2800] transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-zinc-500 hover:text-[#FF2800] transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Clean Utilities */}
        <div className="border-t border-zinc-900/80 pt-8 mt-6 flex flex-col items-center justify-center text-xs sm:text-sm text-gray-500 gap-y-3 font-playfair">
          <div className="flex space-x-6 items-center">
            <button onClick={() => handleLinkClick('privacy' as any)} className="hover:text-white transition-colors font-playfair cursor-pointer">Privacy Policy</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => handleLinkClick('terms' as any)} className="hover:text-white transition-colors font-playfair cursor-pointer">Terms of Service</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => handleLinkClick('admin-login' as any)} className="text-[#FF2800] hover:text-white transition-colors font-playfair flex items-center gap-1 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF2800]" />
              <span>Admin Access</span>
            </button>
          </div>
          <p className="text-zinc-600 mt-2 text-xs font-playfair">
            &copy; {new Date().getFullYear()} SI-MIRAGE. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* BOTTOM LOGO - Playfair Display Italic Font with Continuous Matte/Ferrari Red Shimmer */}
      <div className="mt-16 sm:mt-20 w-full flex justify-center items-center select-none pointer-events-none px-4 pb-2">
        <span 
          className="animate-si-shimmer font-playfair italic font-bold tracking-widest"
          style={{
            fontSize: 'min(8vw, 120px)',
            lineHeight: '1',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          SI. MIRAGE
        </span>
      </div>

    </footer>
  );
};
