import { pool } from './database.js';
import bcrypt from 'bcryptjs';

export const all12Services = [
  {
    id: 's1',
    slug: 'general-bike-service',
    name: 'General Bike Service',
    marathi_name: 'जनरल बाईक सर्व्हिसिंग',
    icon_name: 'Wrench',
    short_description: 'Complete periodic tune-up, oil check & 24-point safety inspection',
    full_description: 'Comprehensive periodic servicing for all motorcycles and commuter bikes (फक्त मोटरसायकल व बाईक — स्कूटर/मोपेड नाही). Includes 24-point safety inspection, engine oil replacement, spark plug cleaning, carburetor/throttle body cleaning, brake adjustment, drive chain lubrication, and high-pressure foam wash.',
    included: [
      'Engine oil replacement & oil strainer clean',
      'Spark plug cleaning and electrode gap adjustment',
      'Air filter cleaning / replacement check',
      'Front and rear brake shoe / pad inspection',
      'Drive chain cleaning, slack adjustment & lubrication',
      'Clutch free-play & throttle cable lubrication',
      'Nut-bolt tightening & chassis torque check',
      'Complete foam wash & polish',
    ],
    estimated_time: '2 - 3 Hours',
    price_starting_at: '₹349',
    category: 'maintenance',
    image_url: '/images/services/general-service.jpg',
    is_popular: true,
    sort_order: 1,
  },
  {
    id: 's2',
    slug: 'premium-bike-service',
    name: 'Premium Bike Servicing Package',
    marathi_name: 'प्रीमियम बाईक सर्व्हिसिंग पॅकेज',
    icon_name: 'Sparkles',
    short_description: 'To improve your bike’s performance, mileage, and engine life with deep engine flush, additive & full tune-up',
    full_description: 'To improve your bike’s performance, mileage, and engine life, we offer our Premium Bike Servicing Package at Chaudhari Auto, Pahur (Tal. Jamner, Dist. Jalgaon). Complete general inspection, engine oil replacement, engine flush to clean carbon deposits, engine oil additive for maximum smoothness, chain cleaning & lubing, and full 12-point road testing.',
    included: [
      'Complete Bike Inspection (General Inspection)',
      'Engine Oil Replacement',
      'Air Filter, Oil Filter & Petrol Filter Inspection',
      'Chain Cleaning & Chain Lubrication',
      'Brake Inspection & Adjustment',
      'Clutch & Accelerator Cable Inspection',
      'Battery & Electrical System Inspection',
      'Tyre Air Pressure & Tyre Condition Check',
      'Engine Flush to clean carbon deposits and dirt from the engine',
      'Engine Oil Additive for improved engine smoothness and protection',
      'Complete Nut & Bolt Tightening',
      'Road Test & Final Quality Inspection',
    ],
    package_breakdown: [
      { item: 'Premium Service (Labour)', price: '₹350/-' },
      { item: 'Engine Oil', price: '₹605/-' },
      { item: 'Chain Lube', price: '₹195/-' },
      { item: 'Chain Cleaner', price: '₹170/-' },
      { item: 'Engine Oil Additive', price: '₹265/-' },
      { item: 'Engine Flush', price: '₹235/-' },
      { item: 'Filter (Air / Oil / Petrol)', price: 'As Required' },
    ],
    benefits: [
      'Helps improve engine performance and power',
      'Makes the engine smoother and quieter',
      'Helps improve mileage',
      'Increases the life of the chain and sprocket',
      'Reduces carbon deposits and dirt inside the engine',
      'Helps reduce the chances of major repair expenses in the future',
      'Makes your bike safer and more reliable',
    ],
    important_note: 'If any additional spare part needs to be replaced during servicing, the cost will be added separately to the final bill. No additional work will be carried out without the customer’s prior approval.',
    estimated_time: '3 - 4 Hours',
    price_starting_at: '₹1,820',
    category: 'maintenance',
    image_url: '/images/services/premium-service.jpg',
    is_popular: true,
    sort_order: 2,
  },
  {
    id: 's3',
    slug: 'engine-repair',
    name: 'Engine Repair',
    marathi_name: 'इंजिन रिपेअर व ओव्हरहॉल',
    icon_name: 'Cpu',
    short_description: 'Precision cylinder boring, piston fitting, valves & gearbox overhaul',
    full_description: 'Expert engine rebuilding, cylinder re-boring, piston ring replacement, crankshaft truing, valve lapping, timing chain replacement, and gearbox overhauls for all 2-stroke and 4-stroke two-wheelers.',
    included: [
      'Engine block dismantling & decarbonization',
      'Cylinder bore measurement & piston ring fitting',
      'Inlet/exhaust valve grinding & oil seal renewal',
      'Crankshaft bearing & connecting rod check',
      'Timing chain & tensioner replacement',
      'New OEM engine gasket kit & oil seals',
    ],
    estimated_time: '1 - 2 Days',
    price_starting_at: '₹1,299',
    category: 'repair',
    image_url: '/images/services/engine-repair.jpg',
    is_popular: true,
    sort_order: 3,
  },
  {
    id: 's4',
    slug: 'oil-change',
    name: 'Oil Change',
    marathi_name: 'इंजिन ऑइल चेंज',
    icon_name: 'Droplets',
    short_description: 'Genuine mineral & synthetic 4T/2T lubricants with filter replacement',
    full_description: 'Genuine mineral, semi-synthetic, and fully synthetic engine oil change with Motul, Castrol Power1, Shell Advance, and HP lubricants. Includes new oil filter and drain bolt crush washer.',
    included: [
      'Complete drain of degraded engine oil',
      'New OEM oil filter replacement',
      'Magnetic sump plug cleaning & washer change',
      'Accurate oil grade refill (10W-30, 20W-40, 15W-50)',
      'Engine sound & idle RPM calibration',
    ],
    estimated_time: '20 Minutes',
    price_starting_at: '₹299',
    category: 'maintenance',
    image_url: '/images/services/oil-change.jpg',
    is_popular: false,
    sort_order: 4,
  },
  {
    id: 's5',
    slug: 'brake-service',
    name: 'Brake Service',
    marathi_name: 'ब्रेक सर्व्हिसिंग',
    icon_name: 'Disc',
    short_description: 'Disc pads, shoe liners, master cylinder service & fluid bleeding',
    full_description: 'Complete braking system servicing for drum and disc two-wheelers. Brake pad replacement, drum liner inspection, caliper pin greasing, disc rotor trueing, and DOT4 brake fluid bleeding.',
    included: [
      'Front disc brake caliper cleaning & pin greasing',
      'Rear drum brake shoe inspection & de-glazing',
      'Hydraulic brake fluid flush & air bleeding',
      'Brake lever play adjustment & stop-switch check',
      'Road testing for immediate bite & stopping safety',
    ],
    estimated_time: '45 Minutes',
    price_starting_at: '₹199',
    category: 'repair',
    image_url: '/images/services/brake-service.jpg',
    is_popular: true,
    sort_order: 5,
  },
  {
    id: 's6',
    slug: 'battery-service',
    name: 'Battery Service',
    marathi_name: 'बॅटरी तपासणी व सर्व्हिस',
    icon_name: 'BatteryCharging',
    short_description: 'Digital load testing, terminal cleaning & genuine warranty sales',
    full_description: 'Digital battery load testing, alternator magneto charging inspection, starter motor rebuilding, wiring harness troubleshooting, LED headlight installation, and horn/indicator repairs.',
    included: [
      'Digital battery CCA and voltage load test',
      'RR Unit (Regulator Rectifier) output check',
      'Starter motor carbon brush & bendix gear service',
      'Genuine Exide & Amaron bike battery sales with warranty',
    ],
    estimated_time: '30 Minutes',
    price_starting_at: '₹150',
    category: 'repair',
    image_url: '/images/services/battery-service.jpg',
    is_popular: false,
    sort_order: 6,
  },
  {
    id: 's7',
    slug: 'tyre-wheel',
    name: 'Tyre & Wheel',
    marathi_name: 'टायर आणि व्हील सर्व्हिस',
    icon_name: 'CircleDot',
    short_description: 'MRF/CEAT tyre fitting, tubeless punctures & classic spoke wheel truing',
    full_description: 'Motorcycle tyre replacement (MRF, CEAT, TVS, Apollo), tubeless puncture repairs with mushroom plugs, rim dent removal, and precision classic spoke wheel truing on lathe stands.',
    included: [
      'Front and rear tyre tread & sidewall inspection',
      'Tubeless tyre puncture repair & valve replacement',
      'Classic spoke wheel alignment & tensioning',
      'Alloy rim bend inspection & bearing check',
      'Accurate tyre pressure calibration',
    ],
    estimated_time: '30 Minutes',
    price_starting_at: '₹99',
    category: 'repair',
    image_url: '/images/services/tyre-wheel.jpg',
    is_popular: false,
    sort_order: 7,
  },
  {
    id: 's8',
    slug: 'electrical-repair',
    name: 'Electrical Repair',
    marathi_name: 'इलेक्ट्रिकल रिपेअर',
    icon_name: 'Zap',
    short_description: 'Full wiring harness trace, self-start troubleshooting & LED upgrades',
    full_description: 'Diagnostic scanning and repairs for motorcycle starting trouble, CDI/ECU units, ignition coils, handlebar switchgear, indicators, and bright LED headlamp conversions.',
    included: [
      'Wiring harness short circuit diagnostic',
      'Starter relay & solenoid switch testing',
      'Handlebar switchgear contact cleaning',
      'Spark plug cap & HT coil resistance check',
    ],
    estimated_time: '45 Minutes',
    price_starting_at: '₹199',
    category: 'repair',
    image_url: '/images/services/electrical-repair.jpg',
    is_popular: false,
    sort_order: 8,
  },
  {
    id: 's9',
    slug: 'bike-painting',
    name: 'Bike Painting',
    marathi_name: 'बाईक पेंटिंग व कोटिंग',
    icon_name: 'Sparkle',
    short_description: 'High-gloss 2K PU painting, tank dent removal & classic graphics',
    full_description: 'Professional two-wheeler paint booth finishes. Fuel tank dent removal, anti-rust epoxy priming, metallic and candy basecoats, factory pinstriping, and scratch-resistant 2K clearcoats.',
    included: [
      'Precision dent removal on tank & mudguards',
      'Anti-corrosion epoxy primer coat',
      'Computerized color match & 2K PU painting',
      'Clearcoat gloss mirror polishing',
    ],
    estimated_time: '3 - 5 Days',
    price_starting_at: '₹1,499',
    category: 'cosmetic',
    image_url: '/images/services/bike-painting.jpg',
    is_popular: false,
    sort_order: 9,
  },
  {
    id: 's10',
    slug: 'bike-restoration',
    name: 'Bike Restoration (100cc & 150cc)',
    marathi_name: 'बाईक रिस्टोरेशन (१००सीसी व १५०सीसी)',
    icon_name: 'PackageCheck',
    short_description: 'Bringing vintage & standard motorcycles back to showroom condition with oven paint & ceramic coating',
    full_description: 'At Chaudhari Auto Centre, bike restoration is not just about repairing an old motorcycle. Our goal is to bring back its original beauty, performance, and finish while giving every detail the attention it deserves. Standard quotations available for 100cc (₹18,850 base / ₹20,000+ showroom) and 150cc (₹24,500 base / ₹25,000+ showroom) motorcycles.',
    included: [
      'Complete Inspection — Thorough inspection of every single part before restoration begins',
      'Colour and Ceramic Coating — Oven / bhatti paint baking process for factory gloss',
      'Assemble Full Bike Fitting — Precision disassembly, chassis alignment & reassembly',
      'Stickers / Monogram — OEM tank, side panel & tail badges',
      'Original Fibre Kit — Headlight visor, front mudguard, side panels, tail panel, rear mudguard',
      'Showroom Condition Overhaul — Detailed finishing, chrome buffing & multi-point road test',
    ],
    package_breakdown: [
      { item: '100cc: Colour and Ceramic Coating', price: '₹8,500/-' },
      { item: '100cc: Assemble Full Bike Fitting', price: '₹6,000/-' },
      { item: '100cc: Stickers / Monogram', price: '₹850/-' },
      { item: '100cc: Original Fibre Kit (Visor, Mudguards, Panels)', price: '₹3,500/-' },
      { item: '100cc: Fixed Base Cost (Evdhe paise fix lagtil)', price: '₹18,850/-' },
      { item: '100cc: Showroom Condition Total Estimate', price: 'Min ₹20,000+' },
      { item: '150cc: Colour and Ceramic Coating', price: '₹9,000/-' },
      { item: '150cc: Assemble Full Bike Fitting', price: '₹7,000/-' },
      { item: '150cc: Stickers / Monogram', price: '₹1,000/-' },
      { item: '150cc: Original Fibre Kit (Visor, Mudguards, Panels)', price: '₹7,500/-' },
      { item: '150cc: Fixed Base Cost (Evdhe paise fix lagtil)', price: '₹24,500/-' },
      { item: '150cc: Showroom Condition Total Estimate', price: 'Min ₹25,000+' },
    ],
    benefits: [
      '100cc Showroom Condition: Minimum ₹20,000+ estimated total cost',
      '150cc Showroom Condition: Minimum ₹25,000+ estimated total cost',
      'Professional Oven/Furnace Paint process for lasting factory shine',
      'Protective ceramic coating layer against scratches, dust & UV damage',
      'Complete disassembly down to the bare chassis, cleaning & precision torque fitting',
      '100% original fiber body panels and genuine OEM badging',
    ],
    important_note: 'Evdhe paise fix lagtil. Other spare parts takayche astil tr separate charges dyave lagel. 100cc bike la Showroom condition karaychi aslyas minimum ₹20,000+ evdha kharch yeu shakto, aani 150cc bike la minimum ₹25,000+ evdha kharch yeu shakto.',
    estimated_time: '1 - 3 Weeks',
    price_starting_at: '₹18,850+',
    category: 'restoration',
    image_url: '/images/services/bike-restoration.jpg',
    is_popular: true,
    sort_order: 10,
  },
  {
    id: 's11',
    slug: 'spare-parts-replacement',
    name: 'Spare Parts Replacement',
    marathi_name: 'ओरिजिनल स्पेअर पार्ट्स',
    icon_name: 'Wrench',
    short_description: '100% genuine Hero, Bajaj, Yamaha & Honda OEM spares only',
    full_description: 'Direct fitment of genuine motorcycle components: chain-sprocket kits, clutch assemblies, throttle/clutch cables, shock absorbers, brake discs, control levers, and mirrors.',
    included: [
      'Original brand warranty on all fitted parts',
      'Precision torque fitment as per OEM factory specs',
      'Zero counterfeit assurance',
    ],
    estimated_time: '30 Minutes',
    price_starting_at: '₹99 + Spares',
    category: 'maintenance',
    image_url: '/images/services/chain-sprocket.jpg',
    is_popular: false,
    sort_order: 11,
  },
  {
    id: 's12',
    slug: 'washing-detailing',
    name: 'Washing & Detailing',
    marathi_name: 'वॉशिंग आणि डिटेलिंग',
    icon_name: 'Sparkles',
    short_description: 'High-pressure underbody mud flush, snow foam bath & 3M wax gloss',
    full_description: 'Complete two-wheeler beauty treatment: underbody mud wash, engine degreasing, pH-neutral snow foam wash, air blow dry, chain lubing, and high-gloss 3M wax polish for tank and fairings.',
    included: [
      'High-pressure under-mud and wheel rim wash',
      'Heavy-duty engine bay & chain guard degreasing',
      'Thick snow foam exterior wash',
      'Air gun blow drying to prevent switch rust',
      '3M high-gloss wax polish on fuel tank & panels',
    ],
    estimated_time: '45 Minutes',
    price_starting_at: '₹149',
    category: 'cosmetic',
    image_url: '/images/services/foam-wash.jpg',
    is_popular: false,
    sort_order: 12,
  },
];

