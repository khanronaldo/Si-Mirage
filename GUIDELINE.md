# Luxury Atelier Eyewear - Customization Guideline

This document guides you on how to easily modify and update brands, products, and links throughout the application.

---

## 📂 Data Locations & Schema

The core application data is stored under `/src/data/`.

### 1. Modifying Brands
File Path: `/src/data/brands.ts`
- To add a new brand or edit existing brand details, simply modify the `BRANDS` array.
- Structure of a `Brand` item:
```typescript
{
  id: string;       // Unique lowercase identifier (e.g., 'gentle-monster')
  name: string;     // Display name (e.g., 'Gentle Monster')
  origin: string;   // Country or city of origin (e.g., 'Seoul, South Korea')
  est: number;      // Established year (e.g., 2011)
  story: string;    // Short history or brand identity text
}
```

### 2. Modifying Products
File Path: `/src/data/products.ts`
- Products are generated programmatically to ensure a perfectly optimized, buttery-smooth experience across all low-end mobile devices and cheap laptops.
- To change product names, simply edit the `BRAND_PRODUCT_NAMES` dictionary:
```typescript
const BRAND_PRODUCT_NAMES: Record<string, string[]> = {
  'gentle-monster': [
    'Spectre-X 01', 'Eclipse Bold', ... // Exactly 10 names
  ],
  ...
}
```
- Custom pricing algorithms, images, and lens descriptions are also configured programmatically in `generateProducts()`.
- If you wish to hardcode custom static details for any product, you can modify the `generateProducts` loop or append custom product objects directly to the list before exporting it!

---

## 🎨 Layout & Typography Customization

- **Fonts**: The application uses Google Fonts (**Playfair Display** for high-fashion luxury headings, and **Montserrat** for clean, legible sans-serif labels and descriptions).
- **Theme Color**: The signature high-fashion red color is `#FF2800`.
- **Spacing**: Header spacing and layout alignment utilize standard Tailwind values (`pt-44` and padding rows) to ensure content never overlaps with the sticky navigation header.
