import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

const catalog = [
  // ---------------- Electronics / Mobiles ----------------
  {
    title: "Nova X12 5G Smartphone (128GB, Midnight Blue)",
    category: "Mobiles",
    brand: "Nova",
    price: 18999,
    originalPrice: 24999,
    stock: 42,
    description:
      "The Nova X12 packs a 6.5-inch AMOLED display, a 50MP triple camera system, and all-day battery life into a sleek aluminum body. 5G-ready and built for speed.",
    features: ["6.5\" AMOLED 120Hz display", "50MP triple camera", "5000mAh battery", "5G connectivity", "In-display fingerprint sensor"],
    specifications: { RAM: "8GB", Storage: "128GB", Processor: "Octa-core 2.4GHz", Battery: "5000mAh", OS: "Android 14" },
  },
  {
    title: "Nova X12 Pro 5G Smartphone (256GB, Graphite)",
    category: "Mobiles",
    brand: "Nova",
    price: 27999,
    originalPrice: 32999,
    stock: 30,
    description:
      "The Pro variant adds a telephoto lens, faster charging, and more storage for power users who demand the best from their daily driver.",
    features: ["6.7\" AMOLED 144Hz display", "50MP quad camera with telephoto", "5000mAh battery, 65W charging", "5G connectivity"],
    specifications: { RAM: "12GB", Storage: "256GB", Processor: "Octa-core 3.0GHz", Battery: "5000mAh", OS: "Android 14" },
  },
  {
    title: "AirWave Pro Wireless Earbuds with ANC",
    category: "Electronics",
    subCategory: "Audio",
    brand: "AirWave",
    price: 3499,
    originalPrice: 5999,
    stock: 120,
    description:
      "Immersive sound with active noise cancellation, a 30-hour battery case, and a snug, sweat-resistant fit for workouts and commutes alike.",
    features: ["Active Noise Cancellation", "30-hour total battery", "IPX5 sweat resistant", "Touch controls", "Fast charging"],
    specifications: { "Battery Life": "8h (earbuds) / 30h (case)", Connectivity: "Bluetooth 5.3", Weight: "4.5g per earbud" },
  },
  {
    title: "SoundCore Studio Over-Ear Headphones",
    category: "Electronics",
    subCategory: "Audio",
    brand: "SoundCore",
    price: 4999,
    originalPrice: 7499,
    stock: 65,
    description: "Studio-tuned drivers and plush memory-foam ear cushions deliver rich, balanced sound for long listening sessions.",
    features: ["40mm dynamic drivers", "40-hour battery", "Foldable design", "Built-in mic for calls"],
    specifications: { "Battery Life": "40 hours", Connectivity: "Bluetooth 5.2 / 3.5mm", Weight: "260g" },
  },
  {
    title: "PixelView 27\" QHD Monitor 144Hz",
    category: "Electronics",
    subCategory: "Monitors",
    brand: "PixelView",
    price: 21999,
    originalPrice: 27999,
    stock: 24,
    description: "A 27-inch QHD IPS panel with a 144Hz refresh rate, perfect for gaming, design work, and everyday productivity.",
    features: ["2560x1440 IPS panel", "144Hz refresh rate", "1ms response time", "AMD FreeSync"],
    specifications: { "Screen Size": "27 inch", Resolution: "2560x1440", "Refresh Rate": "144Hz", Ports: "HDMI x2, DisplayPort" },
  },
  {
    title: "TechDesk Compact 65% Mechanical Keyboard",
    category: "Electronics",
    subCategory: "Accessories",
    brand: "TechDesk",
    price: 3299,
    originalPrice: 4499,
    stock: 88,
    description: "A compact 65% layout mechanical keyboard with hot-swappable switches and per-key RGB lighting.",
    features: ["Hot-swappable switches", "Per-key RGB", "Compact 65% layout", "USB-C detachable cable"],
    specifications: { Switches: "Red linear (hot-swap)", Connectivity: "USB-C wired", Backlight: "RGB" },
  },
  {
    title: "GlideMouse Wireless Ergonomic Mouse",
    category: "Electronics",
    subCategory: "Accessories",
    brand: "TechDesk",
    price: 1299,
    originalPrice: 1999,
    stock: 150,
    description: "An ergonomic wireless mouse designed to reduce wrist strain during long work sessions, with silent clicks.",
    features: ["Ergonomic vertical design", "Silent clicks", "2.4GHz + Bluetooth", "3-month battery life"],
    specifications: { DPI: "800/1200/1600", Connectivity: "2.4GHz / Bluetooth", Battery: "AA x2" },
  },
  {
    title: "PowerBank Ultra 20000mAh Fast Charge",
    category: "Electronics",
    subCategory: "Accessories",
    brand: "VoltEdge",
    price: 1899,
    originalPrice: 2699,
    stock: 200,
    description: "Charge two devices at once with 20W fast charging and enough capacity for multiple full phone charges.",
    features: ["20000mAh capacity", "20W PD fast charging", "Dual USB-A + USB-C", "LED charge indicator"],
    specifications: { Capacity: "20000mAh", Output: "20W PD / 18W QC", Ports: "USB-C, USB-A x2" },
  },

  // ---------------- Laptops ----------------
  {
    title: "CoreBook 14 Ultraslim Laptop (i5, 16GB, 512GB SSD)",
    category: "Laptops",
    brand: "CoreBook",
    price: 54999,
    originalPrice: 64999,
    stock: 18,
    description: "A featherlight 14-inch laptop with all-day battery life, a crisp FHD display, and enough power for everyday multitasking.",
    features: ["14\" FHD IPS display", "Backlit keyboard", "Fingerprint reader", "18-hour battery life"],
    specifications: { Processor: "Intel Core i5-1235U", RAM: "16GB", Storage: "512GB SSD", Display: "14\" FHD", Weight: "1.3kg" },
  },
  {
    title: "CoreBook Pro 16 Creator Laptop (i7, 32GB, 1TB SSD)",
    category: "Laptops",
    brand: "CoreBook",
    price: 94999,
    originalPrice: 109999,
    stock: 12,
    description: "Built for creators and developers: a color-accurate 16-inch display, discrete graphics, and blazing-fast storage.",
    features: ["16\" 2.5K 120Hz display", "Discrete graphics", "Dual fans thermal system", "Thunderbolt 4"],
    specifications: { Processor: "Intel Core i7-13700H", RAM: "32GB", Storage: "1TB SSD", GPU: "6GB dedicated", Weight: "1.9kg" },
  },
  {
    title: "GameForge 15 Gaming Laptop (Ryzen 7, RTX-class GPU)",
    category: "Laptops",
    brand: "GameForge",
    price: 84999,
    originalPrice: 99999,
    stock: 15,
    description: "High refresh-rate gaming on the go, with a powerful discrete GPU and advanced cooling for sustained performance.",
    features: ["15.6\" 165Hz display", "RGB backlit keyboard", "Advanced dual-fan cooling", "Wi-Fi 6"],
    specifications: { Processor: "AMD Ryzen 7 7840HS", RAM: "16GB", Storage: "1TB SSD", GPU: "8GB dedicated", Display: "165Hz FHD" },
  },
  {
    title: "EduBook Air 11.6\" Student Laptop",
    category: "Laptops",
    brand: "EduBook",
    price: 21999,
    originalPrice: 27999,
    stock: 55,
    description: "Lightweight and durable, built for students who need reliable performance for classes, research, and streaming.",
    features: ["11.6\" HD display", "10-hour battery", "Lightweight 1.1kg body", "Fast SSD storage"],
    specifications: { Processor: "Intel Celeron N4500", RAM: "8GB", Storage: "256GB SSD", Weight: "1.1kg" },
  },

  // ---------------- Fashion ----------------
  {
    title: "Men's Classic Fit Oxford Shirt",
    category: "Fashion",
    subCategory: "Men",
    brand: "Urban Thread",
    price: 999,
    originalPrice: 1799,
    stock: 200,
    description: "A wardrobe staple woven from breathable cotton, tailored for a classic fit that pairs with everything from jeans to chinos.",
    features: ["100% cotton", "Classic fit", "Machine washable", "Button-down collar"],
    specifications: { Material: "100% Cotton", Fit: "Classic", Care: "Machine wash cold" },
  },
  {
    title: "Women's High-Waist Slim Fit Jeans",
    category: "Fashion",
    subCategory: "Women",
    brand: "Urban Thread",
    price: 1499,
    originalPrice: 2499,
    stock: 180,
    description: "Comfort-stretch denim with a flattering high-waist cut that moves with you all day long.",
    features: ["Comfort stretch denim", "High-waist fit", "Five-pocket styling"],
    specifications: { Material: "98% Cotton, 2% Elastane", Fit: "Slim", Care: "Machine wash cold" },
  },
  {
    title: "Men's Lightweight Bomber Jacket",
    category: "Fashion",
    subCategory: "Men",
    brand: "Northfield",
    price: 2799,
    originalPrice: 4299,
    stock: 90,
    description: "A versatile bomber jacket with a water-resistant shell, ribbed cuffs, and a warm quilted lining for cool evenings.",
    features: ["Water-resistant shell", "Ribbed cuffs and hem", "Quilted lining", "Zip pockets"],
    specifications: { Material: "Polyester shell", Fit: "Regular", Care: "Machine wash cold" },
  },
  {
    title: "Women's Floral Wrap Midi Dress",
    category: "Fashion",
    subCategory: "Women",
    brand: "Meadow Lane",
    price: 1899,
    originalPrice: 2999,
    stock: 110,
    description: "A flowing wrap midi dress in a soft floral print, cut from breathable rayon for warm-weather elegance.",
    features: ["Wrap silhouette", "Breathable rayon fabric", "Adjustable tie waist"],
    specifications: { Material: "100% Rayon", Fit: "Regular", Care: "Hand wash cold" },
  },
  {
    title: "Kids' Graphic Print Cotton T-Shirt (Pack of 3)",
    category: "Fashion",
    subCategory: "Kids",
    brand: "Little Sprout",
    price: 799,
    originalPrice: 1299,
    stock: 160,
    description: "Soft, breathable cotton tees with fun graphic prints, sold in a pack of three for effortless mixing and matching.",
    features: ["100% soft cotton", "Pack of 3", "Playful prints", "Tagless design"],
    specifications: { Material: "100% Cotton", "Pack Size": "3", Care: "Machine washable" },
  },

  // ---------------- Shoes ----------------
  {
    title: "Men's Cushioned Running Shoes",
    category: "Shoes",
    subCategory: "Men",
    brand: "StrideX",
    price: 2499,
    originalPrice: 3999,
    stock: 140,
    description: "Responsive foam cushioning and a breathable knit upper make these your go-to shoe for daily runs.",
    features: ["Breathable knit upper", "Responsive foam midsole", "Rubber outsole for grip"],
    specifications: { Material: "Knit mesh upper", "Sole Type": "Rubber", Closure: "Lace-up" },
  },
  {
    title: "Women's Everyday Slip-On Sneakers",
    category: "Shoes",
    subCategory: "Women",
    brand: "StrideX",
    price: 1799,
    originalPrice: 2699,
    stock: 130,
    description: "Effortless slip-on sneakers with a cushioned footbed, designed for all-day comfort without sacrificing style.",
    features: ["Slip-on design", "Cushioned footbed", "Lightweight sole"],
    specifications: { Material: "Canvas upper", "Sole Type": "EVA", Closure: "Slip-on" },
  },
  {
    title: "Men's Formal Leather Derby Shoes",
    category: "Shoes",
    subCategory: "Men",
    brand: "Cobbler & Co.",
    price: 3299,
    originalPrice: 4999,
        stock: 70,
    description: "Genuine leather derby shoes with a polished finish, built for the boardroom and beyond.",
    features: ["Genuine leather upper", "Cushioned insole", "Durable rubber sole"],
    specifications: { Material: "Genuine Leather", "Sole Type": "Rubber", Closure: "Lace-up" },
  },
  {
    title: "Unisex Trail Hiking Boots",
    category: "Shoes",
    subCategory: "Outdoor",
    brand: "Northfield",
    price: 3999,
    originalPrice: 5999,
    stock: 60,
    description: "Waterproof, rugged hiking boots with aggressive tread for confident footing on any trail.",
    features: ["Waterproof membrane", "Aggressive lug outsole", "Padded ankle collar"],
    specifications: { Material: "Synthetic + mesh", "Sole Type": "Rubber lug", Waterproof: "Yes" },
  },

  // ---------------- Home & Kitchen ----------------
  {
    title: "Stainless Steel 5-Piece Cookware Set",
    category: "Home & Kitchen",
    brand: "HearthCraft",
    price: 4499,
    originalPrice: 6999,
    stock: 45,
    description: "A tri-ply stainless steel cookware set that heats evenly and goes from stovetop to oven with ease.",
    features: ["Tri-ply construction", "Oven safe up to 260°C", "Dishwasher safe", "Includes lids"],
    specifications: { Material: "Stainless Steel", Pieces: "5", "Oven Safe": "Yes" },
  },
  {
    title: "12-Cup Programmable Coffee Maker",
    category: "Home & Kitchen",
    brand: "BrewPoint",
    price: 2999,
    originalPrice: 4499,
    stock: 55,
    description: "Wake up to fresh coffee with a 24-hour programmable timer, keep-warm plate, and reusable filter.",
    features: ["24-hour programmable timer", "Keep-warm plate", "Reusable filter", "Auto shut-off"],
    specifications: { Capacity: "12 cups", Power: "900W", Material: "Glass carafe" },
  },
  {
    title: "Robotic Vacuum Cleaner with App Control",
    category: "Home & Kitchen",
    brand: "CleanBot",
    price: 12999,
    originalPrice: 18999,
    stock: 34,
    description: "Smart mapping, app scheduling, and strong suction keep floors spotless with minimal effort.",
    features: ["Smart room mapping", "App + voice control", "Auto recharge and resume", "Slim design for under furniture"],
    specifications: { "Battery Life": "120 minutes", "Suction Power": "2500Pa", "Dustbin Capacity": "0.6L" },
  },
  {
    title: "Memory Foam Bed Pillow (Set of 2)",
    category: "Home & Kitchen",
    subCategory: "Bedding",
    brand: "CloudRest",
    price: 1599,
    originalPrice: 2499,
    stock: 100,
    description: "Contoured memory foam pillows that support your neck and shoulders for deeper, more restful sleep.",
    features: ["Contoured memory foam", "Breathable cover", "Set of 2", "Hypoallergenic"],
    specifications: { Material: "Memory Foam", "Pack Size": "2", Cover: "Bamboo blend" },
  },
  {
    title: "Non-Stick 3-Piece Frying Pan Set",
    category: "Home & Kitchen",
    brand: "HearthCraft",
    price: 1899,
    originalPrice: 2999,
    stock: 80,
    description: "Three essential pan sizes with a durable non-stick coating for everyday cooking with easy cleanup.",
    features: ["Non-stick coating", "Heat-resistant handles", "Suitable for all stovetops"],
    specifications: { Material: "Aluminum with non-stick coating", Pieces: "3", "Induction Compatible": "Yes" },
  },

  // ---------------- Beauty ----------------
  {
    title: "Vitamin C Brightening Face Serum",
    category: "Beauty",
    brand: "Lumina",
    price: 899,
    originalPrice: 1299,
    stock: 220,
    description: "A lightweight serum with 15% vitamin C to brighten skin tone and fade the look of dark spots over time.",
    features: ["15% Vitamin C", "Lightweight, fast-absorbing", "Suitable for all skin types"],
    specifications: { Volume: "30ml", "Skin Type": "All", "Key Ingredient": "Vitamin C" },
  },
  {
    title: "Hydrating Hyaluronic Acid Moisturizer",
    category: "Beauty",
    brand: "Lumina",
    price: 749,
    originalPrice: 1099,
    stock: 210,
    description: "A daily moisturizer that locks in hydration with hyaluronic acid, leaving skin plump and smooth.",
    features: ["Hyaluronic acid formula", "Non-greasy finish", "Fragrance-free"],
    specifications: { Volume: "50ml", "Skin Type": "All", "Key Ingredient": "Hyaluronic Acid" },
  },
  {
    title: "Professional Hair Dryer with Ionic Technology",
    category: "Beauty",
    brand: "GlowTech",
    price: 1999,
    originalPrice: 2999,
    stock: 75,
    description: "Salon-quality drying at home with ionic technology that reduces frizz and cuts drying time.",
    features: ["Ionic technology", "3 heat / 2 speed settings", "Cool shot button", "Lightweight design"],
    specifications: { Power: "2000W", Weight: "420g", Attachments: "Concentrator, diffuser" },
  },
  {
    title: "Matte Finish Lipstick Set (6 Shades)",
    category: "Beauty",
    brand: "Blush & Co.",
    price: 1299,
    originalPrice: 1999,
    stock: 140,
    description: "Six long-wearing matte shades that go from everyday neutrals to bold statement colors.",
    features: ["Long-wearing matte finish", "6-shade set", "Enriched with vitamin E"],
    specifications: { "Pack Size": "6", Finish: "Matte", "Skin Safe": "Dermatologically tested" },
  },

  // ---------------- Grocery ----------------
  {
    title: "Organic Extra Virgin Olive Oil (1L)",
    category: "Grocery",
    brand: "Terra Gold",
    price: 649,
    originalPrice: 899,
    stock: 300,
    description: "Cold-pressed, certified organic olive oil with a rich, fruity flavor ideal for cooking and dressings.",
    features: ["Certified organic", "Cold-pressed", "1L glass bottle"],
    specifications: { Volume: "1L", Type: "Extra Virgin", Certification: "Organic" },
  },
  {
    title: "Mixed Dry Fruits & Nuts Pack (1kg)",
    category: "Grocery",
    brand: "Harvest Basket",
    price: 999,
    originalPrice: 1399,
    stock: 250,
    description: "A hand-picked blend of almonds, cashews, walnuts, and raisins for a nutritious daily snack.",
    features: ["No added sugar or salt", "Resealable pack", "Rich in protein and fiber"],
    specifications: { Weight: "1kg", Ingredients: "Almonds, cashews, walnuts, raisins" },
  },
  {
    title: "Whole Wheat Pasta (Pack of 4)",
    category: "Grocery",
    brand: "Nonna's Kitchen",
    price: 399,
    originalPrice: 549,
    stock: 400,
    description: "Made from 100% whole wheat for extra fiber, without compromising on that classic pasta bite.",
    features: ["100% whole wheat", "High in fiber", "Pack of 4 x 400g"],
    specifications: { "Pack Size": "4 x 400g", Type: "Whole Wheat", Cook_Time: "9-11 minutes" },
  },
  {
    title: "Single-Origin Ground Coffee (500g)",
    category: "Grocery",
    brand: "Roast House",
    price: 749,
    originalPrice: 999,
    stock: 180,
    description: "Medium-roast, single-origin beans ground fresh for a smooth, aromatic cup every morning.",
    features: ["Single-origin beans", "Medium roast", "Freshly ground"],
    specifications: { Weight: "500g", Roast: "Medium", Origin: "Single-origin" },
  },

  // ---------------- Books ----------------
  {
    title: "The Silent Orchard — A Novel",
    category: "Books",
    subCategory: "Fiction",
    brand: "Fernbrook Press",
    price: 399,
    originalPrice: 599,
    stock: 90,
    description: "A gripping multi-generational family drama set against the backdrop of a fading countryside orchard.",
    features: ["Paperback", "412 pages", "Award-nominated fiction"],
    specifications: { Format: "Paperback", Pages: "412", Language: "English" },
  },
  {
    title: "Atomic Focus: A Practical Guide to Deep Work",
    category: "Books",
    subCategory: "Non-Fiction",
    brand: "Fernbrook Press",
    price: 449,
    originalPrice: 649,
    stock: 110,
    description: "Actionable strategies for building sustainable focus habits in a distraction-filled world.",
    features: ["Paperback", "256 pages", "Includes worksheets"],
    specifications: { Format: "Paperback", Pages: "256", Language: "English" },
  },
  {
    title: "The Beginner's Mind: Python Programming",
    category: "Books",
    subCategory: "Technology",
    brand: "CodeLeaf Publishing",
    price: 699,
    originalPrice: 999,
    stock: 130,
    description: "A hands-on introduction to Python programming for absolute beginners, with real-world projects.",
    features: ["Paperback + digital code", "38 hands-on projects", "Beginner friendly"],
    specifications: { Format: "Paperback", Pages: "480", Language: "English" },
  },
  {
    title: "Little Explorers: Under the Sea (Picture Book)",
    category: "Books",
    subCategory: "Children",
    brand: "Sunny Meadow Books",
    price: 299,
    originalPrice: 449,
    stock: 150,
    description: "A colorful picture book introducing young readers to ocean life, perfect for bedtime stories.",
    features: ["Hardcover", "32 pages", "Ages 3-7"],
    specifications: { Format: "Hardcover", Pages: "32", "Age Range": "3-7 years" },
  },

  // ---------------- Sports ----------------
  {
    title: "Adjustable Dumbbell Set (2.5-25kg per side)",
    category: "Sports",
    brand: "IronCore",
    price: 8999,
    originalPrice: 12999,
    stock: 28,
    description: "Space-saving adjustable dumbbells that replace an entire rack, adjustable in seconds via dial.",
    features: ["Quick-dial weight adjustment", "Replaces 15 pairs of dumbbells", "Compact storage tray included"],
    specifications: { "Weight Range": "2.5-25kg per side", Material: "Steel plates, plastic shell" },
  },
  {
    title: "Yoga Mat with Alignment Lines (6mm)",
    category: "Sports",
    brand: "ZenFlex",
    price: 999,
    originalPrice: 1499,
    stock: 200,
    description: "Extra-cushioned, non-slip yoga mat with printed alignment guides to help perfect your form.",
    features: ["6mm extra cushioning", "Non-slip texture", "Alignment guide lines", "Includes carry strap"],
    specifications: { Thickness: "6mm", Material: "TPE", Size: "183cm x 61cm" },
  },
  {
    title: "Official Size Basketball",
    category: "Sports",
    brand: "CourtKing",
    price: 1199,
    originalPrice: 1699,
    stock: 95,
    description: "Composite leather basketball with deep channel grooves for reliable indoor/outdoor grip.",
    features: ["Composite leather cover", "Deep channel design", "Official size and weight"],
        specifications: { Size: "7 (Official)", Material: "Composite leather", Use: "Indoor/Outdoor" },
  },
  {
    title: "Foldable Treadmill with Bluetooth Speakers",
    category: "Sports",
    brand: "CardioMax",
    price: 24999,
    originalPrice: 32999,
    stock: 16,
    description: "A space-saving foldable treadmill with 12 preset programs and built-in Bluetooth speakers for home workouts.",
    features: ["Foldable design", "12 preset programs", "Bluetooth speakers", "Max speed 14km/h"],
    specifications: { "Max Speed": "14km/h", "Motor Power": "2.5HP", "Max User Weight": "110kg" },
  },

  // ---------------- Accessories ----------------
  {
    title: "Genuine Leather Bifold Wallet",
    category: "Accessories",
    brand: "Cobbler & Co.",
    price: 899,
    originalPrice: 1399,
    stock: 180,
    description: "A slim bifold wallet crafted from genuine leather with RFID-blocking card slots.",
    features: ["Genuine leather", "RFID blocking", "6 card slots + bill compartment"],
    specifications: { Material: "Genuine Leather", Slots: "6 card + 1 bill", "RFID Protection": "Yes" },
  },
  {
    title: "Polarized Aviator Sunglasses",
    category: "Accessories",
    brand: "Southbay",
    price: 1299,
    originalPrice: 1999,
    stock: 120,
    description: "Classic aviator sunglasses with polarized lenses for glare-free clarity and full UV400 protection.",
    features: ["Polarized lenses", "UV400 protection", "Metal frame", "Includes protective case"],
    specifications: { "Lens Type": "Polarized", "UV Protection": "UV400", "Frame Material": "Alloy" },
  },
  {
    title: "Minimalist Automatic Watch",
    category: "Accessories",
    brand: "Sable & Stone",
    price: 4999,
    originalPrice: 7499,
    stock: 40,
    description: "A minimalist automatic watch with a sapphire crystal face and genuine leather strap.",
    features: ["Automatic movement", "Sapphire crystal", "Genuine leather strap", "5 ATM water resistance"],
    specifications: { Movement: "Automatic", "Water Resistance": "5 ATM", "Case Material": "Stainless steel" },
  },
  {
    title: "Canvas Laptop Backpack (15.6\")",
    category: "Accessories",
    brand: "Northfield",
    price: 1799,
    originalPrice: 2699,
    stock: 100,
    description: "A durable canvas backpack with a padded 15.6-inch laptop sleeve and multiple organizer pockets.",
    features: ["Padded 15.6\" laptop sleeve", "Water-resistant canvas", "USB charging port", "Multiple compartments"],
    specifications: { Material: "Canvas", "Laptop Size": "Up to 15.6\"", Capacity: "25L" },
  },
  {
    title: "Smart Fitness Tracker Band",
    category: "Electronics",
    subCategory: "Wearables",
    brand: "PulseFit",
    price: 1999,
    originalPrice: 2999,
    stock: 160,
    description: "Track steps, heart rate, sleep, and workouts with a bright AMOLED display and 10-day battery life.",
    features: ["Heart rate & SpO2 monitoring", "10-day battery life", "AMOLED display", "Water resistant 5ATM"],
    specifications: { Display: "AMOLED", "Battery Life": "10 days", "Water Resistance": "5 ATM" },
  },
  {
    title: "4K Ultra HD Smart TV (43-inch)",
    category: "Electronics",
    subCategory: "TVs",
    brand: "PixelView",
    price: 26999,
    originalPrice: 35999,
    stock: 22,
    description: "Vivid 4K HDR picture quality, built-in streaming apps, and voice remote for a complete home entertainment hub.",
    features: ["4K HDR display", "Built-in streaming apps", "Voice remote included", "3x HDMI, 2x USB"],
    specifications: { "Screen Size": "43 inch", Resolution: "3840x2160", HDR: "Yes", "Smart OS": "Built-in" },
  },
  {
    title: "Portable Bluetooth Party Speaker",
    category: "Electronics",
    subCategory: "Audio",
    brand: "SoundCore",
    price: 3999,
    originalPrice: 5999,
    stock: 70,
    description: "Room-filling sound with dynamic LED lighting, 18-hour battery, and IPX6 water resistance for outdoor parties.",
    features: ["18-hour battery", "IPX6 water resistant", "Dynamic LED lighting", "Bluetooth 5.3"],
    specifications: { "Battery Life": "18 hours", "Water Resistance": "IPX6", Connectivity: "Bluetooth 5.3" },
  },
  {
    title: "Ceramic Non-Stick Baking Tray Set (3-Piece)",
    category: "Home & Kitchen",
    brand: "HearthCraft",
    price: 1399,
    originalPrice: 1999,
    stock: 95,
    description: "Three ceramic-coated baking trays in essential sizes, PTFE and PFOA free for healthier baking.",
    features: ["Ceramic non-stick coating", "PTFE/PFOA free", "Oven safe up to 230°C"],
    specifications: { Material: "Carbon steel with ceramic coating", Pieces: "3", "Oven Safe": "230°C" },
  },
  {
    title: "Men's Slim Fit Chino Trousers",
    category: "Fashion",
    subCategory: "Men",
    brand: "Urban Thread",
    price: 1299,
    originalPrice: 1999,
    stock: 170,
    description: "Versatile slim fit chinos in stretch cotton twill, equally at home in the office or on weekends.",
    features: ["Stretch cotton twill", "Slim fit", "Four-pocket styling"],
    specifications: { Material: "97% Cotton, 3% Elastane", Fit: "Slim", Care: "Machine wash cold" },
  },
];

