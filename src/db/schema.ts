import { pgTable, serial, text, integer, timestamp, numeric } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  password: text('password'), // Plain text password for local users (simple auth)
  isBlocked: text('is_blocked').default('false'), // 'true' or 'false'
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  brandId: text('brand_id').notNull(),
  gender: text('gender').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  tag: text('tag'),
  rating: numeric('rating').default('4.5'),
  reviewsCount: integer('reviews_count').default(0),
  image: text('image').notNull(),
  images: text('images'), // JSON serialized array
  description: text('description').notNull(),
  frameShape: text('frame_shape').notNull(),
  material: text('material').notNull(),
  lensColor: text('lens_color').notNull(),
  frameColor: text('frame_color').notNull(),
  colors: text('colors'), // JSON serialized colors: { name, hex, image }[]
  specs: text('specs'), // JSON serialized specs object
  quantity: integer('quantity').default(100), // product quantity / stock level
  createdAt: timestamp('created_at').defaultNow(),
});

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.uid, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
  selectedColor: text('selected_color').notNull(), // JSON serialized: { name, hex, image }
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id'), // Firebase UID if logged in, null if guest
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  total: integer('total').notNull(),
  status: text('status').notNull().default('Pending'), // Pending, Shipped, Delivered, Cancelled
  items: text('items').notNull(), // JSON serialized: { productName, quantity, price }[]
  shippingAddress: text('shipping_address'),
  contactNumber: text('contact_number'),
  createdAt: timestamp('created_at').defaultNow(),
});
