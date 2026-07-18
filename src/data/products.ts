import { Product } from '../types';

// Unsplash premium luxury sunglasses and glasses image database
const IMAGES_POOL = [
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', // Golden Aviator
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80', // Elegant Retro Dark
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80', // Round Metal Blue
  'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80', // Amber Vintage Square
  'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80', // Avant-garde Dark Luxury
  'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80', // Modern Dark Sleek
  'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80', // High Fashion Crystal
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80', // Warm Summer Bronze
  'https://images.unsplash.com/photo-1502841790617-598298ed7a34?auto=format&fit=crop&w=800&q=80', // Minimal Gold Wire
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'  // Luxury Lifestyle Square
];

const FRAME_SHAPES: ('Aviator' | 'Wayfarer' | 'Round' | 'Cat-Eye' | 'Square' | 'Browline')[] = [
  'Aviator', 'Wayfarer', 'Round', 'Cat-Eye', 'Square', 'Browline'
];

const CATEGORIES: ('Sunglasses' | 'Eyeglasses' | 'Blue-Light' | 'Limited')[] = [
  'Sunglasses', 'Eyeglasses', 'Blue-Light', 'Limited'
];

const GENDERS: ('Male' | 'Female' | 'Unisex')[] = [
  'Unisex', 'Male', 'Female'
];

const TAGS: ('SALE' | 'NEW' | 'LIMITED' | 'BEST SELLER' | undefined)[] = [
  undefined, 'NEW', 'SALE', 'BEST SELLER', 'LIMITED', undefined, 'NEW', undefined, 'SALE', undefined
];

