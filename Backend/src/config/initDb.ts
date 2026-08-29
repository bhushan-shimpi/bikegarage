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
    name: 'Premium Bike Service',
    marathi_name: 'प्रीमियम बाईक सर्व्हिसिंग',
    icon_name: 'Sparkles',
    short_description: 'Master 35-point complete motorcycle overhaul & health certification',
    full_description: 'Our top-tier care package for touring bikes, superbikes, and daily riders. Full disassembly of wear items, synthetic fluid flush, caliper greasing, chassis torque check, and 30-day service warranty.',
    included: [
      'Complete 35-point safety inspection',
      'Fully synthetic engine oil & OEM filter',
      'Front & rear brake caliper complete overhaul',
      'Drive chain ultrasonic wash & high-temperature lube',
      'Steering cone set & wheel bearing check',
      'Full 3M showroom wax polish & detailing',
    ],
    estimated_time: '4 - 5 Hours',
    price_starting_at: '₹799',
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
    name: 'Bike Restoration',
    marathi_name: 'विंटेज बाईक रेस्टोरेशन',
    icon_name: 'PackageCheck',
    short_description: 'Bringing classic motorcycles back to life with premium craftsmanship',
    full_description: 'At Chaudhari Auto Centre, bike restoration is not just about repairing an old motorcycle. Our goal is to bring back its original beauty, performance, and finish while giving every detail the attention it deserves. Complete nut-and-bolt restoration for Yamaha RX100, Rajdoot, Shogun, and vintage 2-stroke/4-stroke legend bikes.',
    included: [
      'Complete Inspection — Thorough inspection of every single part before restoration begins',
      '100% Original Spare Parts — Using genuine OEM parts to maintain quality & reliability',
      'Oven / Furnace Paint — Professional oven/bhatti paint process for smooth factory finish',
      'Ceramic Coating — High-grade protective layer to preserve paint & enhance shine',
      'Detailed Finishing — Obsessive attention to even the smallest nuts, bolts and chrome details',
      'Quality First — Rigorous multi-point testing to meet our highest quality standards',
    ],
    estimated_time: '1 - 3 Weeks',
    price_starting_at: 'Custom Quote',
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
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
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

    // Seed default common motorcycle spare parts if empty
    const partsCheck = await client.query('SELECT COUNT(*) FROM parts_inventory');
    if (parseInt(partsCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial motorcycle spare parts inventory...');
      const defaultParts = [
        ['prt-1', '4T Engine Oil 10W-30 (1L)', 'Lubricants', 350, 25],
        ['prt-2', '4T Engine Oil 20W-40 (1L)', 'Lubricants', 320, 20],
        ['prt-3', 'Front Brake Shoe Set', 'Brakes', 180, 15],
        ['prt-4', 'Rear Brake Shoe Set', 'Brakes', 180, 15],
        ['prt-5', 'Front Disc Brake Pads', 'Brakes', 220, 12],
        ['prt-6', 'Spark Plug (Champion / Bosch)', 'Electrical', 120, 30],
        ['prt-7', 'Chain & Sprocket Kit', 'Transmission', 850, 8],
        ['prt-8', 'Clutch Cable Assembly', 'Controls', 110, 15],
        ['prt-9', 'Throttle / Accelerator Cable', 'Controls', 90, 12],
        ['prt-10', 'OEM Air Filter Element', 'Engine', 150, 18],
        ['prt-11', 'Halogen Headlight Bulb (12V 35W)', 'Electrical', 120, 25],
        ['prt-12', '12V 4Ah Maintenance-Free Battery', 'Electrical', 1150, 6],
        ['prt-13', 'Front Fork Oil Seal & Fork Oil', 'Suspension', 250, 10],
        ['prt-14', 'Rear View Mirror Set (Pair)', 'Body', 180, 8],
        ['prt-15', 'Drive Chain Lube & Cleaner Spray', 'General', 190, 14],
      ];

      for (const p of defaultParts) {
        await client.query(
          `INSERT INTO parts_inventory (id, name, category, price, stock_quantity)
           VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
          p
        );
      }
      console.log('✅ Initial spare parts seeded successfully!');
    }

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
          category, image_url, is_popular, is_active, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, $14)
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
          sort_order = EXCLUDED.sort_order`,
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