const getImageKeywords = (title, category, subCategory = "") => {
  const t = title.toLowerCase();

  if (t.includes("smartphone")) return "smartphone,phone";
  if (t.includes("earbuds")) return "wireless,earbuds";
  if (t.includes("headphones")) return "headphones,audio";
  if (t.includes("monitor")) return "computer,monitor";
  if (t.includes("keyboard")) return "mechanical,keyboard";
  if (t.includes("mouse")) return "computer,mouse";
  if (t.includes("powerbank")) return "powerbank,charger";
  if (t.includes("gaming laptop")) return "gaming,laptop";
  if (t.includes("laptop")) return "laptop,computer";
  if (t.includes("shirt")) return "shirt,clothing";
  if (t.includes("jeans")) return "jeans,denim";
  if (t.includes("jacket")) return "jacket,fashion";
  if (t.includes("dress")) return "dress,fashion";
  if (t.includes("t-shirt")) return "tshirt,clothing";
  if (t.includes("running shoes")) return "running,shoes";
  if (t.includes("sneakers")) return "sneakers,shoes";
  if (t.includes("derby shoes")) return "formal,shoes";
  if (t.includes("hiking boots")) return "hiking,boots";
  if (t.includes("cookware")) return "cookware,kitchen";
  if (t.includes("coffee maker")) return "coffee,maker";
  if (t.includes("vacuum")) return "robot,vacuum";
  if (t.includes("pillow")) return "pillow,bedding";
  if (t.includes("frying pan")) return "fryingpan,kitchen";
  if (t.includes("baking tray")) return "baking,kitchen";
  if (t.includes("serum")) return "skincare,serum";
  if (t.includes("moisturizer")) return "skincare,moisturizer";
  if (t.includes("hair dryer")) return "hairdryer,beauty";
  if (t.includes("lipstick")) return "lipstick,cosmetics";
  if (t.includes("olive oil")) return "oliveoil,grocery";
  if (t.includes("dry fruits")) return "nuts,dryfruits";
  if (t.includes("pasta")) return "pasta,grocery";
  if (t.includes("coffee")) return "coffee,beans";
  if (t.includes("novel")) return "book,novel";
  if (t.includes("python programming")) return "programming,book";
  if (t.includes("picture book")) return "children,book";
  if (t.includes("dumbbell")) return "dumbbell,fitness";
  if (t.includes("yoga mat")) return "yoga,mat";
  if (t.includes("basketball")) return "basketball,sport";
  if (t.includes("treadmill")) return "treadmill,fitness";
  if (t.includes("wallet")) return "leather,wallet";
  if (t.includes("sunglasses")) return "sunglasses";
  if (t.includes("watch")) return "watch";
  if (t.includes("backpack")) return "laptop,backpack";
  if (t.includes("fitness tracker")) return "fitness,smartwatch";
  if (t.includes("smart tv")) return "smart,tv";
  if (t.includes("party speaker")) return "bluetooth,speaker";

  const categoryKeywords = {
    Mobiles: "smartphone,mobile",
    Laptops: "laptop,computer",
    Electronics: "electronics,gadget",
    Fashion: "fashion,clothing",
    Shoes: "shoes,footwear",
    "Home & Kitchen": "kitchen,home",
    Beauty: "beauty,cosmetics",
    Grocery: "grocery,food",
    Books: "books",
    Sports: "sports,fitness",
    Accessories: "fashion,accessories",
  };

  return categoryKeywords[category] || "shopping,product";
};

