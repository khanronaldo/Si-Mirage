import React from 'react';
import { ShopProvider, useShop, PageRoute } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

// Views
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactPage, FAQPage, GenericInfoPage } from './pages/InfoPages';
import { BrandPage } from './pages/BrandPage';
import { AdminLogin } from './pages/AdminLogin';
import { HeritagePage } from './pages/HeritagePage';

const MainAppContent: React.FC = () => {
  const { activePage, selectedProductId, selectedBrandId } = useShop();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage, selectedProductId, selectedBrandId]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'shop':
      case 'collections':
      case 'new-arrivals':
      case 'best-sellers':
        return <Shop />;
      case 'pdp':
        return <ProductDetail />;
      case 'brand':
        return <BrandPage />;
      case 'heritage':
        return <HeritagePage />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin':
        return <AdminDashboard />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'warranty':
        return (
          <GenericInfoPage
            title="WARRANTY & REPAIRS"
            subtitle="SI-MIRAGE GUARANTEE"
            paragraphs={[
              "Si-Mirage offers a comprehensive 2-Year Atelier Structural Warranty on all handcrafted eyewear frames. This covers all frame material, weld points, and joint assembly defects from the date of purchase. It is our physical pledge of structural linear engineering.",
              "In the event of accidental damage, lens scratching, or temple misalignment from high-velocity impact, our Gulberg workshop offers a full premium repair and alignment suite. We stock authentic spare hinges, replacement acetate nose bridges, and polarized customized lenses to restore your specific model to brand specifications.",
              "To initiate a warranty assessment or request structural repair services, please email care@simirage.pk with your original order reference number. Our master technicians will assess the damage and guide you through the priority return shipping process."
            ]}
          />
        );
      case 'shipping':
        return (
          <GenericInfoPage
            title="SHIPPING & RETURNS"
            subtitle="ATELIER LOGISTICS"
            paragraphs={[
              "Free Priority Express shipping is guaranteed across Pakistan for all orders above PKR 10,000. Orders below this threshold carry a standard premium shipping surcharge of PKR 1,500. We dispatch exclusively via TCS Priority Express for maximum security and velocity.",
              "All shipments are fully insured and packaged in our custom protective hard-shell matte black boxes accompanied by a branded microfiber cleaning cloth and authenticated certification. Standard delivery ranges from 2 to 3 business days from atelier dispatch.",
              "We offer an unconditional 7-Day Return or Exchange policy. If your eyewear does not suit your facial silhouette perfectly, you can request an exchange or full refund by keeping the frame in pristine, unworn condition with its original packaging intact."
            ]}
          />
        );
      case 'terms':
        return (
          <GenericInfoPage
            title="TERMS OF SERVICE"
            subtitle="LEGAL COMPLIANCE"
            paragraphs={[
              "Welcome to the Si-Mirage online atelier (the 'Service'). By accessing our website, purchasing our premium eyewear models, or requesting specialized custom fittings, you agree to be bound by these general Terms of Service and compliance codes.",
              "All intellectual property, custom linear blueprints, geometric rendering files, brand guidelines, and high-fashion media displayed are owned exclusively by Si-Mirage. Any unauthorized duplication, commercial resale, or distribution is strictly prohibited.",
              "We reserve the right to limit quantities of our Limited collections, adjust pricing in PKR due to macro material conditions, or cancel custom orders that violate our fair use policies."
            ]}
          />
        );
      case 'privacy':
        return (
          <GenericInfoPage
            title="PRIVACY POLICY"
            subtitle="DATA SAFEGUARDS"
            paragraphs={[
              "At Si-Mirage, safeguarding the security and absolute confidentiality of your personal information is a core value. We collect only essential client details (full name, email address, delivery street address, phone number) to process your order.",
              "Your information is secured using industry-standard 256-bit SSL network encryption. We never share, sell, lease, or rent your private transaction records to third parties for commercial marketing purposes.",
              "We use client-side local cookies strictly to persist your local wishlist preferences and atelier shopping cart selections across browser refreshes. You may manage these settings inside your personal browser security settings."
            ]}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Premium Navigation Header */}
      <Header />

      {/* Main viewport */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Sliding Bag Drawer */}
      <CartDrawer />

      {/* Account Signup Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
