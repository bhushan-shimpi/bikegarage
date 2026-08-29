import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL environment variable is not defined. Please set it in your environment settings.');
}

const globalForPg = globalThis as unknown as { pgPool?: pg.Pool };

export const pool: pg.Pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10, // Supports concurrent requests without queuing on Supabase pooler
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000, // Fail fast if Supabase is unreachable
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  });

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
  globalForPg.pgPool = pool;
}

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