const CATEGORY_IMAGE_POOLS = {
  Mobiles: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=85"
  ],
  Laptops: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1496180727794-817822f65950?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=85"
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=900&q=85"
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85"
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85"
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85"
  ],
  Grocery: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1601598851547-4302969d6a0b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85"
  ],
  Books: [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85"
  ],
  Sports: [
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85"
  ]
};

const buildImages = (title, category, subCategory = "") => {
  const pool =
    CATEGORY_IMAGE_POOLS[category] ||
    CATEGORY_IMAGE_POOLS.Electronics;

  const seed = Array.from(`${title}-${subCategory}`)
    .reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0
    );

  const first = seed % pool.length;

  return [0, 1, 2].map(
    (offset) =>
      pool[(first + offset) % pool.length]
  );
};

const PRODUCT_LIBRARY = {
  Mobiles: {
    brands: [
      "Nova",
      "PixelOne",
      "Astra",
      "ZenMobile",
      "Orbit",
      "Vertex"
    ],
    names: [
      "5G Smartphone",
      "Pro 5G Smartphone",
      "Max Smartphone",
      "Lite Smartphone",
      "Ultra Smartphone"
    ],
    subs: [
      "Smartphones",
      "Android Phones"
    ],
    base: 12999,
    step: 3500,
    features: [
      "AMOLED display",
      "Fast charging",
      "5G connectivity",
      "Dual SIM",
      "High-resolution camera"
    ]
  },

  Laptops: {
    brands: [
      "CoreBook",
      "GameForge",
      "EduBook",
      "TechNova",
      "WorkMate",
      "AeroByte"
    ],
    names: [
      "Ultraslim Laptop",
      "Pro Laptop",
      "Gaming Laptop",
      "Creator Laptop",
      "Student Laptop"
    ],
    subs: [
      "Everyday",
      "Gaming",
      "Business",
      "Creator"
    ],
    base: 28999,
    step: 9000,
    features: [
      "Full HD display",
      "Fast SSD storage",
      "Backlit keyboard",
      "Wi-Fi 6",
      "Long battery life"
    ]
  },

  Electronics: {
    brands: [
      "AirWave",
      "SoundCore",
      "PixelView",
      "TechDesk",
      "VoltEdge",
      "SmartLife"
    ],
    names: [
      "Wireless Earbuds",
      "Over-Ear Headphones",
      "QHD Monitor",
      "Mechanical Keyboard",
      "Wireless Mouse",
      "Fast Charge Power Bank",
      "Bluetooth Speaker",
      "Smart TV"
    ],
    subs: [
      "Audio",
      "Monitors",
      "Accessories",
      "Smart Home"
    ],
    base: 999,
    step: 1700,
    features: [
      "Bluetooth connectivity",
      "Fast charging",
      "Premium build",
      "Low-latency mode",
      "One-year warranty"
    ]
  },

  Fashion: {
    brands: [
      "Urban Thread",
      "Northfield",
      "Meadow Lane",
      "StyleCraft",
      "Everyday Edit",
      "Little Sprout"
    ],
    names: [
      "Classic Fit Shirt",
      "High-Waist Jeans",
      "Lightweight Jacket",
      "Casual Hoodie",
      "Cotton T-Shirt",
      "Wrap Midi Dress",
      "Relaxed Chinos",
      "Printed Kurta"
    ],
    subs: [
      "Men",
      "Women",
      "Kids"
    ],
    base: 599,
    step: 500,
    features: [
      "Comfort fabric",
      "Regular fit",
      "Machine washable",
      "Everyday design",
      "Soft finish"
    ]
  },

  Shoes: {
    brands: [
      "Stride",
      "UrbanStep",
      "PeakRun",
      "TrailPro",
      "WalkEasy",
      "StreetFlex"
    ],
    names: [
      "Running Shoes",
      "Everyday Sneakers",
      "Walking Shoes",
      "Hiking Boots",
      "Casual Slip-Ons",
      "Formal Derby Shoes",
      "Training Shoes"
    ],
    subs: [
      "Men",
      "Women",
      "Sports",
      "Casual"
    ],
    base: 899,
    step: 650,
    features: [
      "Cushioned sole",
      "Breathable upper",
      "Lightweight construction",
      "Durable outsole",
      "Comfort fit"
    ]
  },

  "Home & Kitchen": {
    brands: [
      "HomeEase",
      "KitchenPro",
      "CasaLiving",
      "CookMate",
      "PureHome",
      "NestCraft"
    ],
    names: [
      "Non-Stick Cookware Set",
      "Coffee Maker",
      "Robot Vacuum",
      "Memory Foam Pillow",
      "Frying Pan",
      "Baking Tray",
      "Storage Container Set",
      "Table Lamp"
    ],
    subs: [
      "Kitchen",
      "Home Decor",
      "Cleaning",
      "Bedding"
    ],
    base: 499,
    step: 850,
    features: [
      "Easy to clean",
      "Durable material",
      "Modern design",
      "Energy efficient",
      "Space saving"
    ]
  },

  Beauty: {
    brands: [
      "GlowLab",
      "PureSkin",
      "Velvet Beauty",
      "Bloom",
      "AuraCare",
      "LumiCos"
    ],
    names: [
      "Vitamin C Serum",
      "Daily Moisturizer",
      "Hair Dryer",
      "Matte Lipstick",
      "Face Wash",
      "Sunscreen SPF 50",
      "Body Lotion",
      "Makeup Brush Set"
    ],
    subs: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Personal Care"
    ],
    base: 299,
    step: 350,
    features: [
      "Dermatologically tested",
      "Lightweight formula",
      "Suitable for daily use",
      "Gentle ingredients",
      "Long-lasting"
    ]
  },

  Grocery: {
    brands: [
      "FreshFarm",
      "DailyHarvest",
      "PureGrain",
      "KitchenBasket",
      "GreenField",
      "GoodChoice"
    ],
    names: [
      "Extra Virgin Olive Oil",
      "Premium Basmati Rice",
      "Arabica Coffee Beans",
      "Whole Wheat Pasta",
      "Mixed Dry Fruits",
      "Organic Honey",
      "Green Tea",
      "Breakfast Cereal"
    ],
    subs: [
      "Staples",
      "Beverages",
      "Snacks",
      "Organic"
    ],
    base: 149,
    step: 180,
    features: [
      "Quality checked",
      "Fresh packaging",
      "Premium ingredients",
      "Everyday essential",
      "Easy storage"
    ]
  },

  Books: {
    brands: [
      "PageTurner",
      "Classic Reads",
      "LearnWell",
      "BrightMind",
      "StoryHouse",
      "Knowledge Press"
    ],
    names: [
      "Programming Fundamentals",
      "Mystery Novel",
      "Personal Finance Guide",
      "Picture Book",
      "Data Science Handbook",
      "Business Strategy",
      "Self Improvement Guide",
      "Travel Stories"
    ],
    subs: [
      "Fiction",
      "Education",
      "Business",
      "Children",
      "Self Help"
    ],
    base: 199,
    step: 150,
    features: [
      "Paperback edition",
      "Easy to read",
      "Popular title",
      "Quality print",
      "Great for gifting"
    ]
  },

  Sports: {
    brands: [
      "FitPro",
      "ActiveGear",
      "PeakMotion",
      "SportEdge",
      "PowerFlex",
      "Arena"
    ],
    names: [
      "Adjustable Dumbbells",
      "Yoga Mat",
      "Training Basketball",
      "Running Treadmill",
      "Resistance Bands",
      "Football",
      "Cricket Bat",
      "Skipping Rope"
    ],
    subs: [
      "Fitness",
      "Running",
      "Team Sports",
      "Outdoor"
    ],
    base: 399,
    step: 900,
    features: [
      "Durable construction",
      "Non-slip grip",
      "Lightweight",
      "Easy to store",
      "Workout ready"
    ]
  },

  Accessories: {
    brands: [
      "UrbanCarry",
      "TimeCraft",
      "LeatherWorks",
      "VisionPro",
      "TravelMate",
      "Everyday Gear"
    ],
    names: [
      "Leather Wallet",
      "Classic Watch",
      "Laptop Backpack",
      "Polarized Sunglasses",
      "Travel Organizer",
      "Card Holder",
      "Crossbody Bag",
      "Laptop Sleeve"
    ],
    subs: [
      "Bags",
      "Watches",
      "Travel",
      "Personal Accessories"
    ],
    base: 399,
    step: 500,
    features: [
      "Premium finish",
      "Durable material",
      "Compact design",
      "Everyday use",
      "Gift-ready packaging"
    ]
  }
};