export async function initDb() {
  console.log('Connecting to Supabase PostgreSQL and initializing database schema...');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Create Enquiries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(64) PRIMARY KEY,
        ticket_number VARCHAR(32) UNIQUE NOT NULL,
        type VARCHAR(32) DEFAULT 'general_inquiry',
        customer_name VARCHAR(128) NOT NULL,
        customer_mobile VARCHAR(32) NOT NULL,
        customer_email VARCHAR(128),
        customer_city VARCHAR(128),
        bike_brand VARCHAR(64),
        bike_model VARCHAR(128),
        registration_number VARCHAR(32),
        service_name VARCHAR(128),
        problem_description TEXT,
        quick_issues JSONB DEFAULT '[]'::jsonb,
        attachments JSONB DEFAULT '[]'::jsonb,
        status VARCHAR(32) DEFAULT 'new',
        notes JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2. Create Appointments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id VARCHAR(64) PRIMARY KEY,
        full_name VARCHAR(128) NOT NULL,
        mobile VARCHAR(32) NOT NULL,
        email VARCHAR(128),
        bike_brand VARCHAR(64),
        bike_model VARCHAR(128),
        registration_number VARCHAR(32),
        current_km VARCHAR(32),
        service_required VARCHAR(128),
        preferred_date VARCHAR(32),
        preferred_time VARCHAR(64),
        additional_problem TEXT,
        status VARCHAR(32) DEFAULT 'new',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Remove dummy appointments
    await client.query(`DELETE FROM appointments WHERE id IN ('APT-101', 'APT-102');`);

    // 3. Create Restorations Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS restorations (
        id VARCHAR(64) PRIMARY KEY,
        ticket_number VARCHAR(32),
        customer_name VARCHAR(128) NOT NULL,
        mobile VARCHAR(32) NOT NULL,
        city_village VARCHAR(128),
        referral_source VARCHAR(64),
        referral_other VARCHAR(128),
        bike_brand VARCHAR(64),
        bike_name VARCHAR(128),
        bike_model VARCHAR(128),
        model_year VARCHAR(32),
        registration_number VARCHAR(32),
        bike_condition VARCHAR(64),
        restoration_required VARCHAR(64),
        selected_works JSONB DEFAULT '[]'::jsonb,
        other_work_text TEXT,
        original_parts_required VARCHAR(32),
        customer_supplied_parts VARCHAR(32),
        special_requirements TEXT,
        customer_signature VARCHAR(128),
        form_date VARCHAR(32),
        status VARCHAR(32) DEFAULT 'new',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 4. Create Staff Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS staff_users (
        id VARCHAR(64) PRIMARY KEY,
        username VARCHAR(64) UNIQUE NOT NULL,
        password_hash VARCHAR(256) NOT NULL,
        name VARCHAR(128) NOT NULL,
        mobile VARCHAR(32),
        role VARCHAR(32) DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 5. Create Bike Services Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bike_services (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        marathi_name VARCHAR(128),
        icon_name VARCHAR(64) DEFAULT 'Wrench',
        short_description TEXT,
        full_description TEXT,
        included JSONB DEFAULT '[]'::jsonb,
        estimated_time VARCHAR(64),
        price_starting_at VARCHAR(64),
        category VARCHAR(64) DEFAULT 'maintenance',
        image_url TEXT,
        is_popular BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        sort_order INT DEFAULT 0,
        package_breakdown JSONB DEFAULT '[]'::jsonb,
        benefits JSONB DEFAULT '[]'::jsonb,
        important_note TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE bike_services ADD COLUMN IF NOT EXISTS package_breakdown JSONB DEFAULT '[]'::jsonb;
      ALTER TABLE bike_services ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb;
      ALTER TABLE bike_services ADD COLUMN IF NOT EXISTS important_note TEXT;
    `);

    // 6. Create Customers Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        mobile VARCHAR(32) UNIQUE NOT NULL,
        email VARCHAR(128),
        city VARCHAR(128),
        bike_brand VARCHAR(64),
        bike_model VARCHAR(128),
        registration_number VARCHAR(32),
        current_km VARCHAR(32),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 7. Create Repair Records Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS repair_records (
        id VARCHAR(64) PRIMARY KEY,
        job_number VARCHAR(32) UNIQUE NOT NULL,
        customer_id VARCHAR(64),
        customer_name VARCHAR(128) NOT NULL,
        customer_mobile VARCHAR(32) NOT NULL,
        bike_brand VARCHAR(64),
        bike_model VARCHAR(128),
        registration_number VARCHAR(32),
        current_km VARCHAR(32),
        service_type VARCHAR(128),
        problem_details TEXT,
        parts_replaced JSONB DEFAULT '[]'::jsonb,
        labor_charge NUMERIC(10,2) DEFAULT 0,
        parts_total NUMERIC(10,2) DEFAULT 0,
        total_amount NUMERIC(10,2) DEFAULT 0,
        payment_status VARCHAR(32) DEFAULT 'Paid',
        status VARCHAR(32) DEFAULT 'Completed',
        photos JSONB DEFAULT '[]'::jsonb,
        repair_date VARCHAR(32),
        discount NUMERIC(10,2) DEFAULT 0,
        payment_mode VARCHAR(50) DEFAULT 'Cash',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Ensure columns exist on repair_records if already created
    await client.query(`
      ALTER TABLE repair_records ADD COLUMN IF NOT EXISTS discount NUMERIC(10,2) DEFAULT 0;
      ALTER TABLE repair_records ADD COLUMN IF NOT EXISTS payment_mode VARCHAR(50) DEFAULT 'Cash';
      ALTER TABLE repair_records ADD COLUMN IF NOT EXISTS mechanic_name VARCHAR(128);
    `);

    // 8. Create Parts Inventory Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS parts_inventory (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        category VARCHAR(64) DEFAULT 'General',
        price NUMERIC(10,2) NOT NULL DEFAULT 0,
        stock_quantity INT DEFAULT 10,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed/Update master motorcycle spare parts inventory
    console.log('Seeding / updating complete motorcycle spare parts inventory...');
    const masterParts = [
      // 🔧 Engine Parts
      ['prt-e01', 'Engine Oil (4T 10W-30, 1L)', 'Engine', 350, 25],
      ['prt-e02', 'Engine Oil (4T 20W-40, 1L)', 'Engine', 320, 20],
      ['prt-e03', 'Oil Filter', 'Engine', 120, 20],
      ['prt-e04', 'Air Filter', 'Engine', 150, 18],
      ['prt-e05', 'Spark Plug', 'Engine', 120, 30],
      ['prt-e06', 'Spark Plug Cap', 'Engine', 80, 15],
      ['prt-e07', 'Clutch Plate Set', 'Engine', 550, 10],
      ['prt-e08', 'Clutch Spring Set', 'Engine', 120, 12],
      ['prt-e09', 'Clutch Cable', 'Engine', 110, 15],
      ['prt-e10', 'Clutch Bearing', 'Engine', 180, 8],
      ['prt-e11', 'Clutch Housing', 'Engine', 450, 5],
      ['prt-e12', 'Piston', 'Engine', 850, 6],
      ['prt-e13', 'Piston Ring Set', 'Engine', 350, 8],
      ['prt-e14', 'Cylinder Block', 'Engine', 2200, 3],
      ['prt-e15', 'Cylinder Head', 'Engine', 1800, 3],
      ['prt-e16', 'Head Gasket', 'Engine', 180, 12],
      ['prt-e17', 'Valve (Intake / Exhaust)', 'Engine', 220, 10],
      ['prt-e18', 'Valve Seal', 'Engine', 80, 15],
      ['prt-e19', 'Valve Spring', 'Engine', 90, 12],
      ['prt-e20', 'Camshaft', 'Engine', 1200, 4],
      ['prt-e21', 'Cam Chain', 'Engine', 350, 8],
      ['prt-e22', 'Cam Chain Tensioner', 'Engine', 180, 8],
      ['prt-e23', 'Crankshaft', 'Engine', 3500, 2],
      ['prt-e24', 'Crank Bearing', 'Engine', 280, 6],
      ['prt-e25', 'Connecting Rod', 'Engine', 950, 4],
      ['prt-e26', 'Rocker Arm', 'Engine', 320, 6],
      ['prt-e27', 'Engine Gasket Set (Full)', 'Engine', 450, 8],
      ['prt-e28', 'Crankcase Gasket', 'Engine', 120, 10],
      ['prt-e29', 'Oil Seal', 'Engine', 60, 20],
      ['prt-e30', 'Timing Chain', 'Engine', 280, 8],
      ['prt-e31', 'Timing Gear', 'Engine', 350, 6],

      // ⚙️ Transmission / Gearbox
      ['prt-g01', 'Gear Lever', 'Transmission', 180, 10],
      ['prt-g02', 'Gear Shaft', 'Transmission', 450, 5],
      ['prt-g03', 'Gear Selector Fork', 'Transmission', 320, 5],
      ['prt-g04', 'Gear Bearing', 'Transmission', 150, 8],
      ['prt-g05', 'Gear Sprocket', 'Transmission', 280, 8],
      ['prt-g06', 'Primary Gear', 'Transmission', 550, 4],
      ['prt-g07', 'Secondary Gear', 'Transmission', 550, 4],
      ['prt-g08', 'Gearbox Gasket', 'Transmission', 90, 10],
      ['prt-g09', 'Gear Oil (80W-90, 100ml)', 'Transmission', 60, 20],

      // 🛞 Chain & Drive System
      ['prt-c01', 'Drive Chain', 'Chain & Drive', 450, 12],
      ['prt-c02', 'Front Sprocket', 'Chain & Drive', 180, 12],
      ['prt-c03', 'Rear Sprocket', 'Chain & Drive', 320, 10],
      ['prt-c04', 'Chain & Sprocket Kit', 'Chain & Drive', 850, 8],
      ['prt-c05', 'Chain Adjuster', 'Chain & Drive', 80, 15],
      ['prt-c06', 'Chain Slider', 'Chain & Drive', 120, 10],
      ['prt-c07', 'Chain Cover', 'Chain & Drive', 150, 8],

      // 🛑 Brake System — Front
      ['prt-b01', 'Front Brake Pads', 'Brakes', 220, 12],
      ['prt-b02', 'Front Brake Disc', 'Brakes', 650, 6],
      ['prt-b03', 'Front Brake Caliper', 'Brakes', 1200, 4],
      ['prt-b04', 'Caliper Piston', 'Brakes', 180, 8],
      ['prt-b05', 'Brake Hose', 'Brakes', 220, 8],
      ['prt-b06', 'Master Cylinder', 'Brakes', 480, 5],
      ['prt-b07', 'Brake Lever (Front)', 'Brakes', 150, 10],
      ['prt-b08', 'Brake Fluid (DOT 4)', 'Brakes', 120, 15],
      ['prt-b09', 'Brake Shoe Set (Drum — Front)', 'Brakes', 180, 15],
      // Rear
      ['prt-b10', 'Rear Brake Pads', 'Brakes', 200, 12],
      ['prt-b11', 'Rear Brake Disc', 'Brakes', 620, 6],
      ['prt-b12', 'Rear Brake Caliper', 'Brakes', 1100, 4],
      ['prt-b13', 'Rear Brake Shoe Set (Drum)', 'Brakes', 180, 15],
      ['prt-b14', 'Brake Drum (Rear)', 'Brakes', 380, 5],
      ['prt-b15', 'Rear Brake Cable', 'Brakes', 110, 12],
      ['prt-b16', 'Brake Rod', 'Brakes', 90, 10],
      ['prt-b17', 'Brake Spring', 'Brakes', 40, 20],

      // 🛞 Wheel & Tyre Parts
      ['prt-w01', 'Front Tyre', 'Wheels & Tyres', 900, 8],
      ['prt-w02', 'Rear Tyre', 'Wheels & Tyres', 1100, 8],
      ['prt-w03', 'Tube (Front / Rear)', 'Wheels & Tyres', 150, 20],
      ['prt-w04', 'Tubeless Valve', 'Wheels & Tyres', 30, 30],
      ['prt-w05', 'Wheel Rim', 'Wheels & Tyres', 1200, 4],
      ['prt-w06', 'Wheel Bearing', 'Wheels & Tyres', 120, 15],
      ['prt-w07', 'Wheel Spacer', 'Wheels & Tyres', 60, 15],
      ['prt-w08', 'Axle', 'Wheels & Tyres', 280, 8],
      ['prt-w09', 'Axle Nut', 'Wheels & Tyres', 40, 20],
      ['prt-w10', 'Rim Tape', 'Wheels & Tyres', 50, 20],
      ['prt-w11', 'Wheel Spoke', 'Wheels & Tyres', 25, 50],

      // 🏍️ Suspension & Steering
      ['prt-s01', 'Front Fork Assembly', 'Suspension', 2800, 3],
      ['prt-s02', 'Fork Oil', 'Suspension', 180, 12],
      ['prt-s03', 'Fork Oil Seal', 'Suspension', 120, 12],
      ['prt-s04', 'Fork Dust Seal', 'Suspension', 80, 12],
      ['prt-s05', 'Fork Bush', 'Suspension', 90, 10],
      ['prt-s06', 'Fork Tube', 'Suspension', 650, 4],
      ['prt-s07', 'Rear Shock Absorber', 'Suspension', 1200, 5],
      ['prt-s08', 'Rear Suspension Bush', 'Suspension', 80, 12],
      ['prt-s09', 'Steering Cone Set', 'Suspension', 220, 8],
      ['prt-s10', 'Steering Bearing', 'Suspension', 180, 8],
      ['prt-s11', 'Handlebar', 'Suspension', 450, 6],
      ['prt-s12', 'Handlebar Grip (Pair)', 'Suspension', 120, 15],
      ['prt-s13', 'Handlebar Clamp', 'Suspension', 150, 8],

      // 🔌 Electrical Parts
      ['prt-el01', 'Battery (12V 4Ah MF)', 'Electrical', 1150, 6],
      ['prt-el02', 'Battery Terminal', 'Electrical', 40, 20],
      ['prt-el03', 'Fuse Set', 'Electrical', 30, 25],
      ['prt-el04', 'Main Fuse', 'Electrical', 50, 20],
      ['prt-el05', 'Headlight Bulb (12V 35W Halogen)', 'Electrical', 120, 25],
      ['prt-el06', 'LED Headlight', 'Electrical', 650, 8],
      ['prt-el07', 'Tail Light Bulb', 'Electrical', 40, 25],
      ['prt-el08', 'Indicator Bulb', 'Electrical', 30, 30],
      ['prt-el09', 'Indicator Assembly (Front / Rear)', 'Electrical', 180, 10],
      ['prt-el10', 'Horn', 'Electrical', 150, 10],
      ['prt-el11', 'Starter Motor', 'Electrical', 1800, 3],
      ['prt-el12', 'Starter Relay', 'Electrical', 180, 8],
      ['prt-el13', 'Ignition Coil', 'Electrical', 380, 6],
      ['prt-el14', 'CDI Unit', 'Electrical', 650, 5],
      ['prt-el15', 'ECU', 'Electrical', 2800, 2],
      ['prt-el16', 'Rectifier / Regulator', 'Electrical', 480, 6],
      ['prt-el17', 'Stator Coil', 'Electrical', 850, 4],
      ['prt-el18', 'Pickup Coil', 'Electrical', 350, 5],
      ['prt-el19', 'Wiring Harness', 'Electrical', 950, 4],
      ['prt-el20', 'Ignition Switch', 'Electrical', 280, 8],
      ['prt-el21', 'Side Stand Switch', 'Electrical', 120, 10],
      ['prt-el22', 'Neutral Switch', 'Electrical', 90, 10],
      ['prt-el23', 'Brake Switch', 'Electrical', 80, 12],

      // 💡 Lighting & Indicators
      ['prt-l01', 'Headlight Assembly', 'Lighting', 850, 5],
      ['prt-l02', 'DRL (Daytime Running Light)', 'Lighting', 350, 6],
      ['prt-l03', 'Tail Light Assembly', 'Lighting', 420, 6],
      ['prt-l04', 'Front Indicator (Pair)', 'Lighting', 220, 8],
      ['prt-l05', 'Rear Indicator (Pair)', 'Lighting', 200, 8],
      ['prt-l06', 'Indicator Relay', 'Lighting', 80, 12],
      ['prt-l07', 'Number Plate Light', 'Lighting', 80, 12],
      ['prt-l08', 'Speedometer / Meter Console', 'Lighting', 1200, 3],

      // ⛽ Fuel System
      ['prt-f01', 'Fuel Filter', 'Fuel System', 120, 15],
      ['prt-f02', 'Fuel Pump', 'Fuel System', 850, 5],
      ['prt-f03', 'Fuel Injector', 'Fuel System', 1800, 3],
      ['prt-f04', 'Carburetor Assembly', 'Fuel System', 1200, 4],
      ['prt-f05', 'Carburetor Repair Kit', 'Fuel System', 180, 10],
      ['prt-f06', 'Throttle Cable', 'Fuel System', 90, 12],
      ['prt-f07', 'Fuel Pipe / Hose', 'Fuel System', 80, 12],
      ['prt-f08', 'Fuel Tank Cap', 'Fuel System', 150, 8],
      ['prt-f09', 'Fuel Tap / Petcock', 'Fuel System', 180, 8],
      ['prt-f10', 'Injector O-ring', 'Fuel System', 50, 20],

      // 🌬️ Cooling System
      ['prt-cool01', 'Radiator', 'Cooling', 2800, 2],
      ['prt-cool02', 'Radiator Fan', 'Cooling', 650, 4],
      ['prt-cool03', 'Coolant (1L)', 'Cooling', 180, 15],
      ['prt-cool04', 'Water Pump', 'Cooling', 950, 3],
      ['prt-cool05', 'Thermostat', 'Cooling', 280, 5],
      ['prt-cool06', 'Radiator Hose', 'Cooling', 180, 8],
      ['prt-cool07', 'Oil Cooler', 'Cooling', 1200, 3],

      // 🔊 Exhaust System
      ['prt-ex01', 'Exhaust Muffler', 'Exhaust', 1500, 4],
      ['prt-ex02', 'Exhaust Gasket', 'Exhaust', 80, 15],
      ['prt-ex03', 'Exhaust Pipe', 'Exhaust', 950, 4],
      ['prt-ex04', 'Exhaust Mounting Rubber', 'Exhaust', 60, 20],
      ['prt-ex05', 'Exhaust Clamp', 'Exhaust', 50, 20],
      ['prt-ex06', 'Heat Shield', 'Exhaust', 180, 8],

      // 🧰 Cables & Controls
      ['prt-cab01', 'Clutch Cable Assembly', 'Cables & Controls', 110, 15],
      ['prt-cab02', 'Front Brake Cable', 'Cables & Controls', 100, 12],
      ['prt-cab03', 'Rear Brake Cable', 'Cables & Controls', 110, 12],
      ['prt-cab04', 'Speedometer Cable', 'Cables & Controls', 120, 10],
      ['prt-cab05', 'Choke Cable', 'Cables & Controls', 80, 10],
      ['prt-cab06', 'Clutch Lever', 'Cables & Controls', 120, 12],
      ['prt-cab07', 'Brake Lever (Front)', 'Cables & Controls', 150, 12],

      // 🪑 Body & Exterior
      ['prt-body01', 'Front Mudguard', 'Body', 380, 6],
      ['prt-body02', 'Rear Mudguard', 'Body', 350, 6],
      ['prt-body03', 'Side Panels (Pair)', 'Body', 520, 5],
      ['prt-body04', 'Tank Cover', 'Body', 380, 5],
      ['prt-body05', 'Seat Assembly', 'Body', 1200, 3],
      ['prt-body06', 'Seat Lock', 'Body', 150, 8],
      ['prt-body07', 'Grab Rail', 'Body', 320, 5],
      ['prt-body08', 'Crash Guard', 'Body', 850, 4],
      ['prt-body09', 'Rider Footrest (Pair)', 'Body', 280, 8],
      ['prt-body10', 'Pillion Footrest (Pair)', 'Body', 220, 8],
      ['prt-body11', 'Main Stand', 'Body', 450, 5],
      ['prt-body12', 'Side Stand', 'Body', 280, 8],
      ['prt-body13', 'Stand Spring', 'Body', 40, 20],
      ['prt-body14', 'Number Plate Holder', 'Body', 80, 12],
      ['prt-body15', 'Rear View Mirror Set (Pair)', 'Body', 180, 8],

      // 🛠️ Bearings, Bushes & Seals
      ['prt-bear01', 'Wheel Bearing (Front / Rear)', 'Bearings & Seals', 120, 15],
      ['prt-bear02', 'Steering Bearing Set', 'Bearings & Seals', 180, 10],
      ['prt-bear03', 'Swingarm Bearing', 'Bearings & Seals', 150, 10],
      ['prt-bear04', 'Engine Bearing', 'Bearings & Seals', 280, 8],
      ['prt-bear05', 'Suspension Bush (Rear)', 'Bearings & Seals', 80, 15],
      ['prt-bear06', 'Rubber Bush', 'Bearings & Seals', 50, 20],
      ['prt-bear07', 'Oil Seal Set', 'Bearings & Seals', 60, 20],
      ['prt-bear08', 'Dust Seal', 'Bearings & Seals', 50, 20],
      ['prt-bear09', 'O-Ring Set', 'Bearings & Seals', 40, 25],
      ['prt-bear10', 'Gasket (General)', 'Bearings & Seals', 60, 20],

      // 🧴 Service Consumables
      ['prt-con01', 'Chain Lubricant Spray', 'Consumables', 190, 14],
      ['prt-con02', 'Chain Cleaner Spray', 'Consumables', 160, 12],
      ['prt-con03', 'Grease (Multi-purpose)', 'Consumables', 80, 15],
      ['prt-con04', 'Contact Cleaner Spray', 'Consumables', 220, 10],
      ['prt-con05', 'Carburetor Cleaner Spray', 'Consumables', 200, 10],
      ['prt-con06', 'Thread Locker (Loctite)', 'Consumables', 120, 10],
      ['prt-con07', 'Gasket Sealant (RTV)', 'Consumables', 150, 10],
      ['prt-con08', 'Brake Fluid (DOT 4, 100ml)', 'Consumables', 120, 15],
      ['prt-con09', 'Multipurpose Lubricant (WD-40)', 'Consumables', 180, 12],
      ['prt-con10', 'Distilled Water (Battery)', 'Consumables', 30, 20],

      // 🔩 Small Hardware
      ['prt-hw01', 'Nuts & Bolts Set (Assorted)', 'Hardware', 80, 20],
      ['prt-hw02', 'Washers (Pack)', 'Hardware', 30, 30],
      ['prt-hw03', 'Lock Nuts (Pack)', 'Hardware', 40, 25],
      ['prt-hw04', 'Circlip Set', 'Hardware', 50, 20],
      ['prt-hw05', 'Cotter Pins (Pack)', 'Hardware', 30, 25],
      ['prt-hw06', 'Cable Ties (Pack)', 'Hardware', 40, 20],
      ['prt-hw07', 'Hose Clamps (Pack)', 'Hardware', 60, 15],
      ['prt-hw08', 'Rubber Caps / Grommets (Pack)', 'Hardware', 40, 20],
      ['prt-hw09', 'Springs (Assorted)', 'Hardware', 50, 20],
    ];

    for (const p of masterParts) {
      await client.query(
        `INSERT INTO parts_inventory (id, name, category, price, stock_quantity)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           category = EXCLUDED.category,
           price = EXCLUDED.price,
           stock_quantity = EXCLUDED.stock_quantity`,
        p
      );
    }
    console.log('✅ Motorcycle spare parts inventory seeded/updated successfully!');

    // 9. Seed default admin users if none exist
    const adminCheck = await client.query('SELECT COUNT(*) FROM staff_users');
    if (parseInt(adminCheck.rows[0].count, 10) === 0) {
      console.log('Seeding default staff/admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const garagePass = await bcrypt.hash('garage1994', salt);

      await client.query(`
        INSERT INTO staff_users (id, username, password_hash, name, mobile, role)
        VALUES 
          ('usr-1', 'admin', $1, 'Bhushan Chaudhari', '7387448878', 'superadmin'),
          ('usr-2', '7387448878', $1, 'Bhushan Chaudhari (Desk)', '7387448878', 'superadmin'),
          ('usr-3', 'garage', $2, 'Chaudhari Auto Desk', '9503853143', 'admin');
      `, [hashedPassword, garagePass]);
    }

    // 7. Seed/Update All 12 Authentic Bike Services with Real Images into bike_services
    console.log('Ensuring all 12 bike services with authentic images exist in Supabase DB...');
    for (const s of all12Services) {
      await client.query(
        `INSERT INTO bike_services (
          id, slug, name, marathi_name, icon_name, short_description,
          full_description, included, estimated_time, price_starting_at,
          category, image_url, is_popular, is_active, sort_order,
          package_breakdown, benefits, important_note
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, $14, $15, $16, $17)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          marathi_name = EXCLUDED.marathi_name,
          image_url = EXCLUDED.image_url,
          price_starting_at = EXCLUDED.price_starting_at,
          estimated_time = EXCLUDED.estimated_time,
          short_description = EXCLUDED.short_description,
          full_description = EXCLUDED.full_description,
          included = EXCLUDED.included,
          category = EXCLUDED.category,
          sort_order = EXCLUDED.sort_order,
          package_breakdown = EXCLUDED.package_breakdown,
          benefits = EXCLUDED.benefits,
          important_note = EXCLUDED.important_note`,
        [
          s.id,
          s.slug,
          s.name,
          s.marathi_name,
          s.icon_name,
          s.short_description,
          s.full_description,
          JSON.stringify(s.included),
          s.estimated_time,
          s.price_starting_at,
          s.category,
          s.image_url,
          s.is_popular,
          s.sort_order,
          JSON.stringify((s as any).package_breakdown || []),
          JSON.stringify((s as any).benefits || []),
          (s as any).important_note || null,
        ]
      );
    }
    console.log('✅ All 12 authentic bike services & images synced with Supabase DB!');

    // 10. Enable Row Level Security (RLS) on all tables and create permissive policies
    console.log('Enabling Row Level Security (RLS) across all database tables...');
    const rlsTables = [
      'enquiries',
      'appointments',
      'restorations',
      'staff_users',
      'bike_services',
      'customers',
      'repair_records',
      'parts_inventory',
    ];

    for (const table of rlsTables) {
      await client.query(`ALTER TABLE IF EXISTS ${table} ENABLE ROW LEVEL SECURITY;`);
      await client.query(`DROP POLICY IF EXISTS "Allow all operations on ${table}" ON ${table};`);
      await client.query(`
        CREATE POLICY "Allow all operations on ${table}" 
        ON ${table} 
        FOR ALL 
        USING (true) 
        WITH CHECK (true);
      `);
    }
    console.log('✅ Row Level Security (RLS) successfully enabled for all tables with access policies!');

    // 11. Create Performance Indexes for ultra-fast query execution on Supabase
    console.log('Creating database performance indexes for fast query execution...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_repair_records_created_at ON repair_records (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_repair_records_status ON repair_records (status);
      CREATE INDEX IF NOT EXISTS idx_repair_records_repair_date ON repair_records (repair_date);
      CREATE INDEX IF NOT EXISTS idx_repair_records_mobile ON repair_records (customer_mobile);
      CREATE INDEX IF NOT EXISTS idx_customers_mobile ON customers (mobile);
      CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
      CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);
      CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_parts_category ON parts_inventory (category);
      CREATE INDEX IF NOT EXISTS idx_bike_services_sort ON bike_services (sort_order ASC, is_active);
    `);
    console.log('✅ Performance indexes created successfully!');

    await client.query('COMMIT');
    console.log('✅ Supabase PostgreSQL Schema successfully initialized!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to initialize database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run directly if invoked via CLI
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  initDb()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
