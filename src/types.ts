export interface Product {
  id: string;
  name: string;
  brandId: string; // e.g. 'cartier'
  gender: 'Male' | 'Female' | 'Unisex';
  category: 'Sunglasses' | 'Eyeglasses' | 'Blue-Light' | 'Limited';
  price: number;
  originalPrice?: number;
  tag?: 'SALE' | 'NEW' | 'LIMITED' | 'BEST SELLER';
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  frameShape: 'Aviator' | 'Wayfarer' | 'Round' | 'Cat-Eye' | 'Square' | 'Browline';
  material: string;
  lensColor: string;
  frameColor: string;
  colors: { name: string; hex: string; image: string }[];
  specs: {
    frameShape: string;
    frameColor: string;
    frameMaterial: string;
    templeColor: string;
    lensColor: string;
    treatment: string;
    lensCategory: string;
    dimensions: {
      size: string;
      lensHeight: string;
      templeLength: string;
    };
  };
  quantity?: number; // Stock / quantity of the product
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string; image: string };
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: { productName: string; quantity: number; price: number }[];
  shippingAddress?: string;
  contactNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  uid?: string;
  isBlocked?: boolean;
  canBeManaged?: boolean;
}