const TARGET_PER_CATEGORY = 50;

const generatedProducts = [];

for (
  const [category, config]
  of Object.entries(PRODUCT_LIBRARY)
) {
  const existingCount =
    catalog.filter(
      (product) =>
        product.category === category
    ).length;

  const needed = Math.max(
    0,
    TARGET_PER_CATEGORY - existingCount
  );

  for (
    let i = 0;
    i < needed;
    i += 1
  ) {
    const brand =
      config.brands[
        i % config.brands.length
      ];

    const productName =
      config.names[
        i % config.names.length
      ];

    const subCategory =
      config.subs[
        i % config.subs.length
      ];

    const variant =
      Math.floor(
        i / config.names.length
      ) + 1;

    const price =
      config.base +
      (i % 10) * config.step;

    const originalPrice =
      Math.round(
        price *
          (1.15 + ((i % 5) * 0.05))
      );

    generatedProducts.push({
      title:
        `${brand} ${productName} ${
          variant > 1
            ? `Series ${variant}`
            : ""
        }`
          .replace(/\s+/g, " ")
          .trim(),

      category,

      subCategory,

      brand,

      price,

      originalPrice,

      stock:
        20 +
        ((i * 17) % 180),

      description:
        `${brand} ${productName} designed for reliable everyday use with a practical design, dependable performance and excellent value.`,

      features:
        config.features,

      specifications: {
        Category: subCategory,
        Brand: brand,
        Warranty: "1 year",
        "Model Series":
          `${brand}-${String(
            i + 1
          ).padStart(3, "0")}`
      }
    });
  }
}

