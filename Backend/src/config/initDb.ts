import { pool } from './database.js';
import bcrypt from 'bcryptjs';

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

    // Remove any dummy sample appointments
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

    // 6. Seed default admin users if none exist
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

    // 7. Seed Real Bike Services into bike_services table if empty
    const serviceCheck = await client.query('SELECT COUNT(*) FROM bike_services');
    if (parseInt(serviceCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial bike services into Supabase PostgreSQL...');
      const services = [
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
            'Engine oil flush & fresh high-grade oil refill',
          ],
          estimated_time: '1 - 2 Days',
          price_starting_at: '₹1,499',
          category: 'repair',
          image_url: '/images/services/engine-service.jpg',
          is_popular: false,
          sort_order: 3,
        },
        {
          id: 's4',
          slug: 'vintage-2stroke-restoration',
          name: '2-Stroke Vintage Bike Restoration',
          marathi_name: '२-स्ट्रोक विंटेज बाईक रेस्टोरेशन',
          icon_name: 'Flame',
          short_description: 'Showroom-grade rebuild for Yamaha RX100/RX135, Rajdoot, Shogun, RD350',
          full_description: 'Complete nut-and-bolt restoration for vintage 2-stroke legend bikes. Chassis sandblasting, 3-stage polyurethane paint, genuine OEM spare sourcing, 2T oil pump calibration, expansion chamber tuning, and chrome plating.',
          included: [
            'Complete chassis strip-down, rust removal & oven baking paint',
            'Crankshaft balancing, sleeve boring & genuine ART piston',
            'Buffing, chrome electroplating & zinc coating on hardware',
            'Original wiring harness restoration & CDI conversion',
            'Mikuini/Keihin carburetor ultrasonic cleaning & jetting',
            'Showroom mirror finish polish & road test certification',
          ],
          estimated_time: '7 - 15 Days',
          price_starting_at: '₹3,999',
          category: 'restoration',
          image_url: '/images/services/restoration-service.jpg',
          is_popular: true,
          sort_order: 4,
        },
        {
          id: 's5',
          slug: 'foam-wash-detailing',
          name: 'Complete Foam Wash & Detailing',
          marathi_name: 'फोम वॉश आणि डिटेनिंग',
          icon_name: 'Droplets',
          short_description: 'High-pressure snow foam wash, chain degreasing & Teflon coating',
          full_description: 'Professional high-pressure snow foam bath that removes heavy mud, grease, and road grime without scratching paint. Includes chain degreasing, matte/gloss wax finish, engine bay dressing, and UV protective coating.',
          included: [
            'High-pressure underbody & chassis wash',
            'pH-neutral snow foam shampoo application',
            'Heavy-duty drive chain & sprocket degreasing',
            'Alloy wheel & brake disc cleaning',
            'Microfiber blow dry & tire dressing',
            'Paint protectant spray polish',
          ],
          estimated_time: '45 Mins',
          price_starting_at: '₹149',
          category: 'cosmetic',
          image_url: '/images/services/foam-wash.jpg',
          is_popular: false,
          sort_order: 5,
        },
        {
          id: 's6',
          slug: 'electrical-battery-diagnostics',
          name: 'Electrical, Wiring & Battery Diagnostics',
          marathi_name: 'इलेक्ट्रिकल व बॅटरी तपासणी',
          icon_name: 'Zap',
          short_description: 'Self-start motor service, wiring short-circuit fix & battery health check',
          full_description: 'Complete electrical troubleshooting for modern EFI bikes and digital consoles. Starter motor carbon brush replacement, rectifier/regulator testing, headlight relay upgrades, and battery load testing.',
          included: [
            'Battery voltage & cranking load capacity test',
            'Starter motor dismantling & carbon bush renewal',
            'Stator coil & RR unit charging output inspection',
            'Full wiring loom trace for shorts or loose earths',
            'Horn, indicators, headlamp & brake light relay check',
            'Terminal cleaning & anti-corrosion grease application',
          ],
          estimated_time: '1 - 2 Hours',
          price_starting_at: '₹199',
          category: 'repair',
          image_url: '/images/services/electrical-service.jpg',
          is_popular: false,
          sort_order: 6,
        },
      ];

      for (const s of services) {
        await client.query(
          `INSERT INTO bike_services (
            id, slug, name, marathi_name, icon_name, short_description,
            full_description, included, estimated_time, price_starting_at,
            category, image_url, is_popular, is_active, sort_order
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, $14)
          ON CONFLICT (id) DO NOTHING`,
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
      console.log('✅ 6 Authentic bike services successfully seeded into Supabase DB!');
    }

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
