import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { BRANDS } from '../data/brands';
import { Order, Product } from '../types';
import { 
  DollarSign, ShoppingCart, Users, TrendingUp, ChevronDown, CheckCircle, 
  Clock, Truck, Ban, Plus, Trash2, LogOut, Edit, Search, Package, 
  Layers, ChevronRight, X, Sparkles, Check, Info, FileText, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    customers, 
    updateOrderStatus, 
    addMockOrder, 
    setActivePage, 
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    refreshAdminData
  } = useShop();
  
  // Guard Route: Redirect to /admin/login if not logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('sm_admin_logged_in') === 'true';
    if (!loggedIn) {
      setActivePage('admin-login');
    }
  }, [setActivePage]);

  // Tab Manager: orders (Atelier Orders), products (Product Catalog), customers (Valued Clients)
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'customers'>('orders');
  
  // Expanded order card tracking
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // New Custom Mock Order states
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustAddress, setNewCustAddress] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [selectedProdId, setSelectedProdId] = useState('');
  const [qty, setQty] = useState(1);

  // Product Catalog Search & Filters
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] = useState('All');
  const [prodBrandFilter, setProdBrandFilter] = useState('All');

  // Product Add/Edit Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // null means "Add New"
  
  // Product Form Field States
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formBrandId, setFormBrandId] = useState('gentle-monster');
  const [formGender, setFormGender] = useState<'Male' | 'Female' | 'Unisex'>('Unisex');
  const [formCategory, setFormCategory] = useState<'Sunglasses' | 'Eyeglasses' | 'Blue-Light' | 'Limited'>('Sunglasses');
  const [formPrice, setFormPrice] = useState<number>(25000);
  const [formOriginalPrice, setFormOriginalPrice] = useState<string>('');
  const [formTag, setFormTag] = useState<string>('');
  const [formImage, setFormImage] = useState('');
  const [formGallery, setFormGallery] = useState<string[]>([]); // Dynamic secondary gallery uploads
  const [formDescription, setFormDescription] = useState('');
  const [formFrameShape, setFormFrameShape] = useState<'Aviator' | 'Wayfarer' | 'Round' | 'Cat-Eye' | 'Square' | 'Browline'>('Aviator');
  const [formMaterial, setFormMaterial] = useState('Bio-Cellulose Italian Acetate');
  const [formLensColor, setFormLensColor] = useState('Obsidian Gray');
  const [formFrameColor, setFormFrameColor] = useState('Piano Gloss Black');
  const [formQuantity, setFormQuantity] = useState<number>(50);
  
  // Colors options array state: { name, hex, image }
  const [formColors, setFormColors] = useState<{ name: string; hex: string; image: string }[]>([
    { name: 'Piano Gloss Black', hex: '#000000', image: '' }
  ]);

  // Handle Blocking/Unblocking a registered User
  const handleBlockUserToggle = async (uid: string, currentlyBlocked: boolean) => {
    const action = currentlyBlocked ? 'unblock' : 'block';
    if (!confirm(`Are you sure you want to ${action} this customer account?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${uid}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isBlocked: !currentlyBlocked })
      });
      if (res.ok) {
        await refreshAdminData();
      } else {
        alert('Failed to update block status.');
      }
    } catch (err) {
      console.error('Error blocking user:', err);
    }
  };

  // Handle Deleting/Removing a registered user from the database
  const handleRemoveUser = async (uid: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete the registered account for ${email}? This action is irreversible.`)) return;

    try {
      const res = await fetch(`/api/admin/users/${uid}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await refreshAdminData();
      } else {
        alert('Failed to delete user account.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Helper to compress and downscale files to prevent massive base64 payloads
  const compressImage = (file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
          } else {
            resolve(event.target?.result as string || '');
          }
        };
        img.onerror = () => {
          resolve(event.target?.result as string || '');
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle File Input conversion to Base64 with automatic downscaling/compression
  const handleBase64Upload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'gallery' | { colorIndex: number }) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      if (f) {
        fileArray.push(f);
      }
    }

    for (const file of fileArray) {
      try {
        const compressedBase64 = await compressImage(file);
        if (!compressedBase64) continue;

        if (target === 'main') {
          setFormImage(compressedBase64);
        } else if (target === 'gallery') {
          setFormGallery((prev) => [...prev, compressedBase64]);
        } else if (typeof target === 'object' && target.colorIndex !== undefined) {
          handleFormColorChange(target.colorIndex, 'image', compressedBase64);
        }
      } catch (err) {
        console.error('Error compressing uploaded file:', err);
        // Fallback to standard reading if compression fails
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          if (target === 'main') {
            setFormImage(base64);
          } else if (target === 'gallery') {
            setFormGallery((prev) => [...prev, base64]);
          } else if (typeof target === 'object' && target.colorIndex !== undefined) {
            handleFormColorChange(target.colorIndex, 'image', base64);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Sync selectedProdId with available products once loaded
  useEffect(() => {
    if (products.length > 0 && !selectedProdId) {
      setSelectedProdId(products[0].id);
    }
  }, [products, selectedProdId]);

  // Reset product form fields
  const resetProductForm = (productToEdit: Product | null = null) => {
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setFormId(productToEdit.id);
      setFormName(productToEdit.name);
      setFormBrandId(productToEdit.brandId);
      setFormGender(productToEdit.gender);
      setFormCategory(productToEdit.category);
      setFormPrice(productToEdit.price);
      setFormOriginalPrice(productToEdit.originalPrice ? productToEdit.originalPrice.toString() : '');
      setFormTag(productToEdit.tag || '');
      setFormImage(productToEdit.image);
      setFormGallery(productToEdit.images || []);
      setFormDescription(productToEdit.description);
      setFormFrameShape(productToEdit.frameShape);
      setFormMaterial(productToEdit.material);
      setFormLensColor(productToEdit.lensColor);
      setFormFrameColor(productToEdit.frameColor);
      setFormQuantity(productToEdit.quantity || 100);
      setFormColors(productToEdit.colors || [{ name: productToEdit.frameColor, hex: '#000000', image: productToEdit.image }]);
    } else {
      setEditingProduct(null);
      // Generate a unique silhouette ID code automatically
      const randCode = Math.floor(100 + Math.random() * 900);
      setFormId(`custom-silhouette-${randCode}`);
      setFormName('');
      setFormBrandId('gentle-monster');
      setFormGender('Unisex');
      setFormCategory('Sunglasses');
      setFormPrice(25000);
      setFormOriginalPrice('');
      setFormTag('');
      setFormImage('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80');
      setFormGallery([]);
      setFormDescription('Indulge in unparalleled comfort and prestige with this new handcrafted premium silhouette.');
      setFormFrameShape('Aviator');
      setFormMaterial('Italian Cellulose Acetate');
      setFormLensColor('Dark Gray');
      setFormFrameColor('Piano Gloss Black');
      setFormQuantity(50);
      setFormColors([{ name: 'Piano Gloss Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' }]);
    }
  };

  // Open creation panel
  const handleOpenAddProduct = () => {
    resetProductForm(null);
    setIsFormOpen(true);
  };

  // Open editing panel
  const handleOpenEditProduct = (prod: Product) => {
    resetProductForm(prod);
    setIsFormOpen(true);
  };

  // Add/remove items from dynamic colors array
  const handleAddFormColor = () => {
    setFormColors([...formColors, { name: '', hex: '#000000', image: formImage }]);
  };

  const handleRemoveFormColor = (index: number) => {
    if (formColors.length <= 1) return; // Must have at least one color variation
    setFormColors(formColors.filter((_, idx) => idx !== index));
  };

  const handleFormColorChange = (index: number, field: 'name' | 'hex' | 'image', value: string) => {
    const updated = [...formColors];
    updated[index] = { ...updated[index], [field]: value };
    setFormColors(updated);
  };

  // Handle product creation/updating submit
  const handleProductFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit manual validation with friendly alerts to handle any empty scrolled-out fields
    if (!formId || !formId.trim()) {
      alert("Error: Product ID code is missing. Please enter a Unique ID Code.");
      return;
    }
    if (!formName || !formName.trim()) {
      alert("Error: Please enter a Silhouette Name.");
      return;
    }
    if (!formBrandId) {
      alert("Error: Please select a Brand Atelier.");
      return;
    }
    if (formPrice === undefined || formPrice === null || isNaN(Number(formPrice)) || Number(formPrice) <= 0) {
      alert("Error: Please enter a valid Retail Price greater than 0.");
      return;
    }
    if (formQuantity === undefined || formQuantity === null || isNaN(Number(formQuantity)) || Number(formQuantity) < 0) {
      alert("Error: Please enter a valid Quantity Stock.");
      return;
    }
    if (!formImage || !formImage.trim()) {
      alert("Error: Please upload or provide a main Product Image URL.");
      return;
    }
    if (!formDescription || !formDescription.trim()) {
      alert("Error: Please write a Boutique Description Story.");
      return;
    }

    // Validate color options
    for (let idx = 0; idx < formColors.length; idx++) {
      const c = formColors[idx];
      if (!c.name || !c.name.trim()) {
        alert(`Error in Color Option #${idx + 1}: Please enter a Color Name (e.g. Honey Tortoise).`);
        return;
      }
      if (!c.hex || !c.hex.trim()) {
        alert(`Error in Color Option #${idx + 1}: Please enter a valid hex color code (e.g. #D4AF37).`);
        return;
      }
      if (!c.image || !c.image.trim()) {
        alert(`Error in Color Option #${idx + 1}: Please upload or paste a Color Photo Source.`);
        return;
      }
    }

    // Build specs automatically based on input fields to matches user mode
    const specsPayload = {
      frameShape: formFrameShape,
      frameColor: formFrameColor,
      frameMaterial: formMaterial,
      templeColor: `${formFrameColor} Acetate`,
      lensColor: formLensColor,
      treatment: 'Double-sided Anti-scratch Anti-reflective UV400',
      lensCategory: '3N (High Protection)',
      dimensions: {
        size: '52-18 mm',
        lensHeight: '44 mm',
        templeLength: '145 mm'
      }
    };

    // Ensure color values are sanitized
    const sanitizedColors = formColors.map(c => ({
      name: c.name || formFrameColor || 'Default',
      hex: c.hex || '#000000',
      image: c.image || formImage
    }));

    const extraImages = sanitizedColors.map(c => c.image).filter(Boolean);
    const imagesArray = Array.from(new Set([formImage, ...formGallery, ...extraImages])).filter(Boolean);

    const productPayload = {
      id: formId,
      name: formName,
      brandId: formBrandId,
      gender: formGender,
      category: formCategory,
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : null,
      tag: formTag || null,
      image: formImage,
      images: imagesArray,
      description: formDescription,
      frameShape: formFrameShape,
      material: formMaterial,
      lensColor: formLensColor,
      frameColor: formFrameColor,
      colors: sanitizedColors,
      specs: specsPayload,
      quantity: Number(formQuantity)
    };

    const success = editingProduct 
      ? await updateProduct(productPayload)
      : await addProduct(productPayload);

    if (success) {
      setIsFormOpen(false);
      refreshProducts();
    } else {
      alert("Failed to save product in database.");
    }
  };

  const handleDeleteClick = async (productId: string) => {
    if (confirm(`Are you sure you want to delete the product code ${productId} from the database? This is irreversible.`)) {
      const success = await deleteProduct(productId);
      if (success) {
        refreshProducts();
      } else {
        alert("Failed to delete product from database.");
      }
    }
  };

  // Filtered Products for Catalog
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(prodSearch.toLowerCase()) || p.id.toLowerCase().includes(prodSearch.toLowerCase());
      const matchesCategory = prodCategoryFilter === 'All' || p.category === prodCategoryFilter;
      const matchesBrand = prodBrandFilter === 'All' || p.brandId === prodBrandFilter;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, prodSearch, prodCategoryFilter, prodBrandFilter]);

  // Dynamic calculations based on orders database state
  const totalSales = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const avgOrderValue = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'Cancelled');
    return validOrders.length > 0 ? Math.round(totalSales / validOrders.length) : 0;
  }, [orders, totalSales]);

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  const handleCustomOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustEmail || !newCustPhone || !newCustAddress) return;

    const prod = products.find((p) => p.id === selectedProdId) || products[0];
    if (!prod) return;

    const items = [
      {
        productName: prod.name,
        quantity: qty,
        price: prod.price,
        image: prod.image,
        colorName: prod.frameColor || 'Black',
        colorHex: '#000000'
      }
    ];

    addMockOrder(newCustName, newCustEmail, items, newCustAddress, newCustPhone);
    
    // Reset form
    setNewCustName('');
    setNewCustEmail('');
    setNewCustAddress('');
    setNewCustPhone('');
    setQty(1);
    setIsAddingOrder(false);
  };

  const isLoggedIn = localStorage.getItem('sm_admin_logged_in') === 'true';
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="bg-neutral-50 min-h-screen pt-24 sm:pt-28 md:pt-36 pb-16 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Segment */}
        <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-neutral-400 font-bold mb-1">SI-MIRAGE BUSINESS ENGINE</p>
            <h1 className="font-classic text-3xl tracking-wide uppercase leading-none font-bold">ADMIN DASHBOARD</h1>
          </div>
          
          {/* Main Workspace Tabs */}
          <div className="flex bg-white border border-gray-200 p-1 rounded-sm gap-1 self-start md:self-auto shadow-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 font-display text-[10px] tracking-widest uppercase font-bold transition-all ${
                activeTab === 'orders' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-500 hover:text-black hover:bg-neutral-50'
              }`}
            >
              Atelier Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-display text-[10px] tracking-widest uppercase font-bold transition-all ${
                activeTab === 'products' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-500 hover:text-black hover:bg-neutral-50'
              }`}
            >
              Product Inventory
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 font-display text-[10px] tracking-widest uppercase font-bold transition-all ${
                activeTab === 'customers' 
                  ? 'bg-black text-white' 
                  : 'text-zinc-500 hover:text-black hover:bg-neutral-50'
              }`}
            >
              Client Directory
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {activeTab === 'products' ? (
              <button
                onClick={handleOpenAddProduct}
                className="bg-black hover:bg-neutral-900 text-white font-sans text-[10px] tracking-[0.2em] font-bold uppercase py-3 px-5 rounded-none flex items-center space-x-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW SILHOUETTE</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAddingOrder(!isAddingOrder)}
                className="bg-black hover:bg-neutral-900 text-white font-sans text-[10px] tracking-[0.2em] font-bold uppercase py-3 px-5 rounded-none flex items-center space-x-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>SIMULATE CUSTOM ORDER</span>
              </button>
            )}
            
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('sm_admin_logged_in');
                setActivePage('home');
              }}
              className="border border-neutral-200 hover:border-[#FF2800] bg-white hover:text-[#FF2800] text-neutral-500 font-sans text-[10px] tracking-[0.2em] font-bold uppercase py-3 px-5 rounded-none flex items-center space-x-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* STATS METRIC GRID PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 border border-gray-100 shadow-xs rounded-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-zinc-400 font-display uppercase font-semibold">Total Revenue</span>
              <p className="text-xl font-bold font-mono text-gray-950">PKR {totalSales.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-600 font-sans font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.4% vs last week
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-full text-zinc-700">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-100 shadow-xs rounded-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-zinc-400 font-display uppercase font-semibold">Total Orders</span>
              <p className="text-xl font-bold font-mono text-gray-950">{orders.length}</p>
              <span className="text-[10px] text-zinc-400 font-sans">Active deliveries monitored</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-full text-zinc-700">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-100 shadow-xs rounded-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-zinc-400 font-display uppercase font-semibold">Total Inventory SKU</span>
              <p className="text-xl font-bold font-mono text-gray-950">{products.length}</p>
              <span className="text-[10px] text-amber-800 font-sans">Handcrafted designs loaded</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-full text-zinc-700">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-100 shadow-xs rounded-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest text-zinc-400 font-display uppercase font-semibold">Valued Clients</span>
              <p className="text-xl font-bold font-mono text-gray-950">{customers.length}</p>
              <span className="text-[10px] text-emerald-600 font-sans font-medium">Synced with PostgreSQL Auth</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-full text-zinc-700">
              <Users className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* CUSTOM ORDER ADD FORM DRAWER (Simulated Action) */}
        <AnimatePresence>
          {isAddingOrder && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <form onSubmit={handleCustomOrderSubmit} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm space-y-4 max-w-2xl shadow-xs">
                <h3 className="font-display text-xs tracking-widest text-gray-900 font-bold uppercase border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  SIMULATE NEW ATELIER PURCHASE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">CLIENT FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Faisal Qureshi"
                      value={newCustName}
                      onChange={(e) => setNewCustName(e.target.value)}
                      className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-3 py-2.5 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">CLIENT EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. faisal@domain.pk"
                      value={newCustEmail}
                      onChange={(e) => setNewCustEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-3 py-2.5 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">CONTACT PHONE NUMBER</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={newCustPhone}
                      onChange={(e) => setNewCustPhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-3 py-2.5 focus:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">SELECT EYEWEAR FRAME</label>
                      <select
                        value={selectedProdId}
                        onChange={(e) => setSelectedProdId(e.target.value)}
                        className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-2 py-2.5 cursor-pointer focus:bg-white"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} - PKR {p.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">QTY</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        required
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-3 py-2.5 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] tracking-widest font-display text-gray-400 uppercase font-semibold mb-1">SHIPPING / DELIVERY ADDRESS</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apartment 4B, Eden Heights, Jail Road, Lahore"
                    value={newCustAddress}
                    onChange={(e) => setNewCustAddress(e.target.value)}
                    className="w-full bg-neutral-50 border border-gray-200 text-xs font-sans px-3 py-2.5 focus:bg-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-black text-white font-display text-[9px] tracking-widest font-bold uppercase py-2.5 px-6 hover:bg-neutral-800 transition-colors"
                  >
                    PROCESS ORDER
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingOrder(false)}
                    className="bg-transparent border border-gray-200 text-gray-500 hover:text-black hover:border-black font-display text-[9px] tracking-widest uppercase py-2.5 px-6 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* TAB 1: ORDER MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="border-b border-gray-200 pb-3 flex justify-between items-baseline bg-transparent">
                <h2 className="font-serif text-lg tracking-wide uppercase text-gray-900 font-bold">ATELIER ACTIVE ORDERS</h2>
                <span className="text-[10px] font-sans font-semibold text-zinc-400">{orders.length} orders total</span>
              </div>

              <div className="space-y-3.5">
                {orders.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-gray-200 rounded-sm">
                    <ShoppingCart className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                    <p className="text-zinc-500 font-sans text-xs">No customer orders have been placed yet in PostgreSQL.</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    
                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-gray-100 hover:border-gray-200 rounded-xs overflow-hidden shadow-xs transition-colors"
                      >
                        {/* Summary Bar Clickable */}
                        <div
                          onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                          className="p-5 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <span className="font-mono text-xs font-bold text-gray-900">{order.id}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {order.date || (order as any).createdAt ? new Date((order as any).createdAt).toLocaleDateString() : 'Today'}
                            </span>
                            <span className="text-xs font-bold text-gray-800 font-sans">{order.customerName}</span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="font-mono text-xs font-bold text-gray-950">PKR {order.total.toLocaleString()}</span>
                            
                            <span className={`text-[8px] tracking-widest font-display font-bold uppercase px-2 py-1 rounded-xs flex items-center space-x-1.5 ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : order.status === 'Shipped'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : order.status === 'Cancelled'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {order.status}
                            </span>

                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>

                        {/* Expandable Panel */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-neutral-50/70 border-t border-neutral-100"
                            >
                              <div className="p-6 font-sans text-xs space-y-5">
                                
                                {/* Client Credentials Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-neutral-200 pb-4">
                                  <div>
                                    <p className="text-zinc-400 uppercase font-semibold text-[9px] tracking-wider mb-0.5">CLIENT REGISTERED EMAIL</p>
                                    <p className="text-black font-semibold font-mono">{order.customerEmail}</p>
                                  </div>
                                  <div>
                                    <p className="text-zinc-400 uppercase font-semibold text-[9px] tracking-wider mb-0.5">COURIER DISPATCH PARTNER</p>
                                    <p className="text-black font-semibold">TCS Priority Logistics (Pak-Atelier Suite)</p>
                                  </div>
                                </div>

                                {/* Shipping Address & Phone row - EXPLICITLY PRESENTED */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-neutral-200 pb-4">
                                  <div>
                                    <p className="text-zinc-400 uppercase font-semibold text-[9px] tracking-wider mb-1">STREET DELIVERY ADDRESS</p>
                                    <p className="text-zinc-800 font-medium font-sans text-xs bg-white p-2.5 border border-zinc-200 rounded-xs leading-relaxed">
                                      {order.shippingAddress || 'Boutique Collection Pickup'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-zinc-400 uppercase font-semibold text-[9px] tracking-wider mb-1">RECIPIENT CONTACT NUMBER</p>
                                    <p className="text-zinc-950 font-bold font-mono text-xs bg-white p-2.5 border border-zinc-200 rounded-xs flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                                      {order.contactNumber || 'No Phone provided'}
                                    </p>
                                  </div>
                                </div>

                                {/* Itemized Selections with Images, Colors, Quantities */}
                                <div>
                                  <p className="text-zinc-400 uppercase font-semibold text-[9px] tracking-wider mb-2.5">ORDERED EYEWEAR DETAILS</p>
                                  <div className="space-y-2.5">
                                    {order.items.map((item: any, i: number) => (
                                      <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-xs border border-zinc-100">
                                        <img 
                                          src={item.image || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'} 
                                          alt={item.productName} 
                                          className="w-12 h-12 object-contain bg-neutral-50 rounded-xs border border-neutral-100 shrink-0 p-1"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="flex-1 min-w-0 text-xs">
                                          <p className="font-bold text-gray-900 truncate">{item.productName}</p>
                                          <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-1">
                                            <span className="font-medium bg-neutral-100 px-1.5 py-0.5 rounded-xs">Quantity: {item.quantity}</span>
                                            {item.colorName && (
                                              <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full border border-neutral-300 shrink-0" style={{ backgroundColor: item.colorHex || '#000' }}></span>
                                                <span>{item.colorName}</span>
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-bold text-gray-900 font-mono">PKR {(item.price * item.quantity).toLocaleString()}</p>
                                          <p className="text-[9px] text-zinc-400 font-mono">PKR {item.price.toLocaleString()} each</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Status control actions */}
                                <div className="pt-3 border-t border-zinc-200 flex flex-wrap gap-2.5 items-center justify-between">
                                  <div className="space-y-1">
                                    <p className="text-[9px] tracking-widest text-zinc-400 font-display font-bold uppercase">UPDATE STATUS IN REAL TIME</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {(['Pending', 'Shipped', 'Delivered', 'Cancelled'] as const).map((st) => (
                                        <button
                                          key={st}
                                          type="button"
                                          onClick={() => handleStatusChange(order.id, st)}
                                          className={`px-3 py-1.5 text-[9px] font-display uppercase tracking-wider font-bold rounded-xs border transition-colors ${
                                            order.status === st 
                                              ? 'bg-black text-white border-black' 
                                              : 'bg-white text-zinc-600 border-zinc-200 hover:border-black'
                                          }`}
                                        >
                                          {st}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column Sidebar: Quick summaries */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-xs space-y-4">
                <h3 className="font-serif text-sm tracking-wide uppercase font-bold border-b border-gray-100 pb-2">ATELIER DISPATCH SUITE</h3>
                
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      {orders.filter(o => o.status === 'Pending').length}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Pending Preparation</p>
                      <p className="text-[10px] text-zinc-400">Handcrafting in progress</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      {orders.filter(o => o.status === 'Shipped').length}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">En Route (TCS Priority)</p>
                      <p className="text-[10px] text-zinc-400">Transit monitored</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      {orders.filter(o => o.status === 'Delivered').length}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Delivered & Confirmed</p>
                      <p className="text-[10px] text-zinc-400">Atelier verification complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Search and Filters Strip */}
            <div className="bg-white border border-gray-200 p-4 rounded-sm shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80 font-sans">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search silhouettes name or ID..."
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  className="w-full bg-neutral-50 border border-gray-200 text-xs px-10 py-2.5 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto items-center font-sans text-xs">
                
                {/* Brand Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">BRAND</span>
                  <select
                    value={prodBrandFilter}
                    onChange={(e) => setProdBrandFilter(e.target.value)}
                    className="bg-neutral-50 border border-gray-200 text-xs py-1.5 px-3 rounded-xs cursor-pointer focus:bg-white"
                  >
                    <option value="All">All Brands</option>
                    {BRANDS.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">PAGE / CATEGORY</span>
                  <select
                    value={prodCategoryFilter}
                    onChange={(e) => setProdCategoryFilter(e.target.value)}
                    className="bg-neutral-50 border border-gray-200 text-xs py-1.5 px-3 rounded-xs cursor-pointer focus:bg-white"
                  >
                    <option value="All">All Shop Pages</option>
                    <option value="Sunglasses">Sunglasses Page</option>
                    <option value="Eyeglasses">Eyeglasses Page</option>
                    <option value="Blue-Light">Blue-Light Page</option>
                    <option value="Limited">Limited Edition Page</option>
                  </select>
                </div>

                {filteredProducts.length !== products.length && (
                  <button
                    onClick={() => {
                      setProdSearch('');
                      setProdCategoryFilter('All');
                      setProdBrandFilter('All');
                    }}
                    className="text-amber-800 hover:text-amber-950 underline font-semibold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}

              </div>
            </div>

            {/* List Table of Present Products */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-sans">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-gray-200 text-neutral-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="py-4 px-5">SILHOUETTE / PHOTO</th>
                      <th className="py-4 px-5">PRODUCT ID</th>
                      <th className="py-4 px-5">BRAND / DETAILS</th>
                      <th className="py-4 px-5">PAGE LOCATION</th>
                      <th className="py-4 px-5">PRICE</th>
                      <th className="py-4 px-5">QUANTITY STOCK</th>
                      <th className="py-4 px-5 text-right">CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-zinc-400 font-medium">
                          No matching silhouettes found in database. Click "ADD NEW SILHOUETTE" to create one.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const brandName = BRANDS.find(b => b.id === p.brandId)?.name || p.brandId;
                        const stockStatus = p.quantity === 0 
                          ? 'Out of Stock' 
                          : (p.quantity || 0) < 10 
                          ? 'Low Stock' 
                          : 'In Stock';
                        
                        return (
                          <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                            {/* Photo and Name */}
                            <td className="py-4 px-5 flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-contain bg-neutral-100 border border-neutral-200 rounded-xs p-1"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-gray-900 truncate max-w-xs">{p.name}</p>
                                <p className="text-[10px] text-zinc-400 truncate max-w-xs italic">{p.frameShape} &middot; {p.material}</p>
                              </div>
                            </td>

                            {/* ID Code */}
                            <td className="py-4 px-5 font-mono font-semibold text-zinc-700">
                              {p.id}
                            </td>

                            {/* Brand & Details */}
                            <td className="py-4 px-5">
                              <p className="font-semibold text-gray-800">{brandName}</p>
                              {p.tag && (
                                <span className="inline-block mt-1 bg-amber-50 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                                  {p.tag}
                                </span>
                              )}
                            </td>

                            {/* Page collection */}
                            <td className="py-4 px-5">
                              <span className="font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-[10px]">
                                {p.category}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="py-4 px-5">
                              <p className="font-bold text-gray-950 font-mono">PKR {p.price.toLocaleString()}</p>
                              {p.originalPrice && (
                                <p className="text-[10px] text-zinc-400 line-through font-mono mt-0.5">PKR {p.originalPrice.toLocaleString()}</p>
                              )}
                            </td>

                            {/* Stock Quantity level */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-1.5">
                                <span className={`inline-block w-2 h-2 rounded-full ${
                                  p.quantity === 0 
                                    ? 'bg-red-500 animate-pulse' 
                                    : (p.quantity || 0) < 10 
                                    ? 'bg-amber-500 animate-pulse' 
                                    : 'bg-emerald-500'
                                }`} />
                                <span className="font-bold font-mono text-zinc-900">{p.quantity !== undefined ? p.quantity : 100} units</span>
                              </div>
                              <span className="text-[9px] text-zinc-400 block mt-0.5">{stockStatus}</span>
                            </td>

                            {/* Edit/Delete Actions */}
                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 text-zinc-600 hover:text-black border border-neutral-100 hover:border-black rounded-xs inline-flex items-center mr-2 transition-all cursor-pointer"
                                title="Edit Product Specs"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(p.id)}
                                className="p-1.5 text-zinc-400 hover:text-red-600 border border-neutral-100 hover:border-red-200 rounded-xs inline-flex items-center transition-all cursor-pointer"
                                title="Delete Silhouette"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PRODUCT ADD/EDIT DOCK SLIDE-OVER FORM PANEL */}
            <AnimatePresence>
              {isFormOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFormOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                  />
                  
                  {/* Sliding container */}
                  <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
                      className="w-screen max-w-2xl bg-white shadow-2xl h-full flex flex-col justify-between"
                    >
                      <form onSubmit={handleProductFormSubmit} id="product-master-crud-form" className="h-full flex flex-col justify-between overflow-hidden">
                        
                        {/* Drawer Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                          <div>
                            <p className="text-[8px] tracking-[0.2em] font-sans font-bold uppercase text-neutral-400">Atelier Catalog Workshop</p>
                            <h3 className="font-display text-sm tracking-widest font-bold text-black uppercase mt-1">
                              {editingProduct ? `EDITING SILHOUETTE: ${editingProduct.name}` : 'ADD NEW EYEWEAR DESIGN'}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="p-1 text-gray-400 hover:text-black rounded-full"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Drawer Body Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans text-xs">
                          <div className="space-y-5">
                          
                          {/* Segment 1: Identification */}
                          <div className="space-y-3">
                            <p className="text-[9px] tracking-widest text-zinc-400 font-display uppercase font-bold border-b border-zinc-100 pb-1.5">
                              1. DESIGN IDENTIFICATION
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">SILHOUETTE UNIQUE ID (ID CODE)</label>
                                <input
                                  type="text"
                                  disabled={!!editingProduct} // ID cannot be edited once created
                                  placeholder="e.g. cartier-santos-1"
                                  value={formId}
                                  onChange={(e) => setFormId(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed font-mono font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">SILHOUETTE NAME</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Santos-Aero Aviator"
                                  value={formName}
                                  onChange={(e) => setFormName(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white font-semibold"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">BRAND ATELIER</label>
                                <select
                                  value={formBrandId}
                                  onChange={(e) => setFormBrandId(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-2 py-2.5 cursor-pointer focus:bg-white font-medium"
                                >
                                  {BRANDS.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">GENDER CATEGORY</label>
                                <select
                                  value={formGender}
                                  onChange={(e) => setFormGender(e.target.value as any)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-2 py-2.5 cursor-pointer focus:bg-white font-medium"
                                >
                                  <option value="Unisex">Unisex Silhouette</option>
                                  <option value="Male">Mens Collection</option>
                                  <option value="Female">Womens Collection</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">SHOP PAGE UPLOAD WISE</label>
                                <select
                                  value={formCategory}
                                  onChange={(e) => setFormCategory(e.target.value as any)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-2 py-2.5 cursor-pointer focus:bg-white font-medium"
                                >
                                  <option value="Sunglasses">Sunglasses Page</option>
                                  <option value="Eyeglasses">Eyeglasses Page</option>
                                  <option value="Blue-Light">Blue-Light Page</option>
                                  <option value="Limited">Limited Edition Page</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Segment 2: Pricing & Inventory */}
                          <div className="space-y-3">
                            <p className="text-[9px] tracking-widest text-zinc-400 font-display uppercase font-bold border-b border-zinc-100 pb-1.5">
                              2. VALUATION & QUANTITY
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div className="sm:col-span-2">
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">RETAIL PRICE (PKR)</label>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder="e.g. 28000"
                                  value={formPrice}
                                  onChange={(e) => setFormPrice(Number(e.target.value))}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white font-mono font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">ORIGINAL PRICE (MSRP)</label>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder="Discount crossout"
                                  value={formOriginalPrice}
                                  onChange={(e) => setFormOriginalPrice(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">QUANTITY STOCK</label>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder="e.g. 100"
                                  value={formQuantity}
                                  onChange={(e) => setFormQuantity(Number(e.target.value))}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white font-mono font-bold"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">MARKETING TAG</label>
                                <select
                                  value={formTag}
                                  onChange={(e) => setFormTag(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-2 py-2.5 cursor-pointer focus:bg-white font-medium"
                                >
                                  <option value="">No Promotional Tag</option>
                                  <option value="NEW">NEW - Fresh Arrival</option>
                                  <option value="SALE">SALE - Promotional Pricing</option>
                                  <option value="LIMITED">LIMITED - Rare Atelier Run</option>
                                  <option value="BEST SELLER">BEST SELLER - Highly Demanded</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">MAIN IMAGE SOURCE</label>
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    placeholder="Paste URL, or upload file below..."
                                    value={formImage}
                                    onChange={(e) => setFormImage(e.target.value)}
                                    className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2 focus:bg-white font-mono text-[10px]"
                                  />
                                  <div className="flex items-center justify-center border border-dashed border-zinc-200 bg-neutral-50/50 hover:bg-neutral-50 py-3 px-4 rounded-xs transition-colors relative cursor-pointer group">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleBase64Upload(e, 'main')}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <span className="text-[10px] font-sans font-semibold text-zinc-500 group-hover:text-black">
                                      {formImage.startsWith('data:image/') ? '✓ File Uploaded Successfully' : '↑ Click to upload custom image'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Dynamic product gallery uploads */}
                            <div className="bg-neutral-50 p-4 border border-zinc-200 rounded-sm space-y-2.5">
                              <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold">PRODUCT GALLERY IMAGES (OPTIONAL)</label>
                              <div className="grid grid-cols-4 gap-3">
                                {formGallery.map((img, idx) => (
                                  <div key={idx} className="aspect-square bg-white border border-neutral-200 p-1 relative rounded-xs group flex items-center justify-center">
                                    <img src={img} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                                    <button
                                      type="button"
                                      onClick={() => setFormGallery(formGallery.filter((_, i) => i !== idx))}
                                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 shadow-xs text-[9px] w-4 h-4 flex items-center justify-center font-bold cursor-pointer"
                                      title="Remove"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                                <div className="aspect-square border border-dashed border-zinc-300 hover:border-black bg-white hover:bg-neutral-50 flex flex-col items-center justify-center relative cursor-pointer p-2 transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleBase64Upload(e, 'gallery')}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <span className="text-[14px] font-bold text-zinc-500">+</span>
                                  <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider text-center">Upload Files</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Segment 3: Specs and details */}
                          <div className="space-y-3">
                            <p className="text-[9px] tracking-widest text-zinc-400 font-display uppercase font-bold border-b border-zinc-100 pb-1.5">
                              3. EYEWEAR SPECIFICATIONS & STORIES
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">FRAME GEOMETRY</label>
                                <select
                                  value={formFrameShape}
                                  onChange={(e) => setFormFrameShape(e.target.value as any)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-2 py-2.5 cursor-pointer focus:bg-white font-medium"
                                >
                                  <option value="Aviator">Aviator</option>
                                  <option value="Wayfarer">Wayfarer</option>
                                  <option value="Round">Round</option>
                                  <option value="Cat-Eye">Cat-Eye</option>
                                  <option value="Square">Square</option>
                                  <option value="Browline">Browline</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">MATERIAL CONSTRUCT</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Pure Titanium"
                                  value={formMaterial}
                                  onChange={(e) => setFormMaterial(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">LENS OPTIC COLOR</label>
                                <input
                                  type="text"
                                  placeholder="e.g. G-15 Green"
                                  value={formLensColor}
                                  onChange={(e) => setFormLensColor(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">DEFAULT FRAME COLOR</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Glossy Tortoise"
                                  value={formFrameColor}
                                  onChange={(e) => setFormFrameColor(e.target.value)}
                                  className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[8px] tracking-widest text-zinc-500 uppercase font-bold mb-1">BOUTIQUE DESCRIPTION STORY</label>
                              <textarea
                                rows={3}
                                placeholder="Write the design story and lens material descriptions here..."
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                className="w-full bg-neutral-50 border border-zinc-200 text-xs px-3 py-2.5 focus:bg-white leading-relaxed resize-none"
                              />
                            </div>
                          </div>

                          {/* Segment 4: Colors variations (Crucial for Colours Option) */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
                              <p className="text-[9px] tracking-widest text-zinc-400 font-display uppercase font-bold">
                                4. COLOUR OPTIONS & MULTI-SKU
                              </p>
                              <button
                                type="button"
                                onClick={handleAddFormColor}
                                className="text-[9px] font-display font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer"
                              >
                                + ADD COLOR OPTION
                              </button>
                            </div>

                            <p className="text-[10px] text-zinc-400 italic">
                              Add all the specific color variations shown when the user views the product details.
                            </p>

                            <div className="space-y-3">
                              {formColors.map((color, idx) => (
                                <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-neutral-50 p-3.5 border border-zinc-200 rounded-xs relative">
                                  
                                  {/* Color Dot Preview */}
                                  <div className="w-8 h-8 rounded-full border border-zinc-300 shrink-0" style={{ backgroundColor: color.hex || '#000' }} />

                                  {/* Color name */}
                                  <div className="w-full sm:w-1/3">
                                    <label className="block text-[7px] text-zinc-400 uppercase font-bold mb-0.5">COLOR NAME</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Honey Tortoise"
                                      value={color.name}
                                      onChange={(e) => handleFormColorChange(idx, 'name', e.target.value)}
                                      className="w-full bg-white border border-zinc-200 text-[11px] px-2 py-1.5 focus:border-black"
                                    />
                                  </div>

                                  {/* Hex Value */}
                                  <div className="w-24">
                                    <label className="block text-[7px] text-zinc-400 uppercase font-bold mb-0.5">HEX CODE</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. #D4AF37"
                                      value={color.hex}
                                      onChange={(e) => handleFormColorChange(idx, 'hex', e.target.value)}
                                      className="w-full bg-white border border-zinc-200 text-[11px] px-2 py-1.5 focus:border-black font-mono"
                                    />
                                  </div>

                                  {/* Custom image for this color */}
                                  <div className="flex-1 space-y-1">
                                    <label className="block text-[7px] text-zinc-400 uppercase font-bold mb-0.5">COLOR PHOTO SOURCE</label>
                                    <input
                                      type="text"
                                      placeholder="URL or Upload File..."
                                      value={color.image}
                                      onChange={(e) => handleFormColorChange(idx, 'image', e.target.value)}
                                      className="w-full bg-white border border-zinc-200 text-[10px] px-2 py-1 focus:border-black font-mono text-[9px]"
                                    />
                                    <div className="flex items-center justify-center border border-dashed border-zinc-200 bg-white hover:bg-neutral-50 py-1 px-2.5 rounded-xs transition-colors relative cursor-pointer group">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBase64Upload(e, { colorIndex: idx })}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                      />
                                      <span className="text-[8px] font-sans font-bold text-zinc-400 group-hover:text-black">
                                        {color.image.startsWith('data:image/') ? '✓ Uploaded' : '↑ Custom File'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Trash trigger */}
                                  {formColors.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveFormColor(idx)}
                                      className="p-1.5 text-zinc-400 hover:text-red-600 self-end border border-neutral-200 hover:border-red-200 bg-white"
                                      title="Delete variation"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Drawer Footer Actions */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                          <button
                            type="submit"
                            className="flex-1 bg-black hover:bg-neutral-900 text-white py-3.5 font-display text-xs tracking-widest font-bold uppercase transition-colors cursor-pointer"
                          >
                            {editingProduct ? 'APPLY ATELIER EDITS' : 'UPLOAD NEW SILHOUETTE'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="bg-white border border-gray-200 hover:border-black text-gray-500 hover:text-black px-6 font-display text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>

                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CUSTOMER DIRECTORY */}
        {/* ========================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3 flex justify-between items-baseline">
              <h2 className="font-serif text-lg tracking-wide uppercase text-gray-900 font-bold">CLIENT DIRECTORY & CONTROLS</h2>
              <span className="text-[10px] font-sans font-semibold text-zinc-400">{customers.length} total clients</span>
            </div>

            {customers.length === 0 ? (
              <div className="bg-white p-12 text-center border border-gray-200 rounded-sm">
                <Users className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-zinc-500 font-sans text-xs">No registered customer logs found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((c) => (
                  <div key={c.id} className="bg-white border border-gray-100 rounded-xs p-5 shadow-xs font-sans space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-950 text-sm leading-tight">{c.name}</p>
                          {c.canBeManaged && (
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider ${c.isBlocked ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                              {c.isBlocked ? 'Blocked' : 'Active'}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono">{c.email}</p>
                      </div>
                      <span className="bg-neutral-50 text-zinc-500 font-mono text-[9px] font-semibold px-2 py-0.5 border border-zinc-100 rounded-xs">
                        {c.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4 text-xs">
                      <div>
                        <p className="text-zinc-400 uppercase font-semibold text-[8px] tracking-wider mb-0.5">TOTAL VALUATION</p>
                        <p className="text-black font-bold font-mono">PKR {c.totalSpent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 uppercase font-semibold text-[8px] tracking-wider mb-0.5">PURCHASES</p>
                        <p className="text-black font-bold font-mono">{c.ordersCount} orders</p>
                      </div>
                    </div>

                    {c.canBeManaged && c.uid && (
                      <div className="border-t border-neutral-100 pt-3 flex gap-2 justify-end">
                        <button
                          onClick={() => handleBlockUserToggle(c.uid!, c.isBlocked)}
                          className={`text-[9px] font-bold px-2 py-1.5 border flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer ${
                            c.isBlocked 
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100' 
                              : 'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100'
                          }`}
                        >
                          <Ban className="w-3 h-3" />
                          {c.isBlocked ? 'Unblock' : 'Block User'}
                        </button>
                        <button
                          onClick={() => handleRemoveUser(c.uid!, c.email)}
                          className="bg-red-50 border border-red-100 text-red-800 hover:bg-red-100 text-[9px] font-bold px-2 py-1.5 flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
