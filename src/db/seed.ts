import { db } from './index.ts';
import { products } from './schema.ts';
import { PRODUCTS } from '../data/products.ts';
import { count } from 'drizzle-orm';

export async function seedProducts() {
  try {
    const existingCountResult = await db.select({ value: count() }).from(products);
    const existingCount = existingCountResult[0]?.value || 0;
    
    if (existingCount > 0) {
      console.log('Products already seeded. Total:', existingCount);
      return;
    }

    console.log('Seeding products to Cloud SQL...');
    
    const valuesToInsert = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      brandId: p.brandId,
      gender: p.gender,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || null,
      tag: p.tag || null,
      rating: p.rating.toString(),
      reviewsCount: p.reviewsCount,
      image: p.image,
      images: JSON.stringify(p.images),
      description: p.description,
      frameShape: p.frameShape,
      material: p.material,
      lensColor: p.lensColor,
      frameColor: p.frameColor,
      colors: JSON.stringify(p.colors),
      specs: JSON.stringify(p.specs),
    }));

    // Insert in chunks to avoid single query limits
    const chunkSize = 50;
    for (let i = 0; i < valuesToInsert.length; i += chunkSize) {
      const chunk = valuesToInsert.slice(i, i + chunkSize);
      await db.insert(products).values(chunk);
    }
    
    console.log('Seeding finished successfully!');
  } catch (err) {
    console.error('Error seeding products:', err);
  }
}
