import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDb } from './config/initDb.js';
import healthRoutes from './routes/healthRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import restorationRoutes from './routes/restorationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import repairRoutes from './routes/repairRoutes.js';
import partRoutes from './routes/partRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: '🏍️ Chaudhari Auto Centre API - Live on Supabase PostgreSQL',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// API Routes (mounted with /api and directly to support all deployment proxies & rewrites)
const registerRoutes = (prefix: string) => {
  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/services`, serviceRoutes);
  app.use(`${prefix}/customers`, customerRoutes);
  app.use(`${prefix}/repairs`, repairRoutes);
  app.use(`${prefix}/parts`, partRoutes);
  app.use(`${prefix}/appointments`, appointmentRoutes);
  app.use(`${prefix}/enquiries`, enquiryRoutes);
  app.use(`${prefix}/restorations`, restorationRoutes);
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/dashboard`, dashboardRoutes);
};

registerRoutes('/api');
registerRoutes('');

// Error Handler Middleware
app.use(errorHandler);

// Start Server & Ensure DB Schema is Ready (when running standalone/local)
async function initDbWithRetry(retries = 5, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await initDb();
      console.log('✅ Database schema verified and active.');
      return;
    } catch (err: any) {
      console.warn(`⚠️ DB connection attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delayMs));
      } else {
        console.error('❌ Could not initialize DB after retries. Will retry on request.');
      }
    }
  }
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Chaudhari Auto Backend listening on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️ Database: Connecting to Supabase PostgreSQL...`);
    console.log(`====================================================`);
  });

  initDbWithRetry();
}

export default app;
