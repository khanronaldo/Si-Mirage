import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import { eq, and, desc, sql } from "drizzle-orm";

// Load Environment Variables
dotenv.config();

import { db } from "./src/db/index.ts";
import { users, products, cart, orders } from "./src/db/schema.ts";
import { seedProducts } from "./src/db/seed.ts";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Run DB seeder on server startup
async function initDatabase() {
  try {
    // Run direct SQL table migrations for new columns if they do not exist
    console.log("[Si-Mirage DB Migration] Checking and altering tables for quantity, contact_number, password, and is_blocked...");
    await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 100;`);
    await db.execute(sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_number TEXT;`);
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;`);
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked TEXT DEFAULT 'false';`);
    console.log("[Si-Mirage DB Migration] Table columns synchronized successfully.");

    await seedProducts();
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Failed to initialize database during startup:", error);
  }
}
initDatabase();

// --- PUBLIC PRODUCTS ENDPOINTS ---

// Fetch all products (with optional brand filtering)
app.get("/api/products", async (req, res) => {
  try {
    const brandId = req.query.brandId as string;
    let results;
    if (brandId) {
      results = await db.select().from(products).where(eq(products.brandId, brandId));
    } else {
      results = await db.select().from(products);
    }

    // Safely parse JSON properties
    const parsedProducts = results.map((p) => ({
      ...p,
      rating: parseFloat(p.rating || "4.5"),
      images: p.images ? JSON.parse(p.images) : [p.image],
      colors: p.colors ? JSON.parse(p.colors) : [],
      specs: p.specs ? JSON.parse(p.specs) : {},
      quantity: p.quantity !== null && p.quantity !== undefined ? p.quantity : 100,
    }));

    res.json(parsedProducts);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Create/List/Update a product (Admin product additions & edits)
app.post("/api/products", async (req, res) => {
  try {
    const {
      id,
      name,
      brandId,
      gender,
      category,
      price,
      originalPrice,
      tag,
      image,
      images,
      description,
      frameShape,
      material,
      lensColor,
      frameColor,
      colors,
      specs,
      quantity, // Admin quantity control
    } = req.body;

    if (!id || !name || !brandId || !price || !image) {
      return res.status(400).json({ error: "Missing required product fields (id, name, brandId, price, image)" });
    }

    const payload = {
      id,
      name,
      brandId,
      gender: gender || "Unisex",
      category: category || "Sunglasses",
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
      tag: tag || null,
      rating: "5.0",
      reviewsCount: 1,
      image,
      images: JSON.stringify(images || [image]),
      description: description || `Sophisticated styling meets supreme craftsmanship with the new ${name}.`,
      frameShape: frameShape || "Aviator",
      material: material || "Acetate",
      lensColor: lensColor || "Gray",
      frameColor: frameColor || "Gold",
      colors: JSON.stringify(colors || [{ name: frameColor || "Gold", hex: "#D4AF37", image }]),
      specs: JSON.stringify(
        specs || {
          frameShape: frameShape || "Aviator",
          frameColor: frameColor || "Gold",
          frameMaterial: material || "Acetate",
          templeColor: frameColor || "Gold",
          lensColor: lensColor || "Gray",
          treatment: "UV400 Protection",
          lensCategory: "3N",
          dimensions: { size: "52-18 mm", lensHeight: "44 mm", templeLength: "145 mm" },
        }
      ),
      quantity: quantity !== undefined ? parseInt(quantity, 10) : 100,
    };

    await db.insert(products).values(payload).onConflictDoUpdate({
      target: products.id,
      set: payload,
    });

    res.status(201).json({ success: true, message: "Product listed/updated successfully", id });
  } catch (error: any) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to list product" });
  }
});

// Delete a product from database (Admin action)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing product id parameter" });
    }
    await db.delete(products).where(eq(products.id, id));
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});


// --- USER SYNC & PROFILE ---

// --- USER REGISTER, LOGIN, & PROFILE SYNC ---

