import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Customer } from '../types';
import { auth, googleAuthProvider } from '../lib/firebase.ts';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'collections'
  | 'new-arrivals'
  | 'best-sellers'
  | 'pdp'
  | 'warranty'
  | 'faq'
  | 'contact'
  | 'shipping'
  | 'terms'
  | 'privacy'
  | 'brand'
  | 'heritage'
  | 'admin-login'
  | 'admin';

interface ShopContextType {
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, colorIndex?: number) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  updateCartQuantity: (productId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;

  // Wishlist State
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  showSavedOnly: boolean;
  setShowSavedOnly: (show: boolean) => void;

  // Search State
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth State
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  user: { name: string; email: string; uid?: string } | null;
  login: (email?: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // Admin Dashboard State
  orders: Order[];
  customers: Customer[];
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  addMockOrder: (customerName: string, email: string, items: { productName: string; quantity: number; price: number }[], shippingAddress?: string, contactNumber?: string) => Promise<void>;
  
  // Product CRUD
  addProduct: (product: any) => Promise<boolean>;
  updateProduct: (product: any) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Refresh functions for updates
  refreshProducts: () => Promise<void>;
  refreshAdminData: () => Promise<void>;
  products: Product[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // Products list from DB (seeded or custom)
  const [products, setProducts] = useState<Product[]>([]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('sm_cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem('sm_wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart Drawer open/close state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auth & Token
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; uid?: string } | null>(() => {
    const stored = localStorage.getItem('sm_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('sm_token');
  });

  // Admin Dashboard State
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Fetch all products from DB on load
  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Fetch Cart from DB when token changes
  const fetchDBCart = async (authToken: string) => {
    try {
      const res = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Map db cart rows to CartItem type
        const mapped: CartItem[] = data.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
          selectedColor: item.selectedColor
        }));
        setCart(mapped);
      }
    } catch (err) {
      console.error('Error loading DB cart:', err);
    }
  };

  // Sync Wishlist to local storage
  useEffect(() => {
    localStorage.setItem('sm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Auth observer
  useEffect(() => {
    const checkAndRestoreLocalSession = async (currentToken: string) => {
      const storedUser = localStorage.getItem('sm_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        try {
          // Check if this local user is blocked
          const checkRes = await fetch('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${currentToken}`
            }
          });
          if (checkRes.status === 403) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('sm_token');
            localStorage.removeItem('sm_user');
            alert("Access Denied: This account has been blocked by the administrator.");
            return;
          }
        } catch (e) {
          console.error("Error checking blocked status on mount:", e);
        }
        setUser(parsedUser);
        setToken(currentToken);
        await fetchDBCart(currentToken);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
        const email = firebaseUser.email || '';
        const uid = firebaseUser.uid;
        
        setUser({ name, email, uid });
        
        try {
          const t = await firebaseUser.getIdToken();

          // Synchronize profile to PostgreSQL
          const syncRes = await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${t}`
            },
            body: JSON.stringify({ name })
          });

          if (syncRes.status === 403) {
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.removeItem('sm_token');
            localStorage.removeItem('sm_user');
            alert("Access Denied: This account has been blocked by the administrator.");
            return;
          }

          setToken(t);
          localStorage.setItem('sm_token', t);
          localStorage.setItem('sm_user', JSON.stringify({ name, email, uid }));

          // Fetch user cart from Postgres
          await fetchDBCart(t);
        } catch (err) {
          console.error('Error syncing authenticated user state:', err);
        }
      } else {
        // If Firebase is null but we have a mock token in localStorage, do NOT log them out!
        const currentToken = localStorage.getItem('sm_token');
        if (currentToken && currentToken.startsWith('mock_token_')) {
          await checkAndRestoreLocalSession(currentToken);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('sm_token');
          localStorage.removeItem('sm_user');
          // Fallback to local cart
          const stored = localStorage.getItem('sm_cart');
          setCart(stored ? JSON.parse(stored) : []);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync local cart to storage only if guest
  useEffect(() => {
    if (!user) {
      localStorage.setItem('sm_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Fetch admin dashboard info (orders, customers)
  const refreshAdminData = async () => {
    try {
      const ordRes = await fetch('/api/admin/orders');
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setOrders(ordData);
      }

      const custRes = await fetch('/api/admin/customers');
      if (custRes.ok) {
        const custData = await custRes.json();
        setCustomers(custData);
      }
    } catch (err) {
      console.error('Error loading admin records:', err);
    }
  };

  useEffect(() => {
    refreshAdminData();
  }, [activePage]);

  // Cart Operations
  const addToCart = async (product: Product, quantity = 1, colorIndex = 0) => {
    const color = product.colors[colorIndex] || product.colors[0] || { name: product.frameColor, hex: '#000000', image: product.image };
    
    if (user && token) {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
            selectedColor: color
          })
        });
        await fetchDBCart(token);
      } catch (err) {
        console.error('Error adding to database cart:', err);
      }
    } else {
      // Local Storage Cart logic for guests
      setCart((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.product.id === product.id && item.selectedColor.name === color.name
        );

        if (existingIdx > -1) {
          const next = [...prev];
          next[existingIdx].quantity += quantity;
          return next;
        }

        return [...prev, { product, quantity, selectedColor: color }];
      });
    }

    setIsCartOpen(true);
  };

  const removeFromCart = async (productId: string, colorName: string) => {
    if (user && token) {
      try {
        await fetch('/api/cart/item', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, colorName })
        });
        await fetchDBCart(token);
      } catch (err) {
        console.error('Error removing from DB cart:', err);
      }
    } else {
      setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedColor.name === colorName)));
    }
  };

  const updateCartQuantity = async (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId, colorName);
      return;
    }

    if (user && token) {
      try {
        await fetch('/api/cart/quantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, colorName, quantity })
        });
        await fetchDBCart(token);
      } catch (err) {
        console.error('Error updating DB cart quantity:', err);
      }
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.selectedColor.name === colorName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user && token) {
      try {
        await fetch('/api/cart/clear', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        await fetchDBCart(token);
      } catch (err) {
        console.error('Error clearing DB cart:', err);
      }
    } else {
      setCart([]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Handlers
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Auth Handlers
  const login = async (customEmail?: string, customPassword?: string) => {
    if (customEmail && customPassword) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: customEmail, password: customPassword })
        });
        
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('sm_token', data.token);
        localStorage.setItem('sm_user', JSON.stringify(data.user));
        await fetchDBCart(data.token);
        setIsAuthOpen(false);
      } catch (err: any) {
        console.error('Login error:', err);
        throw err;
      }
      return;
    }
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setIsAuthOpen(false);
    } catch (err: any) {
      console.error('Error signing in with Google:', err);
      const isApiKeyErr = err.message && (
        err.message.includes('api-key-not-valid') || 
        err.message.includes('invalid-api-key') || 
        err.message.includes('auth/api-key-not-valid') ||
        err.message.includes('auth/invalid-api-key') ||
        err.message.includes('apiKey')
      );
      if (isApiKeyErr || err.code === 'auth/api-key-not-valid' || err.code === 'auth/invalid-api-key') {
        console.warn('Falling back to simulated Google authentication due to unconfigured Firebase credentials.');
        const mockUid = "google_mock_user_123";
        const mockEmail = "ronaldolover203@gmail.com";
        const mockName = "Google Tester";
        
        const tokenPayload = { uid: mockUid, email: mockEmail, name: mockName };
        const jsonStr = JSON.stringify(tokenPayload);
        const encoded = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
        const mockToken = "mock_token_" + encoded;
        
        try {
          // Synchronize profile to PostgreSQL
          const syncRes = await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${mockToken}`
            },
            body: JSON.stringify({ name: mockName })
          });

          if (syncRes.status === 403) {
            alert("Access Denied: This account has been blocked by the administrator.");
            return;
          }

          setUser({ name: mockName, email: mockEmail, uid: mockUid });
          setToken(mockToken);
          localStorage.setItem('sm_token', mockToken);
          localStorage.setItem('sm_user', JSON.stringify({ name: mockName, email: mockEmail, uid: mockUid }));
          await fetchDBCart(mockToken);
          setIsAuthOpen(false);
        } catch (syncErr) {
          console.error("Error syncing custom Google login session:", syncErr);
        }
        return;
      }
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('sm_token', data.token);
      localStorage.setItem('sm_user', JSON.stringify(data.user));
      await fetchDBCart(data.token);
      setIsAuthOpen(false);
    } catch (err: any) {
      console.error('Registration error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('sm_token');
      localStorage.removeItem('sm_user');
      setCart([]);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Admin Dashboard handlers
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await refreshAdminData();
      }
    } catch (err) {
      console.error('Error updating status in DB:', err);
    }
  };

  const addMockOrder = async (customerName: string, email: string, items: { productName: string; quantity: number; price: number }[], shippingAddress?: string, contactNumber?: string) => {
    try {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user?.uid || null,
          customerName,
          customerEmail: email,
          total,
          items,
          shippingAddress,
          contactNumber: contactNumber || null
        })
      });
      await refreshAdminData();
    } catch (err) {
      console.error('Error adding order to DB:', err);
    }
  };

  const addProduct = async (productData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        await refreshProducts();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding product:', err);
      return false;
    }
  };

  const updateProduct = async (productData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        await refreshProducts();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating product:', err);
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await refreshProducts();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting product:', err);
      return false;
    }
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        selectedBrandId,
        setSelectedBrandId,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        showSavedOnly,
        setShowSavedOnly,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isAuthOpen,
        setIsAuthOpen,
        user,
        login,
        register,
        logout,
        orders,
        customers,
        updateOrderStatus,
        addMockOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        refreshAdminData,
        products,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