const catalogWithMoreProducts = [
  ...catalog,
  ...generatedProducts
];

const products =
  catalogWithMoreProducts.map(
    (p, index) => ({
      ...p,

      images:
        buildImages(
          p.title,
          p.category,
          p.subCategory
        ),

      rating:
        Number(
          (
            4.0 +
            ((index * 7) % 10) / 10
          ).toFixed(1)
        ),

      numReviews:
        25 +
        ((index * 37) % 850),

      isFeatured:
        index % 5 === 0,

      isBestSeller:
        index % 7 === 0
    })
  );

const adminUser = {
  name: "ShopSphere Admin",
  email: "admin@shopsphere.dev",
  password: "Admin@123",
  role: "admin",
  phone: "9999999999"
};

const demoUser = {
  name: "Demo Shopper",
  email: "demo@shopsphere.dev",
  password: "Demo@123",
  role: "user",
  phone: "8888888888"
};

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await User.deleteMany({
      email: {
        $in: [
          adminUser.email,
          demoUser.email
        ]
      }
    });

    await User.create(adminUser);

    await User.create(demoUser);

    await Product.insertMany(
      products
    );

    console.log(
      `Seed complete: ${products.length} products, 2 users created.`
    );

    console.log(
      `Admin login -> email: ${adminUser.email} / password: ${adminUser.password}`
    );

    console.log(
      `Demo login  -> email: ${demoUser.email} / password: ${demoUser.password}`
    );

    process.exit(0);

  } catch (error) {

    console.error(
      `Seeding error: ${error.message}`
    );

    process.exit(1);
  }
};

const destroyData = async () => {
  try {

    await connectDB();

    await Product.deleteMany();

    await User.deleteMany();

    console.log(
      "All data destroyed."
    );

    process.exit(0);

  } catch (error) {

    console.error(
      `Error destroying data: ${error.message}`
    );

    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedData();
}