import { Request, Response } from 'express';
import { query } from '../config/database.js';
import { memoryCache } from '../utils/cache.js';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const cached = memoryCache.get<any>('dashboard_stats');
    if (cached) {
      res.json({ success: true, stats: cached });
      return;
    }

    const result = await query(`
      SELECT 
        (SELECT COUNT(*) FROM enquiries) as total_enquiries,
        (SELECT COUNT(*) FROM appointments) as total_appointments,
        (SELECT COUNT(*) FROM restorations) as total_restorations,
        (SELECT COUNT(*) FROM enquiries WHERE status = 'new') as pending_new_leads
    `);

    const row = result.rows[0] || {};
    const stats = {
      totalEnquiries: parseInt(row.total_enquiries || '0', 10),
      totalAppointments: parseInt(row.total_appointments || '0', 10),
      totalRestorations: parseInt(row.total_restorations || '0', 10),
      pendingNewLeads: parseInt(row.pending_new_leads || '0', 10),
    };

    memoryCache.set('dashboard_stats', stats, 15); // 15 seconds TTL
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard statistics' });
  }
};
