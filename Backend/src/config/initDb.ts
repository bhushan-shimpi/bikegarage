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

    // 5. Seed default admin users if none exist
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
      console.log('Default admin seeded: username "admin" / "admin123" or mobile "7387448878"');
    }

    // 6. Seed sample appointments if none exist
    const aptCheck = await client.query('SELECT COUNT(*) FROM appointments');
    if (parseInt(aptCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial appointments...');
      await client.query(`
        INSERT INTO appointments (id, full_name, mobile, email, bike_brand, bike_model, registration_number, current_km, service_required, preferred_date, preferred_time, additional_problem, status)
        VALUES 
          ('APT-101', 'Sunil Mahajan', '9822456781', 'sunil.mahajan@gmail.com', 'Honda', 'Shine 125', 'MH 19 BJ 4421', '24,500 km', 'General Bike Service', '2026-08-28', 'Morning (09:00 AM - 12:00 PM)', 'Cold start issue, engine missing at 40 km/h, and front brake lever loose.', 'new'),
          ('APT-102', 'Ganesh Shimpi', '9423187654', 'ganesh.s@yahoo.com', 'Honda', 'CB Shine 125 SP', 'MH 19 CK 1994', '42,000 km', 'Premium Bike Service', '2026-08-29', 'Afternoon (12:00 PM - 03:00 PM)', 'Engine oil replacement, brake overhaul, chain lubrication, and complete foam wash.', 'confirmed');
      `);
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
