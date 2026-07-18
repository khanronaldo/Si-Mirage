import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
  ArrowRight,
  Camera,
  Play
} from "lucide-react";
import { useShop, PageRoute } from "../context/ShopContext";
import { PRODUCTS } from "../data/products";

// ==========================================
// 1. LIQUID TRANSITION CONFIGURATION
// ==========================================
const LIQUID_EASE: any = [0.16, 1, 0.3, 1]; // Ultra-smooth luxurious curve

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.4, delay, ease: LIQUID_EASE }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ShimmerText = ({ text, baseColor = "#ffffff", shimmerColor = "#FF2800", className = "" }: { text: string, baseColor?: string, shimmerColor?: string, className?: string }) => {
  return (
    <span
      className={`inline-block shimmer-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 40%, ${shimmerColor} 50%, ${baseColor} 60%)`,
      }}
    >
      {text}
    </span>
  );
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0, damping: 30 });
  // Rounds the live spring value without ever triggering a React re-render —
  // framer-motion writes straight to the DOM node on its own rAF loop instead.
  const rounded = useTransform(springValue, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ThreeDArrivalsSlider: React.FC = () => {
  const { setActivePage, setSelectedProductId } = useShop();
  const newArrivals = PRODUCTS.slice(0, 10);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { margin: "150px" });

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} className="flex justify-center items-center py-12 min-h-[420px] sm:min-h-[520px] overflow-hidden relative">
      {/* Ambient glow behind the wheel — lightweight version (cheaper blur radius) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#FF2800]/10 blur-2xl [transform:translateZ(0)]" />
      </div>
      <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
        <div className="w-2/3 h-8 bg-black/40 blur-xl rounded-full" />
      </div>

      <div className="slider-3d-wrapper" style={{ animationPlayState: isInView ? "running" : "paused" }}>
        {newArrivals.map((p, index) => {
          const totalProducts = newArrivals.length;
          const angle = index * (360 / totalProducts); 
          
          return (
            <div 
              key={p.id} 
              className="slider-3d-item"
              style={{ 
                '--angle': `${angle}deg`,
                '--i': index 
              } as React.CSSProperties}
            >
              <div 
                onClick={() => handleProductClick(p.id)}
                className="carousel-card-container group relative cursor-pointer rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:ring-[#FF2800]/40"
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/70 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 flex flex-col items-center text-center pointer-events-none">
                  <span className="flex items-center gap-1.5 font-sans text-[8px] sm:text-[9px] tracking-[0.25em] text-[#FF2800] font-extrabold uppercase mb-1 drop-shadow-md">
                    <span className="w-1 h-1 rounded-full bg-[#FF2800] shadow-[0_0_6px_#FF2800]" />
                    NEW ARRIVAL
                  </span>
                  <h4 className="font-classic text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-white leading-snug drop-shadow-lg line-clamp-1">
                    {p.name}
                  </h4>
                  <div className="h-[1px] w-8 bg-[#FF2800] mt-1.5 group-hover:w-12 transition-all duration-500" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

class ThreeDErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("3D Model load failed, using beautiful geometry fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const GeometricGlassesFallback: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
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

const GLBModel: React.FC<{ path: string }> = ({ path }) => {
  const { scene } = useGLTF(path);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  return (
    <Center>
      <primitive object={clonedScene} />
    </Center>
  );
};

const ModelViewer: React.FC<{ path: string; label: string }> = ({ path, label }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // No "once" — canvas properly pauses/unmounts when scrolled away,
  // and resumes instantly when scrolled back. Same visual result,
  // but stops burning GPU/CPU for the rest of the page's scroll.
  const isInView = useInView(wrapperRef, { margin: "150px" });
  const [modelValid, setModelValid] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch(path, { method: "HEAD" })
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
  }, [path]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-h-[260px] sm:max-h-none aspect-[3/2] sm:aspect-[16/11] lg:aspect-[16/10] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      {isInView ? (
        <div className="w-full h-full" style={{ touchAction: "pan-y" }}>
          <Canvas
            camera={{ position: [0, 0, 3.1], fov: 38 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            performance={{ min: 0.4 }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 6, 5]} intensity={1.1} />
            <directionalLight position={[-5, -3, -5]} intensity={0.35} />
            {modelValid ? (
              <ThreeDErrorBoundary fallback={<GeometricGlassesFallback />}>
                <Suspense fallback={null}>
                  <GLBModel path={path} />
                </Suspense>
              </ThreeDErrorBoundary>
            ) : (
              <GeometricGlassesFallback />
            )}
            <OrbitControls
              autoRotate
              autoRotateSpeed={3.2}
              enableZoom={true}
              enablePan={false}
              minDistance={1.2}
              maxDistance={7}
            />
          </Canvas>
        </div>
      ) : (
        <div className="w-full h-full animate-pulse bg-neutral-100" />
      )}

      {/* Cheap CSS shadow under the model instead of a real-time WebGL shadow pass — same grounded look, zero per-frame GPU cost */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 font-clean text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase text-[#FF2800] bg-white/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full pointer-events-none">
        {label}
      </div>
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-clean text-[7px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-neutral-400 bg-white/85 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
          Auto-rotating &middot; Drag to explore
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 2. DATA & CONSTANTS
// ==========================================

const HERO_SLIDES = [
  {
    eyebrow: "Handcrafted Frames for the Discerning",
    title: "STRUCTURAL",
    titleItalic: "LINEARITY",
    buttons: [
      { label: "SHOP COLLECTION", action: "shop" },
      { label: "HERITAGE STORY", action: "heritage", isSecondary: true }
    ],
    img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1600&q=80", 
  },
  {
    eyebrow: "Geometric Precision Meets Raw Acetate",
    title: "WHERE VISION BECOMES",
    titleItalic: "MIRAGE",
    buttons: [
      { label: "EXPLORE COLLECTION", action: "shop" }
    ],
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
  },
];

const FEATURES = [
  { icon: Shield, title: "SECURE CHECKOUT", body: "100% protected payments" },
  { icon: Truck, title: "FREE SHIPPING", body: "Free delivery across Pakistan" },
  { icon: RotateCcw, title: "EASY RETURNS", body: "30-day hassle-free return policy" },
  { icon: Star, title: "PREMIUM QUALITY", body: "Handcrafted luxury frames" },
];

const BUBBLE_SHAPES = [
  { name: "Aviator", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80" },
  { name: "Wayfarer", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80" },
  { name: "Round", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80" },
  { name: "Square", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80" },
  { name: "Cat-Eye", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80" },
  { name: "Browline", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80" },
];

const STATS = [
  { value: 1987, label: "FOUNDED", suffix: "" },
  { value: 47, label: "AWARDS", suffix: "" },
  { value: 200, label: "CUSTOMERS", suffix: "K" },
  { value: 38, label: "COUNTRIES", suffix: "" },
];

const TESTIMONIALS = [
  { quote: "The weight distribution is perfect. They feel incredibly premium and the lens definition is top-tier.", name: "Ava Khan", location: "Islamabad" },
  { quote: "Absolutely stunning design. The delivery was fast and the packaging felt luxurious.", name: "Fahad Mustafa", location: "Lahore" },
  { quote: "I've received so many compliments on my Aviators. Highly recommended!", name: "Sara Khan", location: "Karachi" },
  { quote: "Perfect fit and amazing clarity. These are now my go-to shades.", name: "Omar Farooq", location: "Peshawar" },
  { quote: "The craftsmanship is visible in every detail. Worth every penny.", name: "Aisha Tariq", location: "Faisalabad" },
];

// ==========================================
// 3. MAIN HOME COMPONENT
// ==========================================

export const Home: React.FC = () => {
  const { setActivePage, setSearchQuery } = useShop();
  const [slide, setSlide] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const watchRef = useRef<HTMLDivElement>(null);
  const isInViewWatch = useInView(watchRef, { once: true, margin: "-100px" });
  const [watchOverlayDisappear, setWatchOverlayDisappear] = useState(false);

  // Fixes the mobile browser "dynamic viewport" bug (iOS Safari / Android
  // address-bar show/hide) that causes the hero video to render at a stale
  // size after the viewport actually resizes.
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  // Refs for the autoplay videos — iOS Safari silently blocks autoplay unless
  // the video is *actually* muted on the DOM node (React's `muted` prop doesn't
  // always sync to the real attribute in time), and unless .play() is nudged
  // manually once the element is mounted. This effect forces both.
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const maleVideoRef = useRef<HTMLVideoElement>(null);
  const femaleVideoRef = useRef<HTMLVideoElement>(null);
  const watchVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [heroVideoRef.current, maleVideoRef.current, femaleVideoRef.current, watchVideoRef.current];

    const primeVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      const tryPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // iOS may still refuse until a user gesture; retry on first touch/click.
            const resumeOnGesture = () => {
              video.play().catch(() => {});
              document.removeEventListener('touchstart', resumeOnGesture);
              document.removeEventListener('click', resumeOnGesture);
            };
            document.addEventListener('touchstart', resumeOnGesture, { once: true });
            document.addEventListener('click', resumeOnGesture, { once: true });
          });
        }
      };
      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener('loadedmetadata', tryPlay, { once: true });
      }
    };

    videos.forEach(primeVideo);
  }, []);

  // Pause videos while they're off-screen so the browser isn't decoding and
  // compositing multiple videos at once at all times — this was a big source of jank.
  useEffect(() => {
    const videos = [heroVideoRef.current, maleVideoRef.current, femaleVideoRef.current, watchVideoRef.current].filter(
      (v): v is HTMLVideoElement => v !== null
    );
    if (videos.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(reviewTimer);
  }, []);

  useEffect(() => {
    if (isInViewWatch && !watchOverlayDisappear) {
      const timer = setTimeout(() => setWatchOverlayDisappear(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInViewWatch, watchOverlayDisappear]);

  const handleNavClick = (page: any) => {
    setActivePage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterClick = (query: string) => {
    setActivePage('shop');
    setSearchQuery(query.toLowerCase());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen selection:bg-[#FF2800] selection:text-white pb-0 scroll-smooth">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          overscroll-behavior-y: none;
          -webkit-overflow-scrolling: touch;
        }
        .shimmer-text {
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmerMove 4s linear infinite;
          will-change: background-position;
        }
        @keyframes shimmerMove {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      
      {/* ---------------- 1. Hero (Slightly reduced to reveal lower boundary) ---------------- */}
      <section
        className="relative w-full min-h-[480px] sm:min-h-[650px] overflow-hidden bg-black"
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div className="absolute inset-0 bg-noise opacity-20 z-10 pointer-events-none" />
        
        {/* Single background video — clean, GPU-accelerated, no distortion */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          <video
            ref={heroVideoRef}
            src="/herobackground.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
           className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center [transform:translateZ(0)] [backface-visibility:hidden]"
            style={{ filter: "brightness(0.55) contrast(1.05)" }}
          />
          {/* Subtle gradient to darken the left side for extreme legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
        </div>

        <div className="relative z-20 h-full flex flex-col items-start justify-center text-left px-6 sm:px-12 md:px-24 max-w-5xl text-white pt-20">
          <AnimatePresence mode="wait">
            <motion.div key={`text-${slide}`} className="flex flex-col items-start w-full max-w-3xl">
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.8 }}
                className="font-clean text-[9px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FF2800] mb-4 sm:mb-6"
              >
                {HERO_SLIDES[slide].eyebrow}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 1, delay: 0.1, ease: LIQUID_EASE }}
                className="font-classic text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase"
              >
                <ShimmerText text={HERO_SLIDES[slide].title} />
                <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                  {HERO_SLIDES[slide].titleItalic}
                </span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1, delay: 0.3, ease: LIQUID_EASE }}
                className="mt-6 sm:mt-10 flex flex-wrap items-center justify-start gap-4 sm:gap-6"
              >
                {HERO_SLIDES[slide].buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => btn.action === 'shop' ? handleFilterClick('') : handleNavClick('heritage')}
                    className={`group relative px-6 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-[11px] font-clean font-bold tracking-[0.2em] overflow-hidden transition-colors duration-500 ${
                      btn.isSecondary ? 'border border-white/30 text-white hover:border-white' : 'bg-white text-black'
                    }`}
                  >
                    <span className={`relative z-10 transition-colors duration-500 ${!btn.isSecondary && 'group-hover:text-white'}`}>
                      {btn.label}
                    </span>
                    {!btn.isSecondary && (
                      <div className="absolute inset-0 bg-[#FF2800] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    )}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex items-center justify-between px-6 md:px-16 z-20">
          <div className="flex gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-[2px] transition-all duration-500 ease-out ${
                  i === slide ? "w-12 bg-[#FF2800]" : "w-6 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="hidden sm:flex gap-4 font-clean text-xs font-bold tracking-widest text-white/50">
            <button onClick={() => setSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="hover:text-white transition-colors">PREV</button>
            <span className="text-white/20">/</span>
            <button onClick={() => setSlide((slide + 1) % HERO_SLIDES.length)} className="hover:text-white transition-colors">NEXT</button>
          </div>
        </div>
      </section>

      {/* ---------------- 2. Features (Clean & Consistent Spacing) ---------------- */}
      <section className="bg-white text-black py-16 sm:py-24 lg:py-32 selection:bg-neutral-900 selection:text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-neutral-200 flex items-center justify-center mb-5 sm:mb-6 group-hover:border-[#FF2800] transition-colors duration-500">
                <f.icon size={22} strokeWidth={1} className="text-black group-hover:text-[#FF2800] transition-colors duration-500" />
              </div>
              <h3 className="font-clean text-[10px] sm:text-[11px] font-bold tracking-[0.15em] mb-3">{f.title}</h3>
              <p className="font-clean text-xs text-neutral-500 max-w-[200px] leading-relaxed">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- 3. Male Video Card (Professional size, comfortable side margins) ---------------- */}
      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-6">
          <Reveal className="relative w-full aspect-video max-h-[440px] sm:max-h-[540px] md:max-h-[620px] lg:max-h-[720px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_24px_70px_rgba(0,0,0,0.25)] border border-neutral-100 [transform:translateZ(0)] [isolation:isolate]">
            <video 
              ref={maleVideoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover opacity-95"
            >
              <source src="/male.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- 4. Shop by Silhouette (Bubbles) ---------------- */}
      <section className="bg-white max-w-[1600px] mx-auto px-6 lg:px-10 py-20 sm:py-24 lg:py-36 relative selection:bg-neutral-900 selection:text-white">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <Reveal className="text-center mb-14 sm:mb-20 relative z-10">
          <p className="font-clean text-[10px] font-bold tracking-[0.2em] text-[#FF2800] mb-4">COLLECTIONS</p>
          <h2 className="font-classic text-4xl sm:text-5xl md:text-7xl uppercase">
            <ShimmerText text="Shop by" baseColor="#000000" shimmerColor="#FF2800" /> <span className="italic text-neutral-400">Silhouette</span>
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 lg:gap-20 relative z-10">
          {BUBBLE_SHAPES.map((shape, i) => (
            <Reveal key={shape.name} delay={i * 0.08} className="flex justify-center">
              <button
                onClick={() => handleFilterClick(shape.name.toLowerCase())}
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 group relative flex flex-col items-center justify-center rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 bg-neutral-100 opacity-20 group-hover:opacity-80"
                  style={{ backgroundImage: `url(${shape.img})` }} 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                
                <span className="font-classic italic text-xl sm:text-2xl md:text-3xl text-white z-20 relative font-playfair">
                  {shape.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF2800] transition-all duration-500 group-hover:w-12" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- 5. Female Video Card (Professional size, comfortable side margins) ---------------- */}
      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-6">
          <Reveal className="relative w-full aspect-video max-h-[440px] sm:max-h-[540px] md:max-h-[620px] lg:max-h-[720px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_24px_70px_rgba(0,0,0,0.25)] border border-neutral-100 [transform:translateZ(0)] [isolation:isolate]">
            <video 
              ref={femaleVideoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover opacity-95"
            >
              <source src="/female.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Spacer: white breathing room before New Arrivals (matches video-card rhythm) ---------------- */}
      <div className="bg-white h-10 sm:h-14 lg:h-20" />

      {/* ---------------- 6. NEW ARRIVALS (Pure Dark Background block, now with breathing room around it) ---------------- */}
      <section className="bg-[#080808] text-white py-20 sm:py-28 lg:py-40 relative overflow-hidden selection:bg-white selection:text-black">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10">
          <Reveal delay={0.1} className="flex items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
            <div>
              <p className="font-clean text-[10px] font-bold tracking-[0.2em] text-[#FF2800] mb-3">LATEST DROPS</p>
              <h2 className="font-classic text-4xl sm:text-5xl md:text-6xl uppercase">
                 <ShimmerText text="New Arrivals" />
              </h2>
            </div>
            <button
              onClick={() => handleFilterClick('new')}
              className="hidden sm:flex items-center gap-3 font-clean text-[11px] font-bold tracking-[0.2em] hover:text-[#FF2800] transition-colors group"
            >
              VIEW ARCHIVE <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
          
          <ThreeDArrivalsSlider />
        </div>
      </section>

      {/* ---------------- Spacer: white breathing room after New Arrivals (same as above, for symmetry) ---------------- */}
      <div className="bg-white h-10 sm:h-14 lg:h-20" />

      {/* ---------------- 6.5 3D MODELS SHOWCASE (Interactive GLB viewers, white background) ---------------- */}
      <section className="bg-white max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-28 lg:py-36 relative selection:bg-neutral-900 selection:text-white">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

        <Reveal className="text-center mb-10 sm:mb-20 relative z-10">
          <p className="font-clean text-[10px] font-bold tracking-[0.2em] text-[#FF2800] mb-3 sm:mb-4">3D SHOWCASE</p>
          <h2 className="font-classic text-3xl sm:text-5xl md:text-7xl uppercase mb-4 sm:mb-6">
            <ShimmerText text="Explore in" baseColor="#000000" shimmerColor="#FF2800" /> <span className="italic text-neutral-400">Three Dimensions</span>
          </h2>
          <p className="font-clean text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed font-medium px-2">
            Step closer than ever before. Rotate, tilt, and zoom into our frames in true three-dimensional detail — every curve, hinge, and finish, exactly as it is in real life.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 relative z-10">
          <Reveal delay={0.1}>
            <ModelViewer path="/model1.glb" label="3D Sample 01" />
          </Reveal>
          <Reveal delay={0.2}>
            <ModelViewer path="/model2.glb" label="3D Sample 02" />
          </Reveal>
        </div>

        <Reveal delay={0.3} className="flex justify-center mt-10 sm:mt-16 relative z-10">
          <button
            onClick={() => handleFilterClick('')}
            className="group relative bg-black text-white px-8 sm:px-10 py-3 sm:py-4 font-clean text-[10px] sm:text-[11px] font-bold tracking-[0.2em] overflow-hidden transition-colors duration-500 flex items-center gap-3"
          >
            <span className="relative z-10">EXPLORE MORE</span>
            <ArrowRight size={14} className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-[#FF2800] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </button>
        </Reveal>
      </section>

      {/* ---------------- 7. "Wear the Silence" Section (Fluid Transition block) ---------------- */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] min-h-[520px] sm:min-h-[580px] flex items-center justify-center bg-black overflow-hidden selection:bg-white selection:text-black">
        {/* Section background image — cover + center, scales perfectly across all breakpoints */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat [transform:translateZ(0)]"
          style={{ backgroundImage: "url('/wearthesilence.jpg')" }} 
        />
        {/* Dark gradient over the image so white text stays readable on any part of the photo, on any screen size */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 sm:from-black/50 sm:via-black/30 sm:to-black/60" />
        
        <div className="relative z-10 w-full max-w-2xl px-6">
          <div className="backdrop-blur-2xl bg-black/25 border border-white/10 p-8 sm:p-12 md:p-20 text-center flex flex-col items-center shadow-2xl rounded-2xl sm:rounded-3xl [transform:translateZ(0)] [isolation:isolate]">
            <Reveal delay={0.1}>
              <p className="font-clean text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-5 sm:mb-6">
                Seasonal Collection
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-classic text-4xl sm:text-5xl md:text-6xl text-white uppercase mb-5 sm:mb-6 leading-tight">
                <ShimmerText text="WEAR THE SILENCE" />
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-clean text-sm text-neutral-300 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed font-medium">
                Minimalist architecture engineered for weightless all-day wear.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="font-clean text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                STARTING AT PKR 2,999
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <button 
                onClick={() => handleFilterClick('essentials')}
                className="bg-white text-black px-7 sm:px-8 py-3.5 sm:py-4 font-clean text-[11px] font-bold tracking-[0.2em] flex items-center gap-3 hover:bg-[#FF2800] hover:text-white transition-colors duration-300"
              >
                SHOP ESSENTIALS <ArrowRight size={14} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      
      {/* ---------------- 8. Heritage / The Experience Section ---------------- */}
      <section className="py-20 sm:py-28 lg:py-36 bg-neutral-50 relative overflow-hidden selection:bg-neutral-900 selection:text-white border-t border-neutral-100">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-12 sm:mb-16">
            <p className="font-clean text-[10px] font-bold tracking-[0.2em] text-[#FF2800] mb-4">THE EXPERIENCE</p>
            <h2 className="font-classic text-4xl sm:text-5xl md:text-7xl uppercase">
              <ShimmerText text="Stories in" baseColor="#000000" shimmerColor="#FF2800" /> <span className="italic text-neutral-400">Motion</span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-14 sm:gap-20 items-center">
            <Reveal>
              <h3 className="font-classic text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 sm:mb-8 text-[#FF2800]">
                Craftsmanship Without Compromise.
              </h3>
              <div className="w-12 h-[2px] bg-black mb-6 sm:mb-8" />
              <p className="font-clean text-sm text-neutral-800 max-w-md leading-relaxed mb-8 sm:mb-10 font-medium">
                Si-Mirage was born from the desire to treat eyewear as a structural object—something engineered first, and styled second. Every frame passes through 84 distinct stages of hand-craftsmanship.
              </p>
              <button onClick={() => handleNavClick('heritage')} className="group flex items-center gap-4 font-clean text-[11px] font-bold tracking-[0.2em] text-black">
                <span>READ THE MANIFESTO</span>
                <div className="w-8 h-[1px] bg-black group-hover:w-16 group-hover:bg-[#FF2800] transition-all duration-500" />
              </button>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <div className="relative group overflow-hidden bg-white shadow-xl flex flex-col items-center justify-center py-12 sm:py-16 transition-transform duration-500 hover:-translate-y-2">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_70%,#FF2800_100%)] sm:animate-[spin_4s_linear_infinite] [will-change:transform] [transform:translateZ(0)]" />
                    <div className="absolute inset-[2px] bg-white z-10" />
                    <div className="relative z-20 flex flex-col items-center">
                      <span className="font-classic text-4xl sm:text-5xl text-[#FF2800] mb-2 sm:mb-3 flex font-bold selection:bg-[#FF2800] selection:text-white">
                        <AnimatedCounter value={s.value} />
                        {s.suffix}
                      </span>
                      <span className="font-clean text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-black uppercase">{s.label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* ---------------- 9. WATCH OUR STORY (Cinematic 16:9 Bound, No cropping) ---------------- */}
      <section ref={watchRef} className="bg-neutral-50 py-12 lg:py-16 selection:bg-white selection:text-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_24px_70px_rgba(0,0,0,0.3)] [transform:translateZ(0)] [isolation:isolate]">
            <video 
              ref={watchVideoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            >
              <source src="/watch-our-story.mp4" type="video/mp4" />
            </video>
            
            <AnimatePresence>
              {!watchOverlayDisappear && isInViewWatch && (
                <motion.div 
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: LIQUID_EASE }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: LIQUID_EASE }}
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/20 flex items-center justify-center bg-white/5 mb-6 sm:mb-10 shadow-2xl backdrop-blur-sm"
                  >
                     <Play className="w-10 h-10 sm:w-14 sm:h-14 text-white fill-white ml-2" />
                  </motion.div>
                  
                  <motion.h2 
                    className="font-classic italic text-4xl sm:text-6xl md:text-8xl leading-tight uppercase text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: LIQUID_EASE }}
                  >
                     <ShimmerText text="WATCH OUR STORY" />
                  </motion.h2>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- 10. TESTIMONIALS (Elegant Dark Block) ---------------- */}
      <section className="bg-[#080808] text-white py-28 sm:py-36 lg:py-48 relative selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <Reveal>
             <p className="font-clean text-[10px] font-bold tracking-[0.2em] text-[#FF2800] mb-4 uppercase font-playfair">TESTIMONIALS</p>
             <h2 className="font-classic italic text-4xl sm:text-5xl md:text-6xl uppercase mb-12 sm:mb-16">
                 <ShimmerText text="The Verdict" />
             </h2>
          </Reveal>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={testimonial} 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }} 
              transition={{ duration: 0.8, ease: LIQUID_EASE }} 
              className="max-w-4xl mx-auto"
            >
              <div className="flex justify-center gap-2 mb-8 sm:mb-10">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="#FF2800" stroke="#FF2800" />)}
              </div>
              <p className="font-classic italic text-2xl sm:text-3xl md:text-5xl leading-tight text-neutral-200 mb-10 sm:mb-12">"{TESTIMONIALS[testimonial].quote}"</p>
              <div className="flex flex-col items-center">
                <p className="font-clean text-xs font-bold tracking-[0.2em] mb-2">{TESTIMONIALS[testimonial].name.toUpperCase()}</p>
                <p className="font-clean text-[10px] tracking-[0.1em] text-[#FF2800] selection:bg-[#FF2800] selection:text-white">{TESTIMONIALS[testimonial].location.toUpperCase()} &middot; VERIFIED</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-16">
            <button onClick={() => setTestimonial((testimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="font-clean text-[10px] font-bold tracking-[0.2em] text-neutral-500 hover:text-white transition-colors">PREV</button>
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setTestimonial(i)} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === testimonial ? "bg-[#FF2800] scale-150" : "bg-white/20 hover:bg-white/50"}`} 
                />
              ))}
            </div>
            <button onClick={() => setTestimonial((testimonial + 1) % TESTIMONIALS.length)} className="font-clean text-[10px] font-bold tracking-[0.2em] text-neutral-500 hover:text-white transition-colors">NEXT</button>
          </div>
        </div>
      </section>

      {/* ---------------- 11. NEWSLETTER (Consistent Seamless Exit) ---------------- */}
      <section className="bg-white max-w-[1600px] mx-auto px-6 lg:px-10 py-24 sm:py-32 lg:py-40 text-center relative selection:bg-neutral-900 selection:text-white border-t border-neutral-100">
        <Reveal>
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 sm:mb-8 hover:bg-[#FF2800]/10 transition-colors duration-500">
            <Camera size={20} className="text-black" />
          </div>
          <h2 className="font-classic text-4xl sm:text-5xl md:text-6xl uppercase mb-5 sm:mb-6 leading-tight">
            <ShimmerText text="Join The" baseColor="#000000" shimmerColor="#FF2800" /> <span className="italic text-neutral-400">Syndicate</span>
          </h2>
          <p className="font-clean text-sm text-neutral-500 max-w-lg mx-auto mb-10 sm:mb-12 leading-relaxed font-medium">Subscribe for early access to runway collections, limited-edition designs, and invitation-only atelier launches.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto relative group">
            <input type="email" required placeholder="ENTER YOUR EMAIL" className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-[#FF2800] outline-none py-4 px-2 font-clean text-xs font-bold tracking-widest text-black transition-colors placeholder:text-neutral-300" />
            <button type="submit" className="absolute right-0 bottom-4 text-black group-focus-within:text-[#FF2800] transition-colors hover:scale-110"><ArrowRight size={20} /></button>
          </form>
          <p className="font-clean text-[9px] font-bold text-neutral-400 tracking-[0.15em] mt-8 uppercase">BY SUBSCRIBING, YOU CONSENT TO OUR PRIVACY POLICY.</p>
        </Reveal>
      </section>
      
    </div>
  );
};