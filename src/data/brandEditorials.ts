export interface EditorialHighlight {
  title: string;
  description: string;
}

export interface EditorialBlock {
  title: string;
  subtitle: string;
  statementTitle: string;
  statementText: string;
  curationTitle: string;
  curationText: string;
  innovationTitle?: string;
  innovationText?: string;
  highlights: EditorialHighlight[];
  deliveryTitle: string;
  deliveryText: string;
}

export const BRAND_EDITORIALS: Record<string, EditorialBlock> = {
  'cartier': {
    title: "Cartier Sunglasses at Si Mirage",
    subtitle: "Curated Luxury, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Cartier sunglasses are not just eyewear—they are jewelry for the face. For decades, the Maison has crafted some of the world's most recognizable, high-status sunglasses. Characterized by precious materials, impeccable French design, and striking silhouettes, a pair of Cartier sunglasses instantly elevates any look. From the bold aviator aesthetics of the Santos de Cartier to the sleek minimalism of the C Décor and the daring elegance of the Panthère collections, these frames define elite styling.",
    curationTitle: "The Si Mirage Curation: Rare, New & Archival",
    curationText: "At Si Mirage, we source only the most exceptional Cartier sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on rare styling, timeless collector pieces, and highly sought-after new releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the warm tones of rare Bubinga wood and genuine horn to the brilliant platinum and gold-finished metals—before it ever reaches you.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated catalog featuring unique vintage gems, limited-edition frames, and the latest runway drops."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Cartier sunglasses arrive safely, promptly, and in pristine condition."
  },
  'rayban': {
    title: "Ray-Ban Sunglasses at Si Mirage",
    subtitle: "Curated Legacy, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Ray-Ban sunglasses are not just eyewear—they are icons of cultural revolution. For over eight decades, the Maison has crafted some of the world's most recognizable, high-status sunglasses, born from a legacy that began in the skies. Characterized by timeless silhouettes, pioneering lens technology, and undeniable authenticity, a pair of Ray-Ban sunglasses instantly elevates any look. From the legendary aviator aesthetics of the Aviator—originally engineered for U.S. military pilots—to the revolutionary square frame of the Wayfarer that defined generations, and the bold retro spirit of the Clubmaster, these frames have been worn by Hollywood icons, rock legends, and cultural renegades who refused to follow the crowd. Each design carries the DNA of bravery, self-expression, and effortless cool—from James Dean and Audrey Hepburn to the visionaries of today.",
    innovationTitle: "Lens Innovation: Engineered for Clarity and Protection",
    innovationText: "At the heart of every pair lies a commitment to superior optical engineering. Whether you seek everyday clarity with the iconic Classic G-15 lenses originally developed for military aviation, or enhanced contrast and reduced glare with Polarized lenses—bearing a distinctive mark of authenticity—our collection ensures uncompromised vision. For those who demand dynamic adaptability, the Evolve photochromic lenses shift tint with changing light, while Chromance lenses fine-tune light to make everyday colors more vibrant and vivid—ideal for outdoor pursuits. From the smooth transition of Gradient lenses to the bold reflective shield of Mirror coatings, each pair is crafted with advanced anti-reflective, smudge-resistant, and UV-protective treatments, ensuring sharper vision, visual comfort, and lasting durability.",
    curationTitle: "The Si Mirage Curation: Timeless Icons & Modern Innovation",
    curationText: "At Si Mirage, we source only the most exceptional Ray-Ban sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless collector pieces, iconic heritage designs, and highly sought-after new releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the use of sustainable bio-acetate derived from cotton and wood pulp to the lightweight durability of advanced materials. Whether it's a rare vintage gem or the latest runway drop, our curated catalog features only authentic masterpieces of design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring heritage icons, limited-edition frames, and the latest innovative releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Ray-Ban sunglasses arrive safely, promptly, and in pristine condition."
  },
  'gentle-monster': {
    title: "Gentle Monster Sunglasses at Si Mirage",
    subtitle: "Curated Avant-Garde, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Gentle Monster sunglasses are not just eyewear—they are wearable sculptures born from the intersection of art, fashion, and futurism. For over a decade, the Seoul-based Maison has crafted some of the world's most daring, conversation-starting sunglasses, redefining what eyewear can be. Characterized by oversized silhouettes, geometric experimentation, and the signature philosophy of 'weird beauty,' a pair of Gentle Monster sunglasses instantly transforms any look into an editorial statement. From the shield-inspired bridges of the BOLD Collection that redefine futuristic design to the botanical loops and tangles of the Bouquet Collection, and the wrap-around sculptural forms of the Gelati line, these frames embody a spirit of fearless creativity. The brand's name itself—balancing 'Gentle' humility with 'Monster' attitude—speaks to its core identity: frames that appear wearable yet carry an unmistakable edge of rebellion and individuality.",
    innovationTitle: "Experimental Design: Sculptural, Futuristic, and Unconventional",
    innovationText: "At the heart of every pair lies a commitment to pushing creative boundaries. Gentle Monster's design theory rejects traditional eyewear conventions, embracing oversized proportions, asymmetrical shapes, and unexpected material combinations that feel lifted from a futuristic design laboratory. The 2025 BOLD Collection reimagines the classic shield shape through innovative removal of nose pads and lightweight lenses juxtaposed with intricately crafted bridges, while the 2026 Bouquet Collection introduces frames adorned with loops and ties inspired by natural botanical structures. Whether you seek the conceptual edge of lens-free designs, the textural intrigue of jelly-inspired metal details, or the dramatic volume of exaggerated acetate fronts, each piece is engineered to make a powerful visual statement. All lenses block 99.9% of UV rays, ensuring that this artistic expression never compromises on protection.",
    curationTitle: "The Si Mirage Curation: Edgy Icons & Future Classics",
    curationText: "At Si Mirage, we source only the most exceptional Gentle Monster sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on avant-garde silhouettes, sought-after collaborations, and the most innovative seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the visionary craftsmanship—from the high-density acetate and polished metals to the distinctive symbol details that define the brand's futuristic sensibility. Whether it's a rare limited-edition frame or the latest collection drop, our curated catalog features only authentic masterpieces of experimental design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring avant-garde icons, exclusive collaborations, and the most innovative new releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of contemporary eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Gentle Monster sunglasses arrive safely, promptly, and in pristine condition."
  },
  'chanel': {
    title: "Chanel Sunglasses at Si Mirage",
    subtitle: "Curated Elegance, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Chanel sunglasses are not just eyewear—they are wearable emblems of French sophistication and timeless allure. For over a century, the Maison has crafted some of the world's most coveted, high-status sunglasses, born from the revolutionary vision of Gabrielle \"Coco\" Chanel and carried forward by the creative genius of Karl Lagerfeld until his passing in 2019. Characterized by distinctive two-tone designs, and instantly recognizable silhouettes, a pair of Chanel sunglasses immediately elevates any ensemble. From the bold, graphic volumes of the cat-eye frames to the retro-futuristic butterfly silhouettes and the elegant shield shapes that redefine modern glamour, these designs embody the essence of luxury. The famous interlocking double C logo, along with signature quilting and two-tone detailing, ensures each piece remains a hallmark of designer quality and desirability.",
    innovationTitle: "Métiers d'Art Craftsmanship: Innovation Meets Heritage",
    innovationText: "At the heart of every pair lies a commitment to exceptional artistry and technical innovation. Chanel's eyewear collections—including the prestigious Métiers d'Art line—celebrate the skilled craftsmanship essential to haute couture, combining advanced technologies with traditional methods of construction. Whether crafted from lightweight nylon fibre for unparalleled comfort, luxurious acetate for classic elegance, each frame balances form and function with meticulous precision. Select styles feature polarized lenses for enhanced visual clarity, photochromic lenses that adapt dynamically to changing light conditions, and Blue Light filtering options for modern lifestyles. The signature two-tone aesthetic, a hallmark of Mademoiselle Chanel's allure, is echoed throughout the collections—with contrasting colors appearing on the back of frames and the iconic double C logo, ensuring that \"the inside must be as beautiful as the outside\". All lenses provide 100% UVA and UVB protection, with premium mineral lenses delivering superior visual acuity compared to traditional optics.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Chanel sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on rare Métiers d'Art pieces, timeless collector frames, and highly sought-after new releases from the latest collections. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the warmth of tortoiseshell acetate and the lustre of mother-of-pearl to the sophisticated interplay of black trimmed with pop colors that define Chanel's signature style. Whether it's a vintage gem from the early 1990s or the latest runway drop, our curated catalog features only authentic masterpieces of design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring Métiers d'Art exclusives, heritage icons, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Chanel sunglasses arrive safely, promptly, and in pristine condition."
  },
  'louis-vuitton': {
    title: "Louis Vuitton Sunglasses at Si Mirage",
    subtitle: "Curated Craftsmanship, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Louis Vuitton sunglasses are not just eyewear—they are wearable testaments to a heritage of travel, craftsmanship, and innovation that spans over 170 years. Since 1854, the Maison has crafted some of the world's most prestigious accessories, born from the vision of trunk-maker Louis Vuitton and carried forward through generations of artistic excellence. Characterized by meticulous craftsmanship, distinctive signature details, and instantly recognizable silhouettes, a pair of Louis Vuitton sunglasses immediately elevates any ensemble. From the sophisticated metal frames of the LV Confidence and the avant-garde mask-shaped lenses of the LV Split Cat Eye, these designs embody the essence of modern luxury. The emblematic LV monogram—first used in 1896 as a defense against counterfeiting—along with Monogram Flower details and the LV Circle emblem, ensures each piece remains a hallmark of designer quality and desirability.",
    innovationTitle: "Innovative Craftsmanship: Heritage Meets Contemporary Design",
    innovationText: "At the heart of every pair lies a commitment to exceptional artistry and technical innovation. Louis Vuitton's eyewear collections celebrate the skilled craftsmanship essential to the House's legacy, combining advanced materials with traditional methods of construction. Whether crafted from modern rubber-effect nylon for a sleek, contemporary feel, luxurious acetate for classic elegance, or sophisticated metal frames with elegant finishes, each frame balances form and function with meticulous precision. Signature details abound—from laser-engraved Damier motifs and metal LV initials adorning the temples to Monogram Flower details on lenses and nose pads. Select styles feature polarized lenses for optimal visual comfort in bright conditions, while mirrored sunglasses add a contemporary twist to any look. Every pair provides 100% UV protection, ensuring that this artistic expression never compromises on eye health. With lightweight designs and functional nose pads for comfort, Louis Vuitton frames are as practical as they are prestigious.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Runway Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Louis Vuitton sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on runway debuts, timeless collector frames, and the most innovative seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of gold-finish metals and the richness of acetate to the modern appeal of rubber-effect nylon that defines the House's contemporary edge. Whether it's a rare vintage piece or the latest runway drop, our curated catalog features only authentic masterpieces of design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring runway debuts, heritage icons, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Louis Vuitton sunglasses arrive safely, promptly, and in pristine condition."
  },
  're': {
    title: "Randolph Engineering Sunglasses at Si Mirage",
    subtitle: "Curated Military Heritage, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Randolph Engineering sunglasses are not just eyewear—they are battle-tested icons of American military precision and uncompromising durability. For over five decades, the Massachusetts-based Maison has crafted some of the world's most respected, high-performance sunglasses, born from the vision of two engineers who dared to build their American dream. Characterized by handcrafted metal frames, heroic military lineage, and an unwavering commitment to quality, a pair of Randolph Engineering sunglasses instantly commands respect and elevates any look. From the legendary Aviator—the flagship model that surpassed U.S. Department of Defense specifications in 1982 and remains the standard for world-class quality—to the distinctive Concorde with its iconic teardrop silhouette, and the specialized P-3 designed with curved temples to comfortably fit under headgear, these frames embody strength, precision, and timeless cool. Worn by NASA astronauts as they lift off the launch pad, by Top Gun pilots stepping into the cockpit, and by Hollywood icons like Tom Cruise and Johnny Depp, each pair carries the authentic spirit of those who demand the very best.",
    innovationTitle: "Engineering Excellence: Built to Exceed Military Standards",
    innovationText: "At the heart of every pair lies an engineering legacy forged in the crucible of U.S. military service. Since 1972, when co-founders Jan Waszkiewicz and Stanley Zaleski—both former engineers at the legendary American Optical company—established Randolph Engineering, the brand has been defined by advanced engineering principles and premium performance eyewear. In 1982, RE became the prime contractor for military aviation flight glasses for the U.S. Department of Defense, producing the officially designated MIL-S-25948 HGU-4/P sunglasses. Each frame is handcrafted in the United States using time-honored techniques, with some manufacturing machines having served the company for over 45 years. The signature solder joints are so robust that they carry a lifetime warranty—a testament to the brand's unparalleled confidence in their durability. Constructed primarily from corrosion-resistant stainless steel, blended with nickel and other metals for optimal flexibility, these frames are engineered to accommodate various head sizes while providing a reassuringly substantial feel. The bayonet-style temples are designed to fit comfortably under helmets and headgear, while durable mineral glass lenses—available in over 17 color-tinted options—deliver exceptional clarity and scratch resistance. All lenses provide 100% UV protection, ensuring uncompromised eye safety in the most demanding conditions.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Randolph Engineering sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless military classics, sought-after limited editions, and the most innovative new releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of 23K rose gold four-layer plating on select civilian editions to the distinctive AGX gray-green polarized lenses developed for superior visual performance. Whether it's a rare vintage Concorde or the latest Fusion Collection featuring Italian Mazzucchelli acetate frames, our curated catalog features only authentic masterpieces of military-grade design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring military heritage icons, exclusive limited editions, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of American eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Randolph Engineering sunglasses arrive safely, promptly, and in pristine condition."
  },
  'celine': {
    title: "Celine Sunglasses at Si Mirage",
    subtitle: "Curated Parisian Chic, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Celine sunglasses are not just eyewear—they are emblems of understated Parisian sophistication and quiet luxury. For over eight decades, the Maison has crafted some of the world's most coveted, elegant sunglasses, born from the vision of Céline Vipiana and carried forward through visionary creative directors including Phoebe Philo and Hedi Slimane. Characterized by clean lines, architectural silhouettes, and a signature blend of femininity and strength, a pair of Celine sunglasses instantly elevates any ensemble. From the sculptural, oversized butterfly frames with generous curves to the retro-chic cat-eye silhouettes that hark back to Hollywood icons, and the modern precision of square and oval shapes, these designs embody the essence of Parisian chic. The iconic Triomphe logo—inspired by the iron chain surrounding the Arc de Triomphe and created in 1971—alongside the subtle 3 Dots signature on the temples, ensures each piece remains a hallmark of heritage and refined design. Worn by fashion icons such as Kendall Jenner and Rihanna, Celine sunglasses have become the definitive choice for those who appreciate effortless elegance with an edge.",
    innovationTitle: "Signature Details: The Language of Refined Elegance",
    innovationText: "At the heart of every pair lies a commitment to exceptional craftsmanship and meticulous attention to detail. Celine eyewear is exclusively manufactured in Italy by Thelios, operating under the LVMH-Marcolin joint venture, ensuring the highest standards of luxury production. Two signatures define the brand's visual identity. The Triomphe—a mirrored double \"C\" first introduced by the founder in 1973—appears as a gold-tone metal plate on the temples of select frames, a subtle yet unmistakable flash of heritage polish. The 3 Dots collection, characterized by three small dots adorning the temples, embodies the brand's constant search for balance—between strength and delicacy, presence and discretion. Whether crafted from dense, sculptural acetate with deep tortoise, black, or brown tones, or lightweight metal frames with gold accents, each pair balances bold volumes with clean shapes that never feel excessive. Signature details like the comfortable saddle nose bridge and wide, tapered arms ensure these statement pieces are as wearable as they are beautiful. All lenses provide 100% UVA/UVB protection, ensuring uncompromised eye safety without sacrificing style.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Celine sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless collector frames, bold runway debuts, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of glossy acetate and the warmth of tortoiseshell patterns to the brilliance of gold-tone metal finishes and subtle crystal embellishments that define the Maison's refined aesthetic. Whether it's a rare vintage piece or the latest collection drop, our curated catalog features only authentic masterpieces of design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring Triomphe exclusives, 3 Dots signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Celine sunglasses arrive safely, promptly, and in pristine condition."
  },
  'persol': {
    title: "Persol Sunglasses at Si Mirage",
    subtitle: "Curated Italian Artistry, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Persol sunglasses are not just eyewear—they are masterpieces of Italian Maestria, embodying over a century of artisanal excellence and engineering innovation. Since 1917, when engineer Giuseppe Ratti founded the Maison in Turin to serve pilots and racecar drivers, the brand has crafted some of the world's most distinguished sunglasses, where function, comfort, and beauty remain inseparable. Characterized by handcrafted acetate frames, unmistakable design signatures, and a legacy of quiet luxury, a pair of Persol sunglasses instantly elevates any look. From the legendary 649—originally designed for Turin tram drivers in 1957 and immortalized by Marcello Mastroianni—to the revolutionary 714, the world's first folding glasses worn by Steve McQueen, and the sophisticated Calligrapher series, these frames embody the perfect synthesis of tradition and technology. The brand's name itself—short for the Italian \"per il sole,\" meaning \"for the sun\"—speaks to its humble, purposeful origins and enduring commitment to superior vision.",
    innovationTitle: "Artisanal Craftsmanship: The Language of Italian Maestria",
    innovationText: "At the heart of every pair lies an obsessive dedication to craftsmanship that can take several days to complete. The journey begins with blocks of cellulose acetate, a naturally derived, non-toxic material that undergoes thirty manual processes and countless skilled hands to become a work of art. Each frame is meticulously shaped, with every cut, polish, and hinge placement reflecting the precision-driven, hand-performed processes that blend art and engineering. The acetate then undergoes a four-day tumbling process in rotating drums filled with fine wood cylinders, gradually transforming it from rough-cut material into a smooth, lustrous surface that reveals the depth and richness of Persol's custom-colored materials. The Meflecto system, first patented in the 1930s, represents a technologically unsurpassed solution for comfort—a flexible stem system that adapts to the unique shape of any face, eliminating pressure and ensuring a \"made to measure\" fit. The Victor bridge, introduced in the 1950s, adds both visual distinction and functional flexibility with its three notches. Every frame is hand-assembled, with artisans adjusting hinge tension, aligning temples, and buffing surfaces until each piece gleams like obsidian.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Persol sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless collector pieces, iconic heritage designs, and the most innovative seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the warmth of rich tortoiseshell acetate and the elegance of classic Havana to the sleek sophistication of total-black finishes that define the Maison's contemporary edge. Whether it's a rare vintage 714 or the latest runway drop, our curated catalog features only authentic masterpieces of Italian design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring heritage icons like the 649 and 714, exclusive limited editions, and the most innovative new releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of Italian eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Persol sunglasses arrive safely, promptly, and in pristine condition."
  },
  'versace': {
    title: "Versace Sunglasses at Si Mirage",
    subtitle: "Curated Italian Glamour, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Versace sunglasses are not just eyewear—they are bold declarations of Italian glamour, power, and unapologetic luxury. Since 1978, when visionary designer Gianni Versace founded the Maison in Milan, the brand has become synonymous with opulent designs, daring prints, and a fearless commitment to pushing the boundaries of fashion. Characterized by striking silhouettes, unmistakable signature motifs, and exquisite craftsmanship, a pair of Versace sunglasses instantly transforms any look into a confident style statement. From the mythology-rich Medusa head emblem—chosen by Gianni himself for its Greek symbolism of power and allure—to the intricate Baroque patterns, the timeless Greek Key design, and the distinctive Greca pattern, these frames embody the essence of Italian extravagance. The collection features a diverse range of shapes, from classic aviators and chic cat-eye frames to luxurious oversized lenses, sporty shield shades, and fashion-forward rimless wraparound designs—each piece telling a story of craftsmanship and uncompromising elegance.",
    innovationTitle: "Signature Details: The Language of Extravagance",
    innovationText: "At the heart of every pair lies an obsessive dedication to design excellence and meticulous craftsmanship. Versace Eyewear is an extension of the brand's bold and distinctive design language, with iconic motifs that are instantly recognizable. The Medusa head logo—a symbol of power and allure—appears as gold-tone plaques at the temples, metal embossments, or subtle engravings, adding a touch of mythological glamour and instantly identifying the eyewear as a Versace creation. The Greca pattern, a signature Greek Key design, and intricate Baroque patterns further distinguish each frame, often gold-plated or embossed for an extra layer of luxury. Whether crafted from premium acetate for classic elegance, sleek tubular metal for contemporary sophistication, injection-molded propionate, durable stainless steel, lightweight polyamide, or hardened bio-based nylon, each frame balances bold proportions with exceptional comfort. Premium features abound—from polarized lenses that reduce glare and improve visibility to tinted lenses with 100% UV protection, mirrored lenses, gradient lenses, and adjustable nose pads for a personalized fit. Every pair is meticulously crafted in Italy and includes a designer case and soft lens-cleaning cloth, making it not just an accessory but a treasured piece of art.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Versace sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on bold runway debuts, timeless collector frames, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of rich Havana tortoiseshell acetate and the brilliance of gold-tone metal finishes to the striking detailing of the Medusa and Greca motifs that define the Maison's extravagant aesthetic. Whether it's a rare limited-edition piece or the latest collection drop, our curated catalog features only authentic masterpieces of Italian design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring Medusa exclusives, Greca signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Versace sunglasses arrive safely, promptly, and in pristine condition."
  },
  'carrera': {
    title: "Carrera Sunglasses at Si Mirage",
    subtitle: "Curated Racing Heritage, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Carrera sunglasses are not just eyewear—they are emblems of power, speed, and unapologetic boldness, born from the adrenaline-fueled world of motorsports. Since 1956, when Austrian pioneer Wilhelm Anger renamed his company after the legendary Carrera Panamericana—one of the most dangerous open-road races in the world—the brand has stood at the crossroads of pioneering design and unflinching quality. Characterized by dynamic silhouettes, unmistakable signature details, and an unwavering commitment to performance, a pair of Carrera sunglasses instantly commands attention. From the iconic teardrop Champion shape—the most-celebrated style donned by actors, athletes, and music stars worldwide—to the revolutionary Carrera Porsche Design shield that became a symbol of boldness in the 1970s, and the futuristic Safari shape born from the proportions of ski goggles, these frames embody the spirit of those who live on their own terms and rewrite the rules when necessary. The legendary \"C\" logo, prominently featured in the middle of the front since 1979—a bold move that broke the industry's golden rules of understated design—has become the signature hallmark that distinguishes Carrera from the crowd.",
    innovationTitle: "Innovative Craftsmanship: Where Performance Meets Italian Style",
    innovationText: "At the heart of every pair lies an obsession with innovation and technical excellence. Wilhelm Anger himself developed and patented \"Optyl,\" a material 20% lighter than traditional acetate that improved comfort and fit while reducing allergic reactions. Today, each frame is designed in Italy by a talented team who blend stylistic, technical, and industrial innovation with quality craftsmanship. Whether crafted from eco-friendly polyamide for lightweight durability, premium acetate derived from natural cotton seed fibers, or sleek stainless steel with sculpted metal temples, each frame balances bold proportions with exceptional comfort. Signature details abound—from the Flag stripe, a trademark motif inspired by Carrera's ski-jumping 'Bullet' helmet with its black-red-black colors recalling the lines and colours of car races, to the Victory C plaque and the distinctive laser-engraved Carrera lettering on the temples. Advanced lens technologies include Carrera Polarized for reduced glare, Carrera Adaptive photochromic lenses that adjust to changing light, and options with backside anti-reflective coatings—all providing 100% UV protection.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Carrera sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless racing icons, archival collector pieces, and the boldest seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the hand-painted Flag stripes and sleek metalwork of the Glory collection to the sculpted acetate and unmistakable 'C' detailing that defines the Maison's bold aesthetic. Whether it's a rare vintage Champion or the latest Victory C design, our curated catalog features only authentic masterpieces of Italian eyewear design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring heritage icons like the Champion and Safari, archival remasters, and the most innovative new releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of Italian eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Carrera sunglasses arrive safely, promptly, and in pristine condition."
  },
  'dior': {
    title: "Dior Sunglasses at Si Mirage",
    subtitle: "Curated Parisian Haute Couture, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Dior sunglasses are not just eyewear—they are the embodiment of Parisian haute couture, visionary boldness, and timeless elegance. Since 1946, when Christian Dior founded his legendary Maison at 30 Avenue Montaigne, the House has revolutionized fashion with an avant-garde spirit while never compromising on its heritage of excellence. Characterized by sophisticated silhouettes, unmistakable signature codes, and exceptional craftsmanship, a pair of Dior sunglasses instantly elevates any look into a statement of refined luxury. From the architectural lines of the DiorBlackSuit collection—inspired by the meticulous tailoring of Dior suits with subtle engraved \"CD\" logos—to the bold, oversized frames of the DiorSignature line and the retro-futuristic Dior3D models adorned with the graphic cannage pattern, these frames embody the perfect fusion of heritage and innovation. Whether gracing the faces of Rihanna, Kim Kardashian, or Kanye West, Dior eyewear has become an integral part of popular culture, celebrated by the world's most influential names.",
    innovationTitle: "The Dior Savoir-Faire: Where Parisian Vision Meets Italian Mastery",
    innovationText: "At the heart of every pair lies an extraordinary alliance of French design genius and Italian artisanal excellence. Each frame is first sketched in the Dior studios in Paris, according to meticulous, precise drawings that capture the House's creative vision. These blueprints then come to life in the Thélios workshops in the Longarone region of Italy, where innovative techniques meet exceptional craftsmanship in a virtuoso display of traditional heritage rich with timeless modernity. The result is eyewear that embodies the very essence of couture allure—where generations of savoir-faire merge seamlessly with cutting-edge innovation. Whether crafted from premium acetate for classic elegance, lightweight nylon, durable titanium, or sleek metal frames, each pair balances bold proportions with exceptional comfort and durability. Every frame proudly bears signatures that honor Monsieur Dior himself—\"Dior,\" \"Christian Dior,\" \"CD,\" or \"Christian Dior Paris\"—subtle yet powerful emblems of authenticity and prestige.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Dior sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless couture icons, bold runway debuts, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the depth of tortoiseshell acetate and the lustre of gold-tone metal finishes to the subtle engraving of \"CD\" signatures and the intricate detailing of the Oblique motif that defines the Maison's distinctive aesthetic. Whether it's a rare archival piece from the late 1960s—when Dior first introduced its eyewear lines—or the latest collection from the House, our curated catalog features only authentic masterpieces of French design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring CD Diamond exclusives, Oblique signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Dior sunglasses arrive safely, promptly, and in pristine condition."
  },
  'burberry': {
    title: "Burberry Sunglasses at Si Mirage",
    subtitle: "Curated British Heritage, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Burberry sunglasses are not just eyewear—they are emblems of quintessential British heritage, utilitarian luxury, and timeless elegance. Since 1856, when 21-year-old apprentice draper Thomas Burberry founded his storied Maison in Hampshire, the brand has been synonymous with an uncompromising eye for detail and construction of the highest calibre, forging pieces that become treasured additions to any discerning wardrobe. Characterized by classic silhouettes, instantly recognizable house codes, and a perfect fusion of time-honoured construction techniques with tomorrow's textile innovations, a pair of Burberry sunglasses instantly elevates any look. From the legendary gabardine trench coat—Thomas Burberry's most iconic innovation that stylishly protected against British weather—to the renowned Burberry Check, introduced in the 1920s as the coat's lining, these designs embody the pioneering spirit and enduring style that has grown the brand from Haymarket's humble military outfitter to a global powerhouse. Guided today by Chief Creative Officer Daniel Lee, the Maison continues to evolve, marrying technology, artistry, and tradition with a fresh and irreverent approach to luxury.",
    innovationTitle: "Craftsmanship with Conscience: Tradition Meets Innovation",
    innovationText: "Today, Burberry's commitment to quality extends beyond aesthetics to embrace environmental responsibility. The Maison focuses on environmental protection through alternative materials, creating high-performing sunglasses from recycled valuable materials and bio-based resources. The bio-based nylon used for frame fronts contains at least 45% bio-based content derived from plant-based renewable resources, while the bio-acetate used for arms contains at least 50% bio-based content. Whether crafted from premium acetate for classic elegance, sleek nylon for lightweight durability, or sophisticated metal frames, each pair balances bold proportions with exceptional comfort. With every piece designed in London and artfully assembled in Italy, a pair of Burberry sunglasses is a true testament to enduring style and an unwavering commitment to craftsmanship. Classic cat-eye, round and rectangular frames sit seamlessly alongside oversized butterfly and pilot silhouettes in colours ranging from timeless black, brown tortoiseshell, and navy to bold graphic tones, ensuring every pair features scratch-resistant lenses with 100% UV protection for uncompromised visual clarity.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Burberry sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on timeless collector frames, signature Check designs, and the most innovative seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the warmth of rich tortoiseshell acetate and the elegance of classic Navy to the subtle engraving of the Equestrian Knight Design and the unmistakable Check pattern that defines the Maison's enduring aesthetic. Whether it's a rare archival piece from the past 160 years or the latest collection from Creative Director Daniel Lee, our curated catalog features only authentic masterpieces of British design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring Check signatures, Equestrian Knight Design exclusives, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Burberry sunglasses arrive safely, promptly, and in pristine condition."
  },
  'gucci': {
    title: "Gucci Sunglasses at Si Mirage",
    subtitle: "Curated Italian Opulence, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Gucci sunglasses are not just eyewear—they are the ultimate expression of Italian maximalism, audacious creativity, and unapologetic luxury. Since 1921, when Guccio Gucci founded the House in Florence with a vision of impeccable leather goods, the brand has evolved into one of the world's most influential and desirable fashion powerhouses, redefining what it means to be a luxury label for the modern era. Characterized by bold silhouettes, unmistakable signature codes, and exquisite Italian craftsmanship, a pair of Gucci sunglasses instantly transforms any look into a statement of sartorial confidence. From the iconic Double G and Interlocking G logos that adorn frames and lenses to the Horsebit detail—a tribute to the brand's equestrian heritage that first appeared in the Eyewear collection as a symbolic code—these frames embody the House's rich tapestry of history and contemporary vision. The Web stripe, one of Gucci's most recognizable motifs, adds another layer of distinction, appearing at the temples of select styles. Whether gracing the faces of celebrities, influencers, or those who appreciate the finer things in life, Gucci sunglasses have become a global phenomenon, sought after for their unique blend of retro inspiration, ornate finishes, and forward-thinking design.",
    innovationTitle: "Italian Craftsmanship: Where Heritage Meets Innovation",
    innovationText: "At the heart of every pair lies an extraordinary commitment to Italian artistry and meticulous attention to detail. Each frame is a testament to the brand's \"Made in Italy\" legacy, showcasing impeccable finish and high regard for craftsmanship. Whether crafted from premium acetate in classic black, rich brown tortoiseshell, or vibrant seasonal hues, or constructed from sleek metal adorned with gold-toned finishes, each pair balances bold proportions with exceptional comfort and durability. The collections feature a diverse range of silhouettes—from retro-inspired oversized cat-eye and romantic round frames to architectural square and elegant oval designs, ensuring a style for every personality and occasion. All lenses provide 100% UVA/UVB protection, with options ranging from solid brown to gradient lenses. Recent collections have introduced frameless designs with engraved Gucci logos and Double G details, as well as innovative materials like ivory varnish finishes, demonstrating the House's commitment to pushing creative boundaries while honouring its storied past.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Gucci sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on bold runway debuts, timeless collector frames, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of rich tortoiseshell acetate and the brilliance of gold-toned metal finishes to the intricate detailing of the Horsebit, Double G, and Interlocking G motifs that define the Maison's opulent aesthetic. Whether it's a rare archival piece from the House's centennial history or the latest collection from visionary Creative Director Sabato De Sarno—under whose leadership Gucci continues to redefine luxury and fashion through creativity and innovation—our curated catalog features only authentic masterpieces of Italian design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring Double G exclusives, Horsebit signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Gucci sunglasses arrive safely, promptly, and in pristine condition."
  },
  'porsche': {
    title: "Porsche Design Sunglasses at Si Mirage",
    subtitle: "Curated Engineering Excellence, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Porsche Design sunglasses are not just eyewear—they are precision-engineered masterpieces born from the legendary design philosophy of Professor Ferdinand Alexander Porsche, the creator of the iconic Porsche 911. Since 1972, the brand has developed products whose style is defined by innovation, timelessness, and an unwavering commitment to functional elegance, guided by the principle that \"form should be entirely determined by function\". Characterized by architectural silhouettes, high-performance materials, and a purist aesthetic that never follows trends but creates them, a pair of Porsche Design sunglasses instantly commands attention and respect. From the revolutionary P'8478—the world's first sunglasses with interchangeable lenses, introduced in 1978 and still in production today—to the iconic P'8479 Shield, a favourite of artists and celebrities like Yoko Ono, and the modern Hybrid, Hexagon, Liquid Titanium, and Motion Series, these frames embody the perfect synthesis of motorsport DNA and contemporary design. Every design is a direct translation of Porsche's automotive heritage into wearable art, with the unmistakable character that has set the brand apart since its founding. Whether gracing the faces of Hollywood icons, athletes, or connoisseurs of exceptional design, Porsche Design sunglasses remain an emblem of performance, precision, and uncompromising quality.",
    innovationTitle: "Engineering Excellence: Where Form Follows Function",
    innovationText: "At the heart of every pair lies an obsessive commitment to technical innovation and material performance. Porsche Design's design philosophy is rooted in the premise that good design only exists in concert with engineering. The brand applies high-performance materials—including titanium, the polyamide RXP®, and stainless steel—to create frames that balance lightweight comfort with lasting durability. Signature technologies define the collection. The Vision Drive Technology™ delivers decisive optical advantages: anti-glare and contrast-enhancing filters that block eye-straining blue light, boost visibility and colour perception, provide superior impact resistance, over 95% polarized efficiency, and UV400 protection. The interchangeable lens system, pioneered by F.A. Porsche himself in 1978, remains a hallmark of the brand, allowing wearers to adapt to changing light conditions with remarkable ease. Select frames feature limited-edition designs—inspired by the iconic 911 Turbo with its legendary \"turbo\" lettering, the distinctive Targa roll bar, and the hexagonal screws of the Porsche 911 engine block—all meticulously hand-assembled and limited to quantities like 911 or 1,974 pieces worldwide, making each pair a collector's item.",
    curationTitle: "The Si Mirage Curation: Engineering Icons & Design Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Porsche Design sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on limited-edition collector pieces, iconic heritage designs, and the most innovative seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of Japanese titanium and the depth of advanced RXP® high-performance plastic to the signature hexagon screws, the interchangeable lens systems, and the subtle \"turbo\" lettering that defines the brand's motorsport legacy. Whether it's a rare P'8478 from the original 1978 collection or the latest Hybrid Series masterpiece, our curated catalog features only authentic works of engineering art, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring limited-edition icons, engineering signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of precision eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Porsche Design sunglasses arrive safely, promptly, and in pristine condition."
  },
  'maybach': {
    title: "Maybach Eyewear at Si Mirage",
    subtitle: "Curated Automotive Haute Couture, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Maybach sunglasses are not just eyewear—they are masterpieces of automotive haute couture, born from over a century of German engineering excellence and uncompromising luxury. For decades, the legendary marque has symbolized the most exacting demands on quality and prestige—a name that became a legend through the most precise handcrafting and an obsessive love of detail. Characterized by rare, precious materials, architectural silhouettes, and an unmistakable design language that pays homage to the iconic Mercedes-Maybach automobiles, a pair of Maybach sunglasses instantly elevates any look into a statement of connoisseurship. From the Vision Collection—inspired by the design accents of the Mercedes-Maybach Vision concept car with its provocative, retro-modern appeal—to the timeless Artist III and the distinguished Mentalist II, these frames embody the perfect synthesis of automotive design DNA and wearable art. Today, the brand pushes creative boundaries through exclusive collaborations with global icons like Indian rapper Badshah, introducing fresh interpretations of signature silhouettes like The Artist III and The King III, while never compromising on the heritage and standards that define the Maison.",
    innovationTitle: "Exquisite Craftsmanship: Where Rare Materials Meet German Precision",
    innovationText: "At the heart of every pair lies an extraordinary commitment to artisanal excellence and material purity. Each frame is painstakingly handcrafted in Germany by experienced specialists, without recourse to industrial production processes—a rejection rate of 60 to 70 percent ensures that only the most flawless pieces reach the discerning wearer. Whether crafted from genuine buffalo horn—each piece naturally unique in its harmonious and interesting colors—or exquisite precious woods like Bird's Eye Maple, Ebony, and Eucalyptus, the materials are selected with the same reverence reserved for the interior paneling of Maybach automobiles. The frames are meticulously assembled with pure titanium, valued for its lightweight durability, hypoallergenic properties, and corrosion resistance, finished with exclusive precious metal plating in palladium, platinum, or rose gold. Premium acetate components undergo a 72-hour tumble polishing process to achieve maximum luster, enhancing the beautiful color combinations and ensuring each frame possesses a depth and radiance unmatched in conventional eyewear. All lenses are crafted with precision optics—often by Carl Zeiss—delivering exceptional clarity with 100% UV protection.",
    curationTitle: "The Si Mirage Curation: Collector's Icons & Design Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Maybach eyewear. We don't do mass-market stock. Our team hand-picks every pair, focusing on rare collector's editions, automotive-inspired masterpieces, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the warmth of genuine buffalo horn and the richness of hand-finished wood veneers to the brilliance of platinum-plated titanium and the subtle engraving of the Maybach logo that defines the brand's uncompromising aesthetic. Whether it's a rare Vision Collection piece limited to just 300 pieces worldwide or the latest collaboration with Badshah, our curated catalog features only authentic masterpieces of German design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring limited-edition icons, automotive-inspired masterpieces, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Maybach sunglasses arrive safely, promptly, and in pristine condition."
  },
  'ecs': {
    title: "ECS Sunglasses at Si Mirage",
    subtitle: "Curated Contemporary Craftsmanship, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "ECS sunglasses are not just eyewear—they are refined expressions of contemporary style, designed for those who appreciate modern elegance without compromising on everyday practicality. Thoughtfully constructed with premium materials and clean, versatile silhouettes, each pair embodies a philosophy of accessible luxury that bridges timeless design principles with fresh, wearable aesthetics. From the sharp, architectural lines of the Slim Gloss rectangular frames to the iconic, easy-wearing appeal of the Gloss Wayfarer, and from the graceful lift of the Lifted Stripe cat-eye to the polished sophistication of the Round Luxe, every frame is crafted to elevate the everyday. The collection speaks to the modern individual who values understated style and authentic quality—sunglasses that are as comfortable for a day out as they are refined for a polished occasion, all carrying the subtle assurance of the discreet ECS logo on the inner temple, a mark of deliberate, minimalist design.",
    innovationTitle: "Thoughtful Design: Versatile Materials for Modern Living",
    innovationText: "At the heart of every pair is a commitment to quality materials and considered construction. Whether crafted from high-gloss solid acetate for a clean, contemporary character, a durable matte finish for active, everyday wear, or a sophisticated mixed-material construction that pairs a bold acetate front with lightweight metal temples, each frame balances visual appeal with lasting comfort. Signature details distinguish the collection—from the subtle silver-tone hinge accent on the Slim Gloss and the refined gold hardware on the Gloss Wayfarer to the delicate engraved stripe detail on the Lifted Stripe cat-eye and the decorative link hinge connector of the Round Luxe. All frames feature tinted, UV-protective lenses designed for outdoor clarity and eye safety, ensuring uncompromised protection with effortless style.",
    curationTitle: "The Si Mirage Curation: Everyday Icons & Modern Classics",
    curationText: "At Si Mirage, we source only the most exceptional ECS sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on classic silhouettes, versatile modern designs, and the most sought-after seasonal styles. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the lustre of high-gloss acetate and the warmth of tinted lenses to the subtle signature details that define the brand's refined aesthetic. Whether it's a versatile wayfarer for everyday wear or a sculptural cat-eye for a special occasion, our curated catalog features only authentic masterpieces of contemporary eyewear design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring timeless icons, versatile modern classics, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of quality eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Quality eyewear deserves white-glove treatment.",
    deliveryText: "Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new ECS sunglasses arrive safely, promptly, and in pristine condition."
  },
  'fendi': {
    title: "Fendi Sunglasses at Si Mirage",
    subtitle: "Curated Roman Elegance, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Fendi sunglasses are not just eyewear—they are wearable emblems of Roman heritage, creative audacity, and Italian refinement. Established in 1925 by Adele and Edoardo Fendi in the heart of Rome, the Maison has evolved from a family-run leather workshop into one of the world's most influential luxury fashion houses, celebrated for its unwavering commitment to craftsmanship and innovation. Characterized by bold silhouettes, unmistakable signature codes, and meticulous Italian craftsmanship, a pair of Fendi sunglasses instantly elevates any ensemble. From the iconic FF monogram—the instantly recognizable double-F logo created by Karl Lagerfeld in just \"less than five seconds\"—to the intricate Selleria stitching that pays tribute to the Maison's saddlery roots, these frames embody the perfect synthesis of tradition and contemporary vision. The collection features a diverse range of shapes—from retro-inspired cat-eye and bold butterfly frames to architectural square and sculptural shield designs—each piece carrying the distinctive flair that has made Fendi a global symbol of luxury and status. Whether gracing the faces of Hollywood icons or fashion connoisseurs, Fendi eyewear remains a hallmark of refined Italian elegance and unapologetic style.",
    innovationTitle: "Italian Craftsmanship: Where Heritage Meets Innovation",
    innovationText: "At the heart of every pair lies an extraordinary commitment to artisanal excellence and material purity. Each frame is conceived as a work of art, celebrating the Maison's unique savoir-faire in a perfect mix between tradition and innovation. Whether crafted from premium acetate for classic elegance, lightweight Optyl for exceptional comfort and durability, or sleek metal frames with polished hardware trims, each pair balances bold proportions with exceptional comfort and lasting quality. Signature details distinguish the collection. The Selleria line features distinctive metallic stitching on the temples, a tribute to the hand-stitched leatherwork of Fendi's heritage saddlery, embodying the values of craftsmanship and tradition. The iconic double F logo appears as chunky gold-tone metal plaques, laser-cut details, or subtle embossments, serving as the ultimate hallmark of authenticity and prestige. The Fendi First line introduces a bold inverted \"F\" logo near the temple hinges, combining form and function in a celebration of feminine elegance. Select styles feature innovative design elements—from triangular metal details creating a 3D effect on the front to sculptural crystal embellishments on the temples that translate iconic bag motifs into wearable art. All lenses provide 100% UVA/UVB protection, ensuring uncompromised eye safety without sacrificing style.",
    curationTitle: "The Si Mirage Curation: Heritage Icons & Modern Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Fendi sunglasses. We don't do mass-market stock. Our team hand-picks every pair, focusing on bold runway debuts, timeless collector frames, and the most sought-after seasonal releases. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine craftsmanship—from the richness of lustrous acetate and the brilliance of gold-tone metal finishes to the intricate Selleria stitching, the sculptural crystal details, and the unmistakable FF monogram that defines the Maison's opulent aesthetic. Whether it's a rare vintage piece or the latest collection from the creative visionaries at the helm—including Kim Jones, Artistic Director of Couture and Womenswear, and Silvia Venturini Fendi, Artistic Director of Accessories and Menswear—our curated catalog features only authentic masterpieces of Italian design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Rarity",
        description: "A curated collection featuring FF monogram exclusives, Selleria signatures, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of luxury eyewear design."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Luxury eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Fendi sunglasses arrive safely, promptly, and in pristine condition."
  },
  'polarized': {
    title: "Polarized Sunglasses at Si Mirage",
    subtitle: "Curated Visual Clarity, Delivered Nationwide",
    statementTitle: "The Ultimate Visual Experience",
    statementText: "Polarized sunglasses are not just eyewear—they are precision-engineered visual tools designed to transform the way you see the world. Unlike standard tinted lenses that simply dim your vision, polarized lenses contain a specialized chemical filter that actively blocks horizontally reflected light—the primary cause of blinding glare. When sunlight bounces off flat surfaces like water, asphalt, snow, or metal, it becomes concentrated in horizontal waves that create harsh reflections and reduce depth perception. A polarized lens intercepts and absorbs those waves before they reach your eyes, dramatically reducing glare while allowing useful vertical light to pass through. The result is sharper, more comfortable vision with enhanced contrast and truer colors, making everyday environments look crisp and vivid. Whether you're driving on a sun-drenched road, fishing on a glittering lake, or simply enjoying a bright afternoon, polarized lenses ensure your eyes stay relaxed and your vision remains uncompromised.",
    innovationTitle: "Advanced Optical Technology: Engineered for Clarity and Comfort",
    innovationText: "At the heart of every polarized lens lies sophisticated optical engineering. The lenses are crafted with millions of parallel rows of microscopic iodine crystals—so small they cannot be seen with the naked eye—that act like invisible jail bars, allowing vertically vibrating light waves to pass through while blocking horizontally polarized glare. This technology significantly reduces eye strain and fatigue, as your eyes no longer need to constantly squint or adjust against reflected light. Color perception becomes more vivid, contrast is enhanced, and details emerge with remarkable clarity, whether you are reading the contours of a fairway, spotting fish beneath the water's surface, or navigating wet roads after rainfall.",
    curationTitle: "The Si Mirage Curation: Premium Polarized Eyewear",
    curationText: "At Si Mirage, we source only the most exceptional polarized sunglasses. Our team hand-picks every pair, focusing on premium lens technology, superior optical clarity, and contemporary frame designs that combine function with style. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the advanced craftsmanship—from the precision of the polarization filter to the quality of the frame materials. Whether you seek everyday driving sunglasses or performance eyewear for outdoor adventures, our curated catalog features only authentic products with uncompromised visual performance, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Quality",
        description: "A curated collection featuring premium polarized lenses with full UV protection."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece delivers uncompromised optical performance."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Quality eyewear deserves white-glove treatment. Once you select your perfect pair, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new polarized sunglasses arrive safely, promptly, and in pristine condition."
  },
  'luoweite': {
    title: "Luoweite Sunglasses at Si Mirage",
    subtitle: "Curated Italian Design, Delivered Nationwide",
    statementTitle: "The Ultimate Style Statement",
    statementText: "Luoweite sunglasses are not just eyewear—they are refined expressions of Italian-inspired design, crafted for those who appreciate contemporary elegance without compromising on quality or protection. Rooted in Italian design heritage and crafted with meticulous attention to detail, the brand has established itself as a symbol of accessible luxury for the modern discerning individual. Characterized by versatile silhouettes, premium materials, and a commitment to visual comfort, a pair of Luoweite sunglasses instantly elevates any ensemble. From classic retro styles that evoke timeless sophistication to sleek contemporary designs that speak to modern sensibilities, these frames embody the perfect balance between tradition and innovation. The collection speaks to those who value understated style and authentic quality—sunglasses that transition seamlessly from a strict business suit to a relaxed everyday look, all carrying the quiet assurance of refined Italian craftsmanship.",
    innovationTitle: "Italian-Inspired Craftsmanship: Quality That Endures",
    innovationText: "At the heart of every pair lies an extraordinary commitment to quality materials and precision engineering. Each Luoweite frame is crafted from premium, lightweight materials such as hypoallergenic plastic and high-quality polycarbonate, designed to be virtually weightless on the face while ensuring lasting durability. The brand sources its materials with the same reverence for quality that defines the finest Italian eyewear, resulting in frames that are resistant to deformation and temperature fluctuations. Meticulous attention to ergonomic design ensures that every pair offers exceptional comfort—with nose pads that do not rub or slip, and temples that provide a secure yet gentle fit, making them suitable for all-day wear. All lenses provide UV400 protection, blocking 100% of harmful UVA and UVB rays, ensuring uncompromised eye safety with every wear.",
    curationTitle: "The Si Mirage Curation: Modern Icons & Everyday Masterpieces",
    curationText: "At Si Mirage, we source only the most exceptional Luoweite sunglasses. Our team hand-picks every pair, focusing on versatile designs, Italian-inspired craftsmanship, and the most sought-after seasonal styles. We spend dedicated time inspecting, photographing, and editing each pair in-house so you can appreciate the fine quality—from the lustre of premium polycarbonate and the warmth of tinted lenses to the subtle design details that define the brand's refined aesthetic. Whether it's a classic retro frame or a contemporary silhouette, our curated catalog features only authentic masterpieces of modern eyewear design, presented with bespoke attention to detail.",
    highlights: [
      {
        title: "Hand-Selected Quality",
        description: "A curated collection featuring versatile icons, Italian-inspired designs, and the most innovative seasonal releases."
      },
      {
        title: "Bespoke Presentation",
        description: "Every pair is individually styled and photographed by us, showing you the exact product in stunning detail."
      },
      {
        title: "100% Authenticity Guaranteed",
        description: "Shop with absolute confidence, knowing every piece is an authentic masterpiece of quality eyewear craftsmanship."
      }
    ],
    deliveryTitle: "Hand-Delivered Across Pakistan via TCS",
    deliveryText: "Quality eyewear deserves white-glove treatment. Once you select your perfect statement piece, we pack it securely and ship it directly to your doorstep using TCS insured delivery. Whether you are in Lahore, Karachi, Islamabad, or beyond, we guarantee your new Luoweite sunglasses arrive safely, promptly, and in pristine condition."
  }
};

BRAND_EDITORIALS['rayban-p'] = BRAND_EDITORIALS['rayban'];
BRAND_EDITORIALS['porsche-light'] = BRAND_EDITORIALS['porsche'];
