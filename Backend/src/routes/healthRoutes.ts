import { Router, Request, Response } from 'express';
import { query } from '../config/database.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbTest = await query('SELECT NOW() as current_time, current_database() as db_name');
    res.json({
      status: 'ok',
      service: 'Chaudhari Auto Centre API',
      database: 'connected',
      timestamp: dbTest.rows[0].current_time,
      databaseName: dbTest.rows[0].db_name,
      uptime: process.uptime(),
    });
  } catch (error: any) {
    console.error('Health check database error:', error);
    res.status(500).json({
      status: 'error',
      service: 'Chaudhari Auto Centre API',
      database: 'disconnected',
      error: error.message,
    });
  }
});

export default router;
