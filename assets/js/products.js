/**
 * VOLTX Mobile Accessories - Product Catalog Database
 * High-performance mobile accessories with detailed specs, compatibility, and variants
 */

const PRODUCTS_DATA = [
  {
    id: "voltx-magsafe-3in1",
    name: "AuraMag Pro 3-in-1 Charging Station",
    tagline: "15W Qi2 Fast Wireless MagSafe Stand",
    category: "chargers",
    categoryName: "MagSafe Chargers",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 428,
    badge: "Best Seller",
    badgeType: "hot",
    image: "assets/images/magsafe-station.jpg",
    gallery: [
      "assets/images/magsafe-station.jpg",
      "assets/images/smart-powerbank.jpg",
      "assets/images/gan-charger.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Series", "Apple Watch Ultra 2", "Apple Watch Series 10", "AirPods Pro 2"],
    brandCompatibility: ["Apple", "Samsung", "Google"],
    inStock: true,
    stockCount: 14,
    colors: [
      { name: "Obsidian Black", hex: "#1a1a1a", border: "#333" },
      { name: "Space Gray", hex: "#4a4a4f", border: "#666" },
      { name: "Titanium Silver", hex: "#c0c0c0", border: "#999" }
    ],
    features: ["15W Qi2 Certified", "Cryo-Cooling Fan", "N52 Magnet Array", "Weighted Zinc Base", "LED Ambient Underglow"],
    specs: {
      "Input": "USB-C PD 45W Max",
      "Phone Output": "15W Qi2 / MagSafe Fast Charge",
      "Watch Output": "5W Fast Charge (Apple Watch Ultra & Series 7+)",
      "Earbuds Output": "5W Qi Wireless",
      "Materials": "Aerospace Aluminum + Zinc Alloy + Silicone",
      "Weight": "420g",
      "Dimensions": "145 x 110 x 165 mm",
      "Warranty": "2 Years No-Hassle Replacement"
    },
    description: "The AuraMag Pro transforms your desk or nightstand into an ultra-sleek command station. Charge your iPhone at full 15W Qi2 speed while simultaneously fast-charging your Apple Watch and AirPods with built-in thermal cooling to preserve battery health."
  },
  {
    id: "voltx-titanium-armor-case",
    name: "AeroShield Titanium Carbon Case",
    tagline: "16ft Military Drop-Proof with MagSafe Ring",
    category: "cases",
    categoryName: "Cases & Protection",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 312,
    badge: "Staff Pick",
    badgeType: "popular",
    image: "assets/images/titanium-case.jpg",
    gallery: [
      "assets/images/titanium-case.jpg",
      "assets/images/magsafe-station.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 Ultra", "Google Pixel 9 Pro"],
    brandCompatibility: ["Apple", "Samsung", "Google"],
    inStock: true,
    stockCount: 28,
    colors: [
      { name: "Forged Carbon & Titanium", hex: "#22252a", border: "#444" },
      { name: "Stealth Matte Black", hex: "#111111", border: "#333" },
      { name: "Desert Titanium", hex: "#8c7e6c", border: "#baa793" },
      { name: "Deep Cyber Blue", hex: "#1a365d", border: "#2b6cb0" }
    ],
    features: ["Grade 5 Titanium Bezel", "3K Real Carbon Fiber Backing", "16ft Military Drop Tested", "Action Button Cover", "Camera Shield Lip 1.8mm"],
    specs: {
      "Drop Protection": "16 Feet (MIL-STD-810H Certified)",
      "MagSafe Force": "1,500g Magnetic Holding Force (N52)",
      "Bezel Elevation": "1.5mm Screen / 1.8mm Camera Ring",
      "Weight": "38 grams",
      "Material": "Grade 5 Titanium + 3K Carbon Fiber + Shock Polymer",
      "Warranty": "Lifetime Replacement Warranty"
    },
    description: "Engineered with Grade 5 Titanium corner bumpers and authentic woven 3K Carbon Fiber, the AeroShield case offers unmatched shock absorption without adding bulk. Features our 1,500g ultra-strong magnetic ring for rock-solid MagSafe locking."
  },
  {
    id: "voltx-gan-140w-charger",
    name: "HyperGaN 140W Cyber Charger + Cable",
    tagline: "3-Port GaN III Ultra-Fast Wall Adapter",
    category: "chargers",
    categoryName: "MagSafe Chargers",
    price: 64.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 560,
    badge: "⚡ 140W HyperSpeed",
    badgeType: "sale",
    image: "assets/images/gan-charger.jpg",
    gallery: [
      "assets/images/gan-charger.jpg",
      "assets/images/smart-powerbank.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 15 Series", "MacBook Pro 16", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 Ultra", "Google Pixel 9 Pro", "iPad Pro M4", "OnePlus 13"],
    brandCompatibility: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    inStock: true,
    stockCount: 19,
    colors: [
      { name: "Cyber Clear Transparent", hex: "#2d3748", border: "#4a5568" },
      { name: "Matte Obsidian", hex: "#171923", border: "#2d3748" }
    ],
    features: ["GaN III Semiconductor", "Real-Time OLED Power Display", "Foldable Prongs", "Includes 240W Braided Cable", "Intelligent Power Allocation"],
    specs: {
      "Total Wattage": "140W Max Output",
      "Ports": "2x USB-C (PD 3.1) + 1x USB-A (QC 4.0)",
      "Single Port USB-C1": "Up to 140W (MacBook Pro 16 0-50% in 28m)",
      "Fast Charging Protocols": "PD 3.1, PPS (45W Samsung Super Fast 2.0), QC 4+",
      "Included Cable": "6.6ft / 2m Braided 240W Kevlar USB-C",
      "Safety": "Active Temperature Guard 3.0 (3.2M checks/day)",
      "Warranty": "3-Year Warranty"
    },
    description: "Harness next-generation Gallium Nitride (GaN III) power. The HyperGaN 140W delivers enough pure wattage to fast-charge a MacBook Pro 16 and two flagship smartphones at the same time with full dynamic PPS support."
  },
  {
    id: "voltx-anc-pro-earbuds",
    name: "AuraStudio ANC Pro Wireless Earbuds",
    tagline: "Hi-Res Spatial Audio with 48dB Hybrid ANC",
    category: "audio",
    categoryName: "Audio & Earbuds",
    price: 119.99,
    originalPrice: 169.99,
    rating: 4.9,
    reviewCount: 389,
    badge: "Hi-Res Audio",
    badgeType: "hot",
    image: "assets/images/anc-earbuds.jpg",
    gallery: [
      "assets/images/anc-earbuds.jpg"
    ],
    devices: ["iPhone 16 Series", "iPhone 15 Series", "Samsung Galaxy S25 Series", "Google Pixel 9", "OnePlus 13", "Any Bluetooth 5.4 Device"],
    brandCompatibility: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    inStock: true,
    stockCount: 11,
    colors: [
      { name: "Brushed Gunmetal", hex: "#3b3b3b", border: "#555" },
      { name: "Obsidian Matte", hex: "#1a1a1a", border: "#333" },
      { name: "Silver Frost", hex: "#d1d5db", border: "#9ca3af" }
    ],
    features: ["48dB Hybrid Active Noise Cancelling", "11mm Dual Beryllium Drivers", "Spatial Audio 360° Tracking", "40h Total Playtime with Case", "IPX5 Sweat & Water Resistant"],
    specs: {
      "Bluetooth": "Bluetooth 5.4 with LDAC, AAC & LC3 Codecs",
      "Noise Cancellation": "48dB Hybrid ANC + 6 AI ENC Microphones",
      "Battery Life": "9h Single Charge (ANC Off) / 40h Total with Case",
      "Fast Charge": "10 min charge = 3 hours playback",
      "Charging Case": "Qi Wireless Charging + USB-C Fast Charge",
      "Waterproof": "IPX5 Earbuds / IPX4 Case",
      "Latency": "35ms Low Latency Gaming Mode"
    },
    description: "Immerse yourself in acoustic perfection. AuraStudio Pro combines 11mm beryllium composite acoustic drivers with industry-leading 48dB active noise cancelling, dynamic head-tracking spatial audio, and an ultra-low latency game mode."
  },
  {
    id: "voltx-smart-powerbank",
    name: "VoltArc Slim MagSafe Power Bank 10,000mAh",
    tagline: "Ultra-Thin Magnetic Battery with OLED Display",
    category: "powerbanks",
    categoryName: "Power Banks",
    price: 54.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 247,
    badge: "OLED Smart Display",
    badgeType: "new",
    image: "assets/images/smart-powerbank.jpg",
    gallery: [
      "assets/images/smart-powerbank.jpg",
      "assets/images/titanium-case.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Series", "iPhone 13 Series", "Samsung Galaxy S25 / S24 (with magnetic ring)"],
    brandCompatibility: ["Apple", "Samsung", "Google"],
    inStock: true,
    stockCount: 32,
    colors: [
      { name: "Brushed Titanium", hex: "#71717a", border: "#a1a1aa" },
      { name: "Midnight Black", hex: "#18181b", border: "#27272a" },
      { name: "Desert Sand", hex: "#a89f91", border: "#d4ceb8" }
    ],
    features: ["Smart OLED Real-Time Battery %", "15W Magnetic Wireless Fast Charge", "30W PD Two-Way USB-C Port", "Pass-Through Charging", "Ultra-Slim 12.8mm Profile"],
    specs: {
      "Capacity": "10,000mAh / 38.5Wh (Air Travel Approved)",
      "Wireless Output": "15W / 10W / 7.5W Qi MagSafe",
      "USB-C Output": "30W PD Fast Charging (Charge iPhone to 60% in 30m)",
      "Recharge Time": "1.2 hours via 30W USB-C Input",
      "Display": "Digital OLED (exact %, wattage in/out, time to full)",
      "Dimensions": "104 x 68 x 12.8 mm",
      "Weight": "188g"
    },
    description: "Snap on and power up effortlessly. The VoltArc Slim MagSafe power bank packs 10,000mAh into a svelte 12.8mm aircraft-grade aluminum chassis. The crisp OLED display shows exact battery percentage and live charging wattage in real-time."
  },
  {
    id: "voltx-car-mount-charger",
    name: "MagDrive Pro Car Mount & 15W Qi2 Charger",
    tagline: "RGB Ambient Vent & Dashboard Magnetic Mount",
    category: "mounts",
    categoryName: "Car Mounts & Stands",
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 198,
    badge: "1500g Grip",
    badgeType: "popular",
    image: "assets/images/car-mount.jpg",
    gallery: [
      "assets/images/car-mount.jpg"
    ],
    devices: ["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 / 12", "Samsung Galaxy S25 / S24 with MagCase", "Google Pixel 9 with MagCase"],
    brandCompatibility: ["Apple", "Samsung", "Google"],
    inStock: true,
    stockCount: 22,
    colors: [
      { name: "Stealth Carbon & RGB", hex: "#1e1e1e", border: "#3b82f6" },
      { name: "Matte Black", hex: "#0f172a", border: "#334155" }
    ],
    features: ["1,500g Ultra-Grip Neodymium Magnets", "360° Ball Joint Rotation", "Active Cooling Fan", "Auto-Clamping Vent Hook", "RGB Ambient Breathing Light"],
    specs: {
      "Mount Type": "Dual Support (Air Vent Steel Hook + 3M Dashboard Base)",
      "Charging Speed": "15W Qi2 Wireless Fast Charging",
      "Holding Force": "Holds up to 1.5kg (pothole & sharp turn proof)",
      "Power Input": "USB-C 9V/2A or 12V/2A",
      "Included Accessories": "Dual-Port 45W Metal Car Charger Adapter + 4ft Cable",
      "Warranty": "2 Years Warranty"
    },
    description: "Keep your phone charged and in clear view on any journey. MagDrive Pro combines high-speed 15W Qi2 wireless charging with military-grade 1,500g magnetic attraction that stays locked in place over potholes and sharp corners."
  },
  {
    id: "voltx-diamond-screen-shield",
    name: "DiamondShield 9H+ Sapphire Glass (2-Pack)",
    tagline: "Zero-Dust Auto-Align Applicator Frame Included",
    category: "cases",
    categoryName: "Cases & Protection",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewCount: 654,
    badge: "Easy 10s Install",
    badgeType: "hot",
    image: "assets/images/titanium-case.jpg",
    gallery: [
      "assets/images/titanium-case.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 Ultra", "Google Pixel 9 Pro"],
    brandCompatibility: ["Apple", "Samsung", "Google"],
    inStock: true,
    stockCount: 85,
    colors: [
      { name: "Ultra HD Crystal Clear", hex: "#e0f2fe", border: "#38bdf8" },
      { name: "28° Privacy Anti-Spy", hex: "#1e293b", border: "#475569" }
    ],
    features: ["9H+ Sapphire Infused Hardness", "Auto-Alignment Tray (Bubble-Free in 10s)", "Electroplated Oleophobic Coating", "Edge-to-Edge 2.5D Curved Edge", "FaceID & Touch Precision"],
    specs: {
      "Pack Contents": "2x Screen Protectors + 1x Auto-Tray + 2x Cleaning Kits",
      "Hardness Level": "9H+ Sapphire Surface Coating (Scratch Resistant)",
      "Thickness": "0.33mm Japanese Asahi Tempered Glass",
      "Clarity": "99.99% Optical Grade Transparency",
      "Touch Response": "Instant 120Hz Touch Sensitivity",
      "Warranty": "Free Lifetime Replacement on Broken Protectors"
    },
    description: "Say goodbye to crooked installations and bubbles. Our revolutionary 10-second auto-align tray pulls the dust tab and applies the 9H+ sapphire-infused glass with robotic precision. Enjoy 99.99% crystal clarity and 3x shatter resistance."
  },
  {
    id: "voltx-braided-kevlar-cable",
    name: "KevlarArmor 240W USB-C to USB-C Cable (2m)",
    tagline: "50,000+ Bend Tested with E-Marker Smart Chip",
    category: "chargers",
    categoryName: "MagSafe Chargers",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviewCount: 410,
    badge: "50k Bend Proof",
    badgeType: "popular",
    image: "assets/images/gan-charger.jpg",
    gallery: [
      "assets/images/gan-charger.jpg"
    ],
    devices: ["iPhone 16 Series", "iPhone 15 Series", "MacBook Pro", "Samsung Galaxy S25 Ultra", "iPad Pro", "Universal USB-C Devices"],
    brandCompatibility: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    inStock: true,
    stockCount: 64,
    colors: [
      { name: "Armor Titanium Gray", hex: "#4b5563", border: "#6b7280" },
      { name: "Stealth Black", hex: "#111827", border: "#374151" },
      { name: "Neon Cyber Orange", hex: "#ea580c", border: "#f97316" }
    ],
    features: ["DuPont Kevlar Braided Core", "240W USB-PD 3.1 Fast Charge", "Certified E-Marker Smart Chip", "Zinc Alloy Metal Connectors", "Silicone Cable Organizer Strap Included"],
    specs: {
      "Power Delivery": "Up to 240W (48V / 5A) EPR Support",
      "Data Transfer": "USB 3.2 Gen 2 (10Gbps 4K Video Display)",
      "Length": "6.6 feet (2 meters)",
      "Durability": "Tested to withstand 50,000+ 90-degree bends & 80kg pull",
      "Connectors": "CNC Zinc Alloy Housing with Gold-Plated Pins",
      "Warranty": "5-Year Replacement Warranty"
    },
    description: "Built like a tank. Reinforced with genuine DuPont Kevlar fiber and housed in CNC zinc alloy jackets, this 240W cable easily powers your MacBook, iPad, iPhone, and Android flagship at maximum available charging speeds."
  },
  {
    id: "voltx-leather-wallet-stand",
    name: "MagWallet Pro with Find My Tracking & Adjustable Stand",
    tagline: "Top-Grain Italian Leather 4-Card Wallet & Kickstand",
    category: "cases",
    categoryName: "Cases & Protection",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviewCount: 176,
    badge: "Apple Find My",
    badgeType: "new",
    image: "assets/images/smart-powerbank.jpg",
    gallery: [
      "assets/images/smart-powerbank.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 / 12 Series", "Samsung S25 with MagCase"],
    brandCompatibility: ["Apple", "Samsung"],
    inStock: true,
    stockCount: 15,
    colors: [
      { name: "Saddle Tan Leather", hex: "#78350f", border: "#92400e" },
      { name: "Obsidian Black Leather", hex: "#1c1917", border: "#292524" },
      { name: "Forest Green Leather", hex: "#14532d", border: "#166534" }
    ],
    features: ["Built-In Apple Find My Smart Tracker", "Holds up to 4 Cards + Cash", "Adjustable 15° to 160° Kickstand", "RFID Anti-Theft Shielding", "3,200G Ultra-Strong Magnetic Locking"],
    specs: {
      "Tracking": "Apple Find My Certified (Ping with sound, locate anywhere)",
      "Battery": "Rechargeable via MagSafe (6 months battery life per charge)",
      "Card Capacity": "Up to 4 cards + thumb slot for easy ejection",
      "Kickstand Angles": "Portrait & Landscape modes from 15° to 160°",
      "Material": "Top-Grain Italian Nappa Leather + Zinc Hinge",
      "Warranty": "2 Years Replacement Warranty"
    },
    description: "Never lose your wallet again. Seamlessly track its location on Apple Find My, play a loud chime when misplaced, hold 4 cards with RFID protection, and prop your phone up in portrait or landscape for FaceTime or Netflix viewing."
  },
  {
    id: "voltx-lens-protector",
    name: "OpticShield Titanium Camera Lens Armor",
    tagline: "Corning Gorilla Glass with Anti-Glare Night Flare Shield",
    category: "cases",
    categoryName: "Cases & Protection",
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewCount: 289,
    badge: "HD Optics",
    badgeType: "popular",
    image: "assets/images/titanium-case.jpg",
    gallery: [
      "assets/images/titanium-case.jpg"
    ],
    devices: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max", "iPhone 15 Pro", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 Ultra"],
    brandCompatibility: ["Apple", "Samsung"],
    inStock: true,
    stockCount: 50,
    colors: [
      { name: "Natural Titanium", hex: "#9ca3af", border: "#d1d5db" },
      { name: "Black Titanium", hex: "#1f2937", border: "#374151" },
      { name: "Desert Titanium", hex: "#b45309", border: "#d97706" }
    ],
    features: ["Corning Gorilla Glass Lens Caps", "Aerospace Titanium Outer Rim", "Anti-Reflective Black Ring (Zero Flash Glare)", "99.9% Light Transmittance", "Individual Ring Precision Fit"],
    specs: {
      "Compatibility": "Precision engineered for triple-camera systems",
      "Glass Type": "Optical Grade Corning Gorilla Glass",
      "Ring Material": "Grade 5 Aerospace Titanium",
      "Anti-Reflective": "Night Circle AR coating prevents flash distortion",
      "Warranty": "Lifetime Replacement Warranty"
    },
    description: "Protect your expensive smartphone camera investment. Independent titanium rings and diamond-hard Corning glass shield lenses from scratches and cracks without sacrificing photo sharpness or causing night-time flash flares."
  },
  {
    id: "voltx-gimbal-stabilizer",
    name: "AuraGimbal AI Tracking 3-Axis Smartphone Gimbal",
    tagline: "Magnetic Quick-Snap Clamp with AI Gesture Tracking",
    category: "mounts",
    categoryName: "Car Mounts & Stands",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewCount: 164,
    badge: "AI Creator Pro",
    badgeType: "hot",
    image: "assets/images/car-mount.jpg",
    gallery: [
      "assets/images/car-mount.jpg"
    ],
    devices: ["iPhone 16 Series", "iPhone 15 Series", "Samsung Galaxy S25 / S24", "Google Pixel 9", "All Smartphones up to 300g"],
    brandCompatibility: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    inStock: true,
    stockCount: 8,
    colors: [
      { name: "Space Gray", hex: "#374151", border: "#4b5563" },
      { name: "Cyber White", hex: "#f3f4f6", border: "#e5e7eb" }
    ],
    features: ["Built-In AI Vision Face & Object Tracking", "Magnetic MagSafe Quick-Release Clamp", "Built-In Extendable Selfie Rod + Tripod Legs", "OLED Status Screen & Focus Wheel", "18h Battery Life & Reverse Charging"],
    specs: {
      "Stabilization": "3-Axis Motorized Stabilization (Anti-Shake 8.0)",
      "Payload Capacity": "Up to 320 grams (Supports Pro Max with heavy cases)",
      "Tracking Sensor": "Standalone AI Vision Camera (No app required for tracking)",
      "Built-in Fill Light": "3 Color Temps with 10 Brightness Levels",
      "Extension Rod": "215mm Aluminum Telescopic Rod",
      "Weight": "360 grams (Foldable Pocket Size)",
      "Warranty": "2-Year Warranty"
    },
    description: "Create cinematic vlogs and smooth tracking videos with zero camera shake. AuraGimbal features standalone AI vision sensor tracking, an integrated extendable tripod, and instant MagSafe magnetic snap-mounting."
  },
  {
    id: "voltx-travel-power-strip",
    name: "VoltStation 65W GaN Desktop Power Cube",
    tagline: "Universal 6-in-1 Compact Charging Hub with Surge Protector",
    category: "chargers",
    categoryName: "MagSafe Chargers",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 215,
    badge: "Travel Essential",
    badgeType: "popular",
    image: "assets/images/gan-charger.jpg",
    gallery: [
      "assets/images/gan-charger.jpg"
    ],
    devices: ["iPhone 16 / 15", "MacBook", "iPad", "Android Smartphones", "Desk Lamps & Laptops"],
    brandCompatibility: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    inStock: true,
    stockCount: 37,
    colors: [
      { name: "Matte Black", hex: "#18181b", border: "#27272a" },
      { name: "Clean White", hex: "#f4f4f5", border: "#e4e4e7" }
    ],
    features: ["2x AC Outlets + 2x USB-C + 2x USB-A", "65W GaN Fast Charging", "1700 Joules Surge Protection", "5ft Flat Braided Cord", "Angled 45° Flat Plug"],
    specs: {
      "Max AC Output": "1250W (125V / 10A)",
      "Max USB-C Output": "65W PD Fast Charge",
      "Total USB Output": "65W Max Shared",
      "Surge Rating": "1700 Joules",
      "Cable Length": "5 Feet (1.5m) Heavy-Duty Braided Flat Cord",
      "Dimensions": "65 x 65 x 65 mm (Compact Cube)",
      "Warranty": "3-Year Equipment Guarantee"
    },
    description: "Declutter your workspace and charge up to 6 devices simultaneously. Compact 65W GaN cube powers your laptop, phone, watch, and desk peripherals while protecting sensitive electronics with 1700 Joules surge defense."
  }
];