// Register local account
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required registration fields (email, password, name)" });
    }

    const emailLower = email.toLowerCase();

    // Check if user already exists
    const existing = await db.select().from(users).where(eq(users.email, emailLower));
    if (existing.length > 0) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const uid = "usr_" + Math.random().toString(36).substring(2, 11);
    const newUser = {
      uid,
      email: emailLower,
      name,
      password,
      isBlocked: 'false',
    };

    const insertedUser = await db.insert(users).values(newUser).returning();
    const userResult = insertedUser[0] || newUser;

    // Generate mock token
    const tokenPayload = { uid: userResult.uid, email: userResult.email, name: userResult.name };
    const mockToken = "mock_token_" + Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    res.json({
      success: true,
      token: mockToken,
      user: {
        uid: userResult.uid,
        email: userResult.email,
        name: userResult.name,
      }
    });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user account." });
  }
});

// Login local account
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password." });
    }

    const emailLower = email.toLowerCase();
    const existing = await db.select().from(users).where(eq(users.email, emailLower));

    if (existing.length === 0) {
      return res.status(401).json({ error: "Account not found. Please register first." });
    }

    const userRecord = existing[0];
    if (userRecord.isBlocked === 'true') {
      return res.status(403).json({ error: "Access Denied: This account has been blocked by the administrator." });
    }

    // Since users may have registered via Google (no local password), guide them
    if (!userRecord.password) {
      return res.status(401).json({ error: "This account was registered using Google. Please continue with Google." });
    }

    if (userRecord.password !== password) {
      return res.status(401).json({ error: "Invalid password. Access denied." });
    }

    // Generate mock token
    const tokenPayload = { uid: userRecord.uid, email: userRecord.email, name: userRecord.name };
    const mockToken = "mock_token_" + Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    res.json({
      success: true,
      token: mockToken,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.name,
      }
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to authenticate." });
  }
});

// Sync user account profile on authentication (Google / popup logins)
app.post("/api/users/sync", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || "";
    const name = req.body.name || email.split("@")[0];

    if (!uid) {
      return res.status(400).json({ error: "Invalid user authentication data" });
    }

    // Check if the email or uid is blocked
    const existing = await db.select().from(users).where(eq(users.uid, uid));
    if (existing.length > 0 && existing[0].isBlocked === 'true') {
      return res.status(403).json({ error: "Access Denied: This account has been blocked by the administrator." });
    }

    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        name,
        isBlocked: 'false',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          name,
        },
      })
      .returning();

    res.json({ success: true, user: result[0] });
  } catch (error: any) {
    console.error("Error syncing user profile:", error);
    res.status(500).json({ error: "Failed to sync user profile" });
  }
});

// Fetch current user details and verify block status
app.get("/api/users/me", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userResult = await db.select().from(users).where(eq(users.uid, uid));
    if (userResult.length === 0) {
      return res.status(404).json({ error: "User profile not found in database." });
    }

    const u = userResult[0];
    if (u.isBlocked === 'true') {
      return res.status(403).json({ error: "Access Denied: This account has been blocked by the administrator." });
    }

    res.json({
      uid: u.uid,
      email: u.email,
      name: u.name,
      isBlocked: false,
    });
  } catch (error: any) {
    console.error("Error fetching current user profile:", error);
    res.status(500).json({ error: "Failed to load current user profile." });
  }
});


// --- CART DATABASE OPERATIONS ---

