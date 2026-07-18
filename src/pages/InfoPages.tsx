import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Contact Page Component
export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 text-black selection:bg-[#FF2800] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#FF2800] font-bold mb-2">SI-MIRAGE CARE</p>
          <h1 className="font-classic text-3xl tracking-wide uppercase text-gray-900 font-bold">CONTACT US</h1>
          <div className="w-12 h-[1px] bg-[#FF2800] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 p-6 border border-neutral-200 shadow-xs rounded-sm space-y-6">
              <h3 className="font-sans text-xs tracking-widest font-bold text-gray-900 uppercase">ATELIER STATIONS</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                For immediate support, custom fitting appointments, or questions regarding our hand-polished acetate processes, reach out directly.
              </p>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4.5 h-4.5 text-[#FF2800] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Client Care Email</p>
                    <p className="text-zinc-500 font-mono mt-0.5">care@simirage.pk</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-4.5 h-4.5 text-[#FF2800] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Priority Hotline</p>
                    <p className="text-zinc-500 font-mono mt-0.5">+92 (042) 111-MIRAGE</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4.5 h-4.5 text-[#FF2800] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Main Atelier & Showroom</p>
                    <p className="text-zinc-500 mt-0.5">Gulberg III, Block K, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Right Side: Message form */}
        <div className="lg:col-span-7 bg-white p-8 border border-gray-100 shadow-md rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-display text-xs tracking-widest font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-4">
              SEND DIRECT ENQUIRY
            </h3>

            {success && (
              <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xs border border-emerald-100 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>Your query has been dispatched safely to our Gulberg atelier. We will respond within 12 hours.</span>
              </div>
            )}

            <div>
              <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">YOUR FULL NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zainab Ahmed"
                className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-3 focus:bg-white focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. zainab@domain.pk"
                className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-3 focus:bg-white focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">MESSAGE DETAIL</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our master craftsmen assist you?"
                className="w-full bg-gray-50 border border-gray-200 text-xs font-sans px-4 py-3 focus:bg-white focus:border-black transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-neutral-900 text-white font-display text-xs tracking-widest font-bold uppercase py-3.5 px-8 transition-colors flex items-center justify-center space-x-2"
            >
              <span>SEND ENQUIRY</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

// FAQ Page Component
export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'WHAT MATERIALS ARE USED IN SI-MIRAGE FRAMES?', a: 'We construct all custom frames strictly using premium Italian bio-acetate (derived from cotton cellulose fibers) and high-flexibility Japanese beta-titanium wire skeletons. Our limited edition pieces include authentic 24k gold plating.' },
    { q: 'ARE THE LENSES POLARIZED?', a: 'Yes. All Si-Mirage sunglasses features dual-sided multi-layer polarized protective optics blocking 100% of UVA and UVB radiation, coated with hydrophobic and anti-dust coatings.' },
    { q: 'CAN I INSERT PRESCRIBED OPTICAL GLASS INTO LENSES?', a: 'Absolutely. Models like the Vintage Browline and Crystal Clear are optical-ready frames. Any certified ophthalmologist or optical boutique can easily exchange our demo templates for customized medical lenses.' },
    { q: 'WHAT ARE THE SHIPPING RATES ACROSS PAKISTAN?', a: 'We offer free priority express shipping across Pakistan on all orders above PKR 10,000. For orders below this threshold, a premium shipping fee of PKR 1,500 applies. All packages are insured and dispatched via TCS Priority Express.' },
    { q: 'HOW DO I REGISTER MY WARRANTY?', a: 'Your purchase is automatically recorded under your verified email address upon checkout. This secures your 2-Year Atelier Structural Warranty.' }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 text-black selection:bg-[#FF2800] selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#FF2800] font-bold mb-2">ANSWERS & GUIDES</p>
          <h1 className="font-classic text-3xl tracking-wide uppercase font-bold">FAQ</h1>
          <div className="w-12 h-[1px] bg-[#FF2800] mx-auto mt-4" />
        </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border border-neutral-100 rounded-xs bg-neutral-50/50">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex justify-between items-center p-5 text-left font-display text-xs font-bold uppercase tracking-wider text-gray-800"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-white"
                  >
                    <p className="p-5 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

// Generic Information Page Template
interface GenericInfoPageProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export const GenericInfoPage: React.FC<GenericInfoPageProps> = ({ title, subtitle, paragraphs }) => {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 text-black selection:bg-[#FF2800] selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#FF2800] font-bold mb-2">{subtitle}</p>
          <h1 className="font-classic text-3xl tracking-wide uppercase font-bold">{title}</h1>
          <div className="w-12 h-[1px] bg-[#FF2800] mx-auto mt-4" />
        </div>

      <div className="bg-white border border-neutral-100 p-8 shadow-xs rounded-xs font-sans text-xs sm:text-sm text-gray-600 space-y-6 leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
    </div>
  );
};
