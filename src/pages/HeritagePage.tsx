import React from 'react';
import { motion } from 'motion/react';
import { Shield, Hammer, Flame, Sparkles, Award, MapPin, Eye } from 'lucide-react';

export const HeritagePage: React.FC = () => {
  const manifestoPoints = [
    {
      icon: Eye,
      title: "STRUCTURAL LINEARITY",
      description: "We conceive frames as architectural objects first, and fashion accessories second. Every silhouette is calculated using geometric lines that complement the natural contours of the face, striking a perfect balance between bold volume and weightless comfort."
    },
    {
      icon: Hammer,
      title: "UNCOMPROMISING MATURITY",
      description: "A Si-Mirage frame is built to outlast seasons. By embedding flexible beta-titanium wire skeletons inside high-density organic acetate, we construct eyewear with memories—molding to your personal temple contours over time without losing its structural tension."
    },
    {
      icon: Shield,
      title: "ATELIER AUTHENTICITY",
      description: "We reject the mass-manufactured, injected-plastic paradigm. Every single piece is machined from raw, organic cotton cellulose sheets and hand-polished by a single artisan in our specialized workshop, preserving the depth of tone and warm organic feel."
    }
  ];

  const stages = [
    {
      num: "01",
      title: "MATERIAL SELECTION",
      detail: "We source custom bio-acetate exclusively from the historic Mazzucchelli block in Italy. Derived from natural cotton pulp and wood fibers, it is entirely biodegradable, hypoallergenic, and possesses a signature depth of luster that petroleum-based plastics can never replicate."
    },
    {
      num: "02",
      title: "LINEAR BLUEPRINTING & MILLING",
      detail: "Using custom blueprints, the raw sheets are sliced into solid structural tablets. Our high-precision mills sculpt the core bridge, lens groves, and temple hinges, leaving organic micro-textures that hint at the mechanical lineage of the silhouette."
    },
    {
      num: "03",
      title: "WIRE-CORE EMBEDDING",
      detail: "Under localized induction heat, a flexible beta-titanium wire skeleton is shot through the core of each temple. This gives the acetate structural support, allowing client-specific adjustments to the temple bend for an absolute tailored fit."
    },
    {
      num: "04",
      title: "72-HOUR BARREL TUMBLING",
      detail: "The raw components are placed into sealed beechwood barrels filled with volcanic pumice stone, custom birch chips, and natural carnauba wax. Rotated continuously for three days, the components are gently smoothed to a velvet-matte tactile state."
    },
    {
      num: "05",
      title: "ARTISAN BUFFERING",
      detail: "Our master polishers manually apply the frame to rotating soft-muslin buffing wheels charged with fine organic clay. This demanding stage requires years of practice, raising a striking, deep, high-gloss glass-like reflection from the organic acetate."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-20 selection:bg-[#FF2800] selection:text-white overflow-hidden">
      <style>
        {`
          .font-classic {
            font-family: 'Playfair Display', serif !important;
            letter-spacing: 0.08em !important;
          }
          .font-clean {
            font-family: 'Montserrat', sans-serif !important;
          }
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.02;
          }
        `}
      </style>
      
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 sm:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-[10px] tracking-[0.3em] font-clean text-[#FF2800] font-extrabold uppercase mb-3">THE ATELIER HERITAGE</p>
          <h1 className="font-classic text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider leading-tight mb-6">
            CRAFTED FOR THE <br />
            <span className="italic font-light text-neutral-400">DISCERNING FEW</span>
          </h1>
          <div className="w-16 h-[2px] bg-[#FF2800] mx-auto mb-8" />
          <p className="font-clean text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            At Si-Mirage, we do not follow the fleeting whims of trends. We believe in structural permanence. 
            Our eyewear is conceived as an architectural interface between vision and reality, sculpted by hand and refined through decades of legacy.
          </p>
        </motion.div>
      </div>

      {/* Cinematic Quote Overlay Section */}
      <section className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[400px] mb-20 sm:mb-32 overflow-hidden border-y border-neutral-900 bg-neutral-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black" />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="font-classic italic text-lg sm:text-2xl md:text-3xl text-neutral-200 leading-relaxed"
          >
            "Fashion fades, yet geometric linearity remains absolute. We do not paint beauty; we sculpt its bones."
          </motion.p>
          <p className="font-clean text-[9px] tracking-[0.2em] uppercase text-[#FF2800] mt-6 font-extrabold">&mdash; SI-MIRAGE ATELIER MANIFESTO</p>
        </div>
      </section>

      {/* The Core Philosophy Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20 sm:mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {manifestoPoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0b0b0b] border border-neutral-900 p-8 hover:border-neutral-800 transition-all duration-500 rounded-2xl group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center mb-6 group-hover:border-[#FF2800] transition-colors duration-500">
                  <item.icon className="w-5 h-5 text-[#FF2800] group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-classic text-[14px] font-bold uppercase tracking-wider mb-4 group-hover:text-[#FF2800] transition-colors duration-300">{item.title}</h3>
                <p className="font-clean text-xs text-neutral-400 leading-relaxed font-medium">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The 84-Stage Process (Vertical Timeline) */}
      <section className="bg-neutral-950/50 py-20 sm:py-32 border-y border-neutral-900 relative">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-16 sm:mb-24">
            <p className="text-[10px] tracking-[0.3em] font-clean text-[#FF2800] font-extrabold uppercase mb-2">METICULOUS WORKFLOW</p>
            <h2 className="font-classic text-3xl sm:text-4xl md:text-5xl uppercase font-bold">THE 84-STAGE MANIFEST</h2>
            <div className="w-12 h-[1px] bg-[#FF2800] mx-auto mt-4 mb-6" />
            <p className="font-clean text-xs text-neutral-400 leading-relaxed font-medium">
              Every frame is meticulously touched, sculpted, smoothed, and polished by human hands across eighty-four stages of absolute precision.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-[1px] before:bg-neutral-800">
            {stages.map((stage, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col sm:flex-row items-start sm:items-center">
                  {/* Timeline bullet */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] w-3.5 h-3.5 bg-[#FF2800] rounded-full border border-black shadow-[0_0_8px_#FF2800] z-20" />

                  {/* Left Column (Empty on Desktop if odd) */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-12 text-left sm:text-right ${isEven ? 'order-1' : 'sm:order-2 sm:text-left sm:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-mono text-3xl sm:text-5xl font-extrabold text-neutral-800 tracking-tighter block mb-2">{stage.num}</span>
                      <h4 className="font-classic text-[14px] font-extrabold text-white uppercase tracking-wider mb-3">{stage.title}</h4>
                      <p className="font-clean text-xs text-neutral-400 leading-relaxed font-medium max-w-md sm:ml-auto sm:mr-0 even:sm:mr-auto even:sm:ml-0">
                        {stage.detail}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Column Spacer */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Physical Location Section */}
      <section className="py-20 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0b0b0b] border border-neutral-900 rounded-3xl p-8 sm:p-12 md:p-16 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2800]/30 bg-[#FF2800]/5 text-[#FF2800] text-[9px] font-extrabold tracking-widest font-clean uppercase">
              <MapPin className="w-3 h-3" />
              GULBERG III, LAHORE
            </span>
            <h3 className="font-classic text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-white leading-tight">
              THE PHYSICAL <br />
              <span className="italic font-light text-neutral-400">ATELIER STUDIO</span>
            </h3>
            <p className="font-clean text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
              We operate our flagship studio and workshop in Lahore. It is designed to offer a calm, tactile environment for customized measurements and personal consultations. Here, clients can handle raw sheets of bio-acetate, witness the manual buffing process, and obtain bespoke adjustments.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <div className="border-l-2 border-[#FF2800] pl-4">
                <p className="font-clean text-[10px] tracking-wider text-neutral-500 font-bold uppercase">LOCATION ADDRESS</p>
                <p className="font-classic text-xs font-bold text-white mt-1">Block K, Gulberg III, Lahore, Pakistan</p>
              </div>
              <div className="border-l-2 border-[#FF2800] pl-4">
                <p className="font-clean text-[10px] tracking-wider text-neutral-500 font-bold uppercase">CONSULTATIONS</p>
                <p className="font-classic text-xs font-bold text-white mt-1">Monday &mdash; Saturday, by Appointment only</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-800 shadow-2xl bg-neutral-950">
            <img 
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80" 
              alt="Atelier workshop room" 
              className="w-full h-full object-cover mix-blend-luminosity brightness-75 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

    </div>
  );
};