// Get cart items from DB for the authenticated user
app.get("/api/cart", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    // Fetch user's cart from DB
    const results = await db.select().from(cart).where(eq(cart.userId, uid));

    // For each cart item, fetch its corresponding product
    const cartWithProducts = await Promise.all(
      results.map(async (item) => {
        const prodResult = await db.select().from(products).where(eq(products.id, item.productId));
        const p = prodResult[0];
        if (!p) return null;

        const parsedProduct = {
          ...p,
          rating: parseFloat(p.rating || "4.5"),
          images: p.images ? JSON.parse(p.images) : [p.image],
          colors: p.colors ? JSON.parse(p.colors) : [],
          specs: p.specs ? JSON.parse(p.specs) : {},
        };

        return {
          id: item.id,
          productId: item.productId,
          product: parsedProduct,
          quantity: item.quantity,
          selectedColor: JSON.parse(item.selectedColor),
        };
      })
    );

    res.json(cartWithProducts.filter(Boolean));
  } catch (error: any) {
    console.error("Error fetching cart from database:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add or update an item in the user's cart in the DB
app.post("/api/cart", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { productId, quantity, selectedColor } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    if (!productId || !selectedColor) {
      return res.status(400).json({ error: "Missing productId or selectedColor" });
    }

    // Check if item with this product and color already exists in user's cart
    const serializedColor = JSON.stringify(selectedColor);
    
    // Find matching items in local js memory to verify
    const existing = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, uid), eq(cart.productId, productId)));

    const match = existing.find((item) => {
      try {
        const itemColor = JSON.parse(item.selectedColor);
        return itemColor.name === selectedColor.name;
      } catch {
        return false;
      }
    });

    if (match) {
      // Update quantity
      const newQty = match.quantity + (quantity || 1);
      await db.update(cart).set({ quantity: newQty }).where(eq(cart.id, match.id));
      res.json({ success: true, message: "Cart quantity updated" });
    } else {
      // Insert new item
      await db.insert(cart).values({
        userId: uid,
        productId,
        quantity: quantity || 1,
        selectedColor: serializedColor,
      });
      res.status(210).json({ success: true, message: "Added item to cart database" });
    }
  } catch (error: any) {
    console.error("Error adding to cart in database:", error);
    res.status(500).json({ error: "Failed to modify cart in DB" });
  }
});

// Update exact cart item quantity
app.put("/api/cart/quantity", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { productId, colorName, quantity } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    // Fetch all user cart items for this product
    const items = await db.select().from(cart).where(and(eq(cart.userId, uid), eq(cart.productId, productId)));
    const targetItem = items.find((item) => {
      try {
        return JSON.parse(item.selectedColor).name === colorName;
      } catch {
        return false;
      }
    });

    if (!targetItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (quantity <= 0) {
      await db.delete(cart).where(eq(cart.id, targetItem.id));
      res.json({ success: true, message: "Cart item deleted from DB" });
    } else {
      await db.update(cart).set({ quantity }).where(eq(cart.id, targetItem.id));
      res.json({ success: true, message: "Cart item quantity updated in DB" });
    }
  } catch (error: any) {
    console.error("Error updating cart quantity in DB:", error);
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
});

// Remove a specific cart item from DB
app.delete("/api/cart/item", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { productId, colorName } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const items = await db.select().from(cart).where(and(eq(cart.userId, uid), eq(cart.productId, productId)));
    const targetItem = items.find((item) => {
      try {
        return JSON.parse(item.selectedColor).name === colorName;
      } catch {
        return false;
      }
    });

    if (targetItem) {
      await db.delete(cart).where(eq(cart.id, targetItem.id));
    }

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error: any) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});

// Clear entire user cart
app.delete("/api/cart/clear", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    await db.delete(cart).where(eq(cart.userId, uid));
    res.json({ success: true, message: "Cart cleared" });
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});


// --- ORDER ENDPOINTS ---

// Place a new Order (Public checkout, supports guests & logged-in users)
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, customerName, customerEmail, total, items, shippingAddress, contactNumber } = req.body;

    if (!customerName || !customerEmail || !total || !items) {
      return res.status(400).json({ error: "Missing order information" });
    }

    const orderId = `SM-${Math.floor(1000 + Math.random() * 9000)}`;
    
    await db.insert(orders).values({
      id: orderId,
      userId: userId || null,
      customerName,
      customerEmail,
      total: parseInt(total, 10),
      status: "Pending",
      items: JSON.stringify(items),
      shippingAddress: shippingAddress || null,
      contactNumber: contactNumber || null,
    });

    // If order was placed by an authenticated user, clear their cart in DB
    if (userId) {
      try {
        await db.delete(cart).where(eq(cart.userId, userId));
      } catch (err) {
        console.error("Failed to auto-clear DB cart on purchase:", err);
      }
    }

    res.status(201).json({ success: true, orderId, message: "Order placed successfully" });
  } catch (error: any) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Retrieve orders for the authenticated user
