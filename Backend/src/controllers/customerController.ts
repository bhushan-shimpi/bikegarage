import { Request, Response } from 'express';
import { query } from '../config/database.js';
import { memoryCache } from '../utils/cache.js';

export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const cached = memoryCache.get<any[]>('customers_all');
    if (cached) {
      res.json({ success: true, data: cached });
      return;
    }

    const result = await query('SELECT * FROM customers ORDER BY created_at DESC');

    const formatted = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      mobile: row.mobile,
      email: row.email,
      city: row.city,
      bikeBrand: row.bike_brand,
      bikeModel: row.bike_model,
      registrationNumber: row.registration_number,
      currentKm: row.current_km,
      notes: row.notes,
      createdAt: row.created_at,
    }));

    memoryCache.set('customers_all', formatted, 30); // 30s TTL
    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customers' });
  }
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      mobile,
      email,
      city,
      bikeBrand,
      bikeModel,
      registrationNumber,
      currentKm,
      notes,
    } = req.body;

    if (!name || !mobile) {
      res.status(400).json({ success: false, error: 'Name and mobile are required' });
      return;
    }

    const cleanMobile = mobile.trim().replace(/\D/g, '').slice(-10);
    const id = `cust-${Date.now()}`;

    const result = await query(
      `INSERT INTO customers (
        id, name, mobile, email, city, bike_brand, bike_model,
        registration_number, current_km, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (mobile) DO UPDATE SET
        name = EXCLUDED.name,
        email = COALESCE(EXCLUDED.email, customers.email),
        city = COALESCE(EXCLUDED.city, customers.city),
        bike_brand = COALESCE(EXCLUDED.bike_brand, customers.bike_brand),
        bike_model = COALESCE(EXCLUDED.bike_model, customers.bike_model),
        registration_number = COALESCE(EXCLUDED.registration_number, customers.registration_number),
        current_km = COALESCE(EXCLUDED.current_km, customers.current_km),
        updated_at = NOW()
      RETURNING *`,
      [
        id,
        name.trim(),
        cleanMobile,
        email?.trim() || null,
        city?.trim() || 'Pahur',
        bikeBrand?.trim() || null,
        bikeModel?.trim() || null,
        registrationNumber?.trim() || null,
        currentKm?.trim() || null,
        notes?.trim() || null,
      ]
    );

    const row = result.rows[0];
    memoryCache.del('customers_all');
    res.status(201).json({
      success: true,
      data: {
        id: row.id,
        name: row.name,
        mobile: row.mobile,
        email: row.email,
        city: row.city,
        bikeBrand: row.bike_brand,
        bikeModel: row.bike_model,
        registrationNumber: row.registration_number,
        currentKm: row.current_km,
        notes: row.notes,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ success: false, error: 'Failed to create customer' });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM customers WHERE id = $1 OR mobile = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Customer not found' });
      return;
    }

    memoryCache.del('customers_all');
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ success: false, error: 'Failed to delete customer' });
  }
};

export const getCustomerRepairs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT * FROM repair_records 
       WHERE customer_id = $1 OR customer_mobile = $1 
       ORDER BY created_at DESC`,
      [id]
    );

    const formatted = result.rows.map((row) => ({
      id: row.id,
      jobNumber: row.job_number,
      customerName: row.customer_name,
      customerMobile: row.customer_mobile,
      bikeBrand: row.bike_brand,
      bikeModel: row.bike_model,
      registrationNumber: row.registration_number,
      currentKm: row.current_km,
      serviceType: row.service_type,
      problemDetails: row.problem_details,
      partsReplaced: row.parts_replaced || [],
      laborCharge: parseFloat(row.labor_charge || 0),
      partsTotal: parseFloat(row.parts_total || 0),
      totalAmount: parseFloat(row.total_amount || 0),
      paymentStatus: row.payment_status,
      status: row.status,
      photos: row.photos || [],
      repairDate: row.repair_date,
      createdAt: row.created_at,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching customer repairs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customer repair history' });
  }
};
