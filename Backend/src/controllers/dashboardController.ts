import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [enquiriesCount, appointmentsCount, restorationsCount, newEnquiries] = await Promise.all([
      query('SELECT COUNT(*) FROM enquiries'),
      query('SELECT COUNT(*) FROM appointments'),
      query('SELECT COUNT(*) FROM restorations'),
      query("SELECT COUNT(*) FROM enquiries WHERE status = 'new'"),
    ]);

    res.json({
      success: true,
      stats: {
        totalEnquiries: parseInt(enquiriesCount.rows[0].count, 10),
        totalAppointments: parseInt(appointmentsCount.rows[0].count, 10),
        totalRestorations: parseInt(restorationsCount.rows[0].count, 10),
        pendingNewLeads: parseInt(newEnquiries.rows[0].count, 10),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard statistics' });
  }
};