app.get("/api/orders", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const results = await db.select().from(orders).where(eq(orders.userId, uid)).orderBy(desc(orders.createdAt));
    
    const parsedOrders = results.map((o) => ({
      ...o,
      items: JSON.parse(o.items),
    }));

    res.json(parsedOrders);
  } catch (error: any) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});


// --- ADMINISTRATIVE BACKEND SERVICES ---

// Fetch all orders in the entire system (for Admin Dashboard)
app.get("/api/admin/orders", async (req, res) => {
  try {
    const results = await db.select().from(orders).orderBy(desc(orders.createdAt));
    const parsedOrders = results.map((o) => ({
      ...o,
      items: JSON.parse(o.items),
    }));
    res.json(parsedOrders);
  } catch (error: any) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update status of any order (for Admin Dashboard controls)
app.put("/api/admin/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Missing new status" });
    }

    await db.update(orders).set({ status }).where(eq(orders.id, id));
    res.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// Fetch all customers linked by unique email metrics and registered users
app.get("/api/admin/customers", async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    const allOrders = await db.select().from(orders);

    const customersMap: Record<string, { id: string; uid?: string; name: string; email: string; ordersCount: number; totalSpent: number; isBlocked: boolean; canBeManaged: boolean }> = {};

    // 1. First, populate all registered users
    allUsers.forEach((u, idx) => {
      const emailLower = u.email.toLowerCase();
      customersMap[emailLower] = {
        id: `U-0${idx + 1}`,
        uid: u.uid,
        name: u.name || emailLower.split('@')[0],
        email: u.email,
        ordersCount: 0,
        totalSpent: 0,
        isBlocked: u.isBlocked === 'true',
        canBeManaged: true,
      };
    });

    // 2. Aggregate orders data
    allOrders.forEach((o) => {
      const emailLower = o.customerEmail.toLowerCase();
      if (!customersMap[emailLower]) {
        // This is a guest buyer who hasn't registered an account yet
        const guestIdx = Object.keys(customersMap).length + 1;
        customersMap[emailLower] = {
          id: `G-0${guestIdx}`,
          name: o.customerName,
          email: o.customerEmail,
          ordersCount: 0,
          totalSpent: 0,
          isBlocked: false,
          canBeManaged: false,
        };
      }
      customersMap[emailLower].ordersCount += 1;
      customersMap[emailLower].totalSpent += o.total;
    });

    const customersList = Object.values(customersMap);
    res.json(customersList);
  } catch (error: any) {
    console.error("Error compiling customer analytics:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Block or Unblock a user (Admin control)
app.put("/api/admin/users/:uid/block", async (req, res) => {
  try {
    const { uid } = req.params;
    const { isBlocked } = req.body; // boolean

    await db
      .update(users)
      .set({ isBlocked: isBlocked ? "true" : "false" })
      .where(eq(users.uid, uid));

    res.json({ success: true, message: `User block status updated to ${isBlocked}` });
  } catch (error: any) {
    console.error("Error blocking user:", error);
    res.status(500).json({ error: "Failed to update user block status" });
  }
});

// Remove a user completely from the database (DELETE) (Admin control)
app.delete("/api/admin/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    await db.delete(users).where(eq(users.uid, uid));
    res.json({ success: true, message: "User removed successfully from database" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to remove user account" });
  }
});


// --- VITE MIDDLEWARE & STATIC ASSETS HANDLER ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Si-Mirage Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