// Curated bundle items for the interactive Bundle Builder
const BUNDLE_ITEMS = {
  cases: [
    { id: "b-case-1", name: "AeroShield Titanium Case", price: 49.99, img: "assets/images/titanium-case.jpg" },
    { id: "b-case-2", name: "MagWallet Leather Stand Case", price: 39.99, img: "assets/images/smart-powerbank.jpg" }
  ],
  chargers: [
    { id: "b-charge-1", name: "AuraMag Pro 3-in-1 Station", price: 89.99, img: "assets/images/magsafe-station.jpg" },
    { id: "b-charge-2", name: "HyperGaN 140W Fast Charger", price: 64.99, img: "assets/images/gan-charger.jpg" },
    { id: "b-charge-3", name: "MagDrive Pro Car Mount Charger", price: 44.99, img: "assets/images/car-mount.jpg" }
  ],
  protection: [
    { id: "b-prot-1", name: "DiamondShield 9H+ Glass (2-Pack)", price: 24.99, img: "assets/images/titanium-case.jpg" },
    { id: "b-prot-2", name: "OpticShield Titanium Lens Armor", price: 18.99, img: "assets/images/titanium-case.jpg" }
  ],
  accessories: [
    { id: "b-acc-1", name: "VoltArc Slim 10k Power Bank", price: 54.99, img: "assets/images/smart-powerbank.jpg" },
    { id: "b-acc-2", name: "KevlarArmor 240W Braided Cable", price: 19.99, img: "assets/images/gan-charger.jpg" },
    { id: "b-acc-3", name: "AuraStudio ANC Pro Earbuds", price: 119.99, img: "assets/images/anc-earbuds.jpg" }
  ]
};