// Seed names for each brand to ensure 10 totally distinct and realistic products per brand!
const BRAND_PRODUCT_NAMES: Record<string, string[]> = {
  'gentle-monster': [
    'Spectre-X 01', 'Eclipse Bold', 'Lilit Acetate', 'My Ma Square', 'Her Oversized',
    'Lang Minimal', 'Dreamer Hope', 'Frida Gradient', 'Rick Hexagon', 'Tiga Acetate'
  ],
  'chanel': [
    'Coco Quilted', 'Matelassé Cat', 'Pearl Elegance', 'Gabrielle Round', 'Camélia Luxury',
    'Boy Chain Square', 'N°5 Special', 'Grand Shield', 'Chanel Signet', 'Mademoiselle Bow'
  ],
  'louis-vuitton': [
    'Cyclone Block', 'Damier Pilot', 'Millionaire Retro', 'Escale Runway', 'Attitude Metal',
    'Charlotte Fold', 'LV Link Sleek', 'Conspiration Pilote', 'My Fair Lady', 'Obsession Square'
  ],
  're': [
    'Regal Speed', 'RE-Carbon One', 'Phantom Carbon', 'Apex Shield', 'Elegance Elite',
    'Vector Aero', 'Crown Titanium', 'Noble Crest', 'RE-Aero 02', 'Imperator Sport'
  ],
  'celine': [
    'Triomphe Classic', 'Monochroms Chunky', 'Celine Edge', 'Catherine Cat', 'Bold 3 Dots',
    'Studded Square', 'D-Frame Minimal', 'Maillon Triomphe', 'Butterfly Glam', 'Classic Havana'
  ],
  'persol': [
    'Steve McQueen 714', 'Cellor Vintage', 'Typewriter Round', 'Persol Calligrapher', 'La Freccia',
    'Persol Gallerie', 'Metropolis Brow', 'Classic 649 Aviator', 'Roadster Aviator', 'Key West Metal'
  ],
  'cartier': [
    'Santos Aviator', 'Panthère Elegance', 'C-Décor Rimless', 'Trinity Round', 'Signet Classic',
    'Première de Cartier', 'Cartier Core', 'Cartier Tank', 'Pasha Shield', 'Louis Cartier Wire'
  ],
  'versace': [
    'Medusa Biggie', 'Baroque Edge', 'Versace Tribute', 'Greek Key Square', 'Rock Medusa',
    'Glam Aviator', 'Medusa Charm', 'Deco Stud', 'Manifesto Flat', 'Empire Shield'
  ],
  'carrera': [
    'Champion Racing', 'Carrera 1001', 'Glory Aviator', 'Carrera Grand', 'Flag Shield',
    'Speedway Retro', 'Hyperfit Flex', 'Carrera Pace', 'Endurance 01', 'Sprint Classic'
  ],
  'dior': [
    'DiorClub Shield', 'DiorSignature B1U', 'DiorBlackSuit', 'Wildior Square', 'DiorStellaire',
    'Sostellaire Butterfly', 'DiorOrigins Metal', 'Chrono Pilot', 'DiorPower Cat', 'Montaigne Blue'
  ],
  'burberry': [
    'Check Heritage', 'Lola Oversized', 'Burberry Thomas', 'Check Stripe Square', 'Blake Pilot',
    'Trench Trench Coat', 'British Tailor', 'Regent Street', 'Soho Square', 'Burberry Icon'
  ],
  'gucci': [
    'Interlocking G', 'Web Stripe Pilot', 'Oversized Injection', 'Horsebit Classic', 'Gucci GG0036S',
    'Flora Round', 'Hollywood Forever', 'Stripe Shield', 'Gucci Icon', 'Classic Square GG'
  ],
  'porsche': [
    'P8478 Interchangeable', 'P8685 Laser Cut', 'P8508 Pure Carbon', 'Porsche Aero', 'Monobloc Titan',
    'P8678 Folding Aviator', 'P8928 Hexagon', 'Flowing Titanium', 'Speedster Roadster', 'Heritage Pilot'
  ],
  'maybach': [
    'The King Gold', 'The Artist Horn', 'The Dynamic Carbon', 'The Duke Elite', 'The Empress',
    'The Peak Pilot', 'The Grand Diamond', 'The Legend Crest', 'The Noble Horn', 'The Sovereign'
  ],
  'ecs': [
    'Elite Minimal', 'Tokyo Craft 01', 'Surgical Steel Zero', 'ECS Hexa-Wire', 'ECS Horizon',
    'ECS Matrix', 'ECS Precision', 'Aero-Zenith', 'Sigma Ultralight', 'Kyoto Carbon'
  ],
  'rayban': [
    'Original Wayfarer', 'Classic Aviator 3025', 'Clubmaster Classic', 'Round Metal 3447', 'Erika Round',
    'Justin Rectangle', 'Hexagonal Flat', 'State Street', 'Nomad Square', 'Clubround Retro'
  ],
  'fendi': [
    'Fendi First', 'Baguette Elegance', 'Fendi Way Cat', 'FF Vertigo', 'Oversized FF Metal',
    'Fendi Roma Signature', 'Promenade Round', 'Fendi Karlography', 'Shadow Shield', 'FF Ribbons'
  ],
  'polarized': [
    'Ocean Mariner', 'Glacier Shield Polarized', 'Peak Reflection', 'Deck Captain', 'Ski Speedster',
    'Anti-Glare Cruiser', 'Venture Polarized', 'Deep Sea Pilot', 'Harbor Square', 'Alpine Polarized'
  ],
  'rayban-p': [
    'Wayfarer Premium Polarized', 'Aviator G-15 Polarized', 'Clubmaster Elite P', 'Justin Active Polarized', 'Hexagonal Gold P',
    'Erika High Contrast P', 'Chris Sport Polarized', 'New Wayfarer Matte P', 'Round Classic G15 P', 'Predator Sport Polarized'
  ],
  'porsche-light': [
    'Porsche Superlight 01', 'Porsche Beta-Ti Wire', 'Porsche Air-Titanium', 'Porsche Featherweight', 'Porsche Speed-Light',
    'Porsche Trackline P', 'Porsche Carbonlight', 'Porsche Aero-Wire', 'Porsche Zero-G', 'Porsche Lightway'
  ],
  'luoweite': [
    'Luoweite Sombra', 'Luoweite Sol', 'Luoweite Brisa', 'Luoweite Viento', 'Luoweite Luna',
    'Luoweite Arena', 'Luoweite Madera', 'Luoweite Classic', 'Luoweite Oro', 'Luoweite Fuego'
  ]
};

