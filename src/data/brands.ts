export interface Brand {
  id: string;
  name: string;
  origin: string;
  est: number;
  story: string;
}

export const BRANDS: Brand[] = [
  {
    id: 'gentle-monster',
    name: 'Gentle Monster',
    origin: 'Seoul, South Korea',
    est: 2011,
    story: 'Established in Seoul in 2011, Gentle Monster is a high-end luxury fashion eyewear brand famed for its radical, experimental shapes, avant-garde styling, and theatrical showroom experiences.'
  },
  {
    id: 'chanel',
    name: 'Chanel',
    origin: 'Paris, France',
    est: 1910,
    story: 'Undeniably feminine and classic. Chanel eyewear incorporates iconic brand details including quilted acetate, interwoven leather chains, CC logo medallions, and delicate glass pearls, handcrafted in northern Italy.'
  },
  {
    id: 'louis-vuitton',
    name: 'Louis Vuitton',
    origin: 'Paris, France',
    est: 1854,
    story: 'Rooted in the spirit of luxury travel, Louis Vuitton eyewear is characterized by modern architectural shapes, handcrafted bio-acetate, and delicate engravings of the legendary Monogram flowers and Damier canvas accents.'
  },
  {
    id: 're',
    name: 'RE',
    origin: 'Milan, Italy',
    est: 2020,
    story: 'RE (Regal Elegance) represents modern Italian high-performance sports-luxe design, focusing on lightweight carbon-fiber hinges, aerodynamic contours, and shatterproof photochromic glass.'
  },
  {
    id: 'celine',
    name: 'Celine',
    origin: 'Paris, France',
    est: 1945,
    story: 'Representing French neo-bourgeois style, Celine eyewear is famous for its thick, premium hand-polished acetate, iconic chunky square profiles, and classic triple-dot rivets, radiating an effortless, casual glamour.'
  },
  {
    id: 'persol',
    name: 'Persol',
    origin: 'Turin, Italy',
    est: 1917,
    story: 'Established in Turin in 1917, Persol is a legendary brand known for the Meflecto flexible stem system, the iconic silver arrow hinge, and its association with timeless silver-screen cinematic icons.'
  },
  {
    id: 'cartier',
    name: 'Cartier',
    origin: 'Paris, France',
    est: 1847,
    story: 'Established in Paris in 1847, Cartier is regarded as one of the most prestigious luxury brands in the world. Its eyewear collection represents the pinnacle of jewelry-making craftsmanship, featuring signature details like the C de Cartier, Panthère motifs, and 24-karat gold-plated finishes.'
  },
  {
    id: 'versace',
    name: 'Versace',
    origin: 'Milan, Italy',
    est: 1978,
    story: 'Unapologetically opulent and glamorous. Versace eyewear is a celebration of high-contrast gold, featuring the iconic 3D Medusa Head medallion, baroque scrollwork, and thick, striking acetate temples.'
  },
  {
    id: 'carrera',
    name: 'Carrera',
    origin: 'Vienna, Austria',
    est: 1956,
    story: 'Born from racing heritage in 1956, Carrera eyewear represents daring lifestyle, sporty aesthetics, and innovative material technology like Optyl, designed for adventurers and racers.'
  },
  {
    id: 'dior',
    name: 'Dior',
    origin: 'Paris, France',
    est: 1946,
    story: 'A legendary name in haute couture. Dior eyewear blends structured metallic elegance with sophisticated vintage silhouettes, using premium materials like lightweight optyl and precious metal finishes.'
  },
  {
    id: 'burberry',
    name: 'Burberry',
    origin: 'London, UK',
    est: 1856,
    story: 'Blending traditional British tailoring with modern London street style. Burberry eyewear features classic structures highlighted by the world-famous Vintage House Check tartan printed on the inner temples.'
  },
  {
    id: 'gucci',
    name: 'Gucci',
    origin: 'Florence, Italy',
    est: 1921,
    story: 'Founded in Florence in 1921, Gucci is a global icon of eclectic, bold Italian high fashion. Its eyewear designs seamlessly merge historical codes—like the horsebit, interlocking G, and classic web stripes—with contemporary, oversized silhouettes.'
  },
  {
    id: 'porsche',
    name: 'Porsche',
    origin: 'Stuttgart, Germany',
    est: 1972,
    story: 'Porsche Design eyewear represents German engineering excellence. Renowned for titanium aviators, interchangeable lenses, and sleek industrial designs that focus on absolute utility and premium luxury.'
  },
  {
    id: 'maybach',
    name: 'Maybach',
    origin: 'Stuttgart, Germany',
    est: 1909,
    story: 'The absolute pinnacle of automotive luxury translated into eyewear. Hand-sculpted in Germany using precious metals like 18k gold, platinum, fine wood inlays, and genuine water buffalo horn.'
  },
  {
    id: 'ecs',
    name: 'ECS',
    origin: 'Tokyo, Japan',
    est: 2018,
    story: 'ECS (Elite Craft Studio) is a Japanese minimalist brand emphasizing pure surgical stainless steel, screwless hinges, and ultra-high transition lenses engineered in Tokyo.'
  },
  {
    id: 'rayban',
    name: 'Rayban',
    origin: 'Rochester, USA',
    est: 1937,
    story: 'The undisputed pioneer of pop-culture eyewear. Ray-Ban has defined classic shapes since 1937, with the legendary Wayfarer, Aviator, and Clubmaster styles gracing history.'
  },
  {
    id: 'fendi',
    name: 'Fendi',
    origin: 'Rome, Italy',
    est: 1925,
    story: 'A playful Roman jeweler of high fashion. Fendi eyewear showcases bold geometric shapes, micro-engraved FF logos, and eccentric lens prints that capture the brand’s vibrant, luxurious, and artistic essence.'
  },
  {
    id: 'polarized',
    name: 'Polarized',
    origin: 'Geneva, Switzerland',
    est: 2015,
    story: 'Polarized is a specialized Swiss performance brand dedicated to advanced anti-glare technology, ocean-grade anti-salt lens coatings, and robust composite frames for sailors and skiers.'
  },
  {
    id: 'rayban-p',
    name: 'Rayban-P',
    origin: 'Rochester, USA',
    est: 1940,
    story: 'Rayban-P (Premium Polarized) is the professional grade line from Ray-Ban, incorporating their signature G-15 glass polarized lenses, high-contrast tints, and heavy-duty frame reinforcement.'
  },
  {
    id: 'porsche-light',
    name: 'Porsche-light',
    origin: 'Stuttgart, Germany',
    est: 1995,
    story: 'The ultra-lightweight luxury racing division of Porsche Design. Each frame weighs less than 8 grams, crafted with beta-titanium wires and ultra-thin shock-absorbing lenses.'
  },
  {
    id: 'luoweite',
    name: 'Luoweite',
    origin: 'Madrid, Spain',
    est: 1982,
    story: 'Luoweite represents fine Iberian craftsmanship, bringing organic, hand-sculpted curves, high-density cellulose acetate, and rich warm tones reminiscent of the Mediterranean coastline.'
  }
];