// Customer Reviews Database
const REVIEWS_DATA = [
  {
    id: "rev-1",
    author: "Alex Morgan",
    verified: true,
    device: "iPhone 16 Pro Max",
    product: "AuraMag Pro 3-in-1 Charging Station",
    rating: 5,
    date: "2 days ago",
    title: "Best MagSafe charging stand I have ever owned!",
    comment: "The magnetic pull is insanely strong and the cooling fan keeps my phone cold even when charging at the full 15W speed. The build quality feels like a $200 Apple luxury accessory. Desk looks 10x cleaner!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-2",
    author: "David Chen",
    verified: true,
    device: "Samsung Galaxy S25 Ultra",
    product: "HyperGaN 140W Cyber Charger + Cable",
    rating: 5,
    date: "4 days ago",
    title: "Charges my laptop and phone at blistering speeds",
    comment: "The real-time OLED wattage display is so satisfying to watch. Super fast charging 2.0 works flawlessly on my Galaxy and charges my 16 inch MacBook Pro simultaneously with zero heat throttling.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-3",
    author: "Elena Rostova",
    verified: true,
    device: "iPhone 16 Pro",
    product: "AeroShield Titanium Carbon Case",
    rating: 5,
    date: "1 week ago",
    title: "Dropped my phone on concrete with ZERO scratches!",
    comment: "Accidentally dropped my phone getting out of an Uber onto asphalt. The titanium bezel took the hit perfectly, not a single dent or crack. Carbon fiber feels super grippy and premium.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-4",
    author: "Marcus Brody",
    verified: true,
    device: "Google Pixel 9 Pro",
    product: "AuraStudio ANC Pro Wireless Earbuds",
    rating: 5,
    date: "2 weeks ago",
    title: "ANC rivals $300 headphones",
    comment: "Noise cancellation blocks out subway rumble completely. Spatial audio mode for watching movies on flights is astonishing. Battery life easily lasted my entire 14-hour flight with case top-ups.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
  }
];