// Generates exactly 10 beautiful, diverse products for each of the 21 brands programmatically!
const generateProducts = (): Product[] => {
  const list: Product[] = [];
  const brandIds = Object.keys(BRAND_PRODUCT_NAMES);

  for (const bId of brandIds) {
    const names = BRAND_PRODUCT_NAMES[bId];
    for (let i = 0; i < 10; i++) {
      const name = names[i];
      const pId = `${bId}-prod-${i + 1}`;
      
      // Compute varying price structures based on brand rank
      let basePrice = 28000;
      if (['cartier', 'maybach', 'porsche', 'louis-vuitton', 'chanel'].includes(bId)) {
        basePrice = 45000 + (i * 4500); // Luxury pricing
      } else if (['rayban', 'polarized', 'rayban-p', 'carrera'].includes(bId)) {
        basePrice = 18000 + (i * 1200); // Standard pricing
      } else {
        basePrice = 28000 + (i * 2200); // Premium pricing
      }

      const price = basePrice;
      const originalPrice = i % 3 === 0 ? Math.round(price * 1.15 / 500) * 500 : undefined;
      const tag = TAGS[i];
      
      const imageIndex = (bId.charCodeAt(0) + bId.charCodeAt(bId.length - 1) + i) % IMAGES_POOL.length;
      const image = IMAGES_POOL[imageIndex];
      const images = [
        image,
        IMAGES_POOL[(imageIndex + 1) % IMAGES_POOL.length],
        IMAGES_POOL[(imageIndex + 2) % IMAGES_POOL.length]
      ];

      const shape = FRAME_SHAPES[(i + bId.length) % FRAME_SHAPES.length];
      const category = CATEGORIES[(i + 1) % CATEGORIES.length];
      const gender = GENDERS[(i + 2) % GENDERS.length];

      const rating = parseFloat((4.5 + ((i % 5) * 0.1) + ((bId.length % 3) * 0.05)).toFixed(1));
      const reviewsCount = 10 + (i * 7) + (bId.length * 3);

      const desc = `Indulge in unparalleled comfort and prestige with the ${name}. Handcrafted from premium grade components, this signature design merges sleek lines with high-performance protective optics. Defy glare and command the landscape.`;

      const frameColor = i % 2 === 0 ? 'Polished Gold' : 'Piano Gloss Black';
      const lensColor = i % 3 === 0 ? 'Obsidian Gray Polarized' : i % 3 === 1 ? 'Aurora Gold Gradient' : 'Indigo Slate Blue';

      const colors = [
        { name: 'Piano Gloss Black', hex: '#000000', image: images[0] },
        { name: 'Polished Gold', hex: '#D4AF37', image: images[1] },
        { name: 'Satin Silver', hex: '#C0C0C0', image: images[2] }
      ];

      list.push({
        id: pId,
        name,
        brandId: bId,
        gender,
        category,
        price,
        originalPrice,
        tag,
        rating,
        reviewsCount,
        image,
        images,
        description: desc,
        frameShape: shape,
        material: i % 2 === 0 ? 'Bio-Cellulose Italian Acetate' : 'Aerospace Grade Pure Titanium',
        lensColor,
        frameColor,
        colors,
        specs: {
          frameShape: shape,
          frameColor,
          frameMaterial: i % 2 === 0 ? 'Mazzucchelli Cellulose Acetate' : 'High-Tensile Pure Titanium',
          templeColor: i % 2 === 0 ? `${frameColor} Acetate` : 'Polished Metal Wire Core',
          lensColor,
          treatment: 'Double-sided Anti-scratch Anti-reflective UV400',
          lensCategory: '3N (High Protection)',
          dimensions: {
            size: `${50 + (i % 8)}-${18 + (i % 4)} mm`,
            lensHeight: `${42 + (i % 10)} mm`,
            templeLength: '145 mm'
          }
        }
      });
    }
  }

  return list;
};

export const PRODUCTS: Product[] = generateProducts();
