import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getAllRepairs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, date } = req.query;
    let sql = 'SELECT * FROM repair_records WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    if (date) {
      params.push(`%${date}%`);
      sql += ` AND repair_date ILIKE $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (customer_name ILIKE $${params.length} OR customer_mobile ILIKE $${params.length} OR registration_number ILIKE $${params.length} OR job_number ILIKE $${params.length} OR bike_model ILIKE $${params.length})`;
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);

    const formatted = result.rows.map((row) => ({
      id: row.id,
      jobNumber: row.job_number,
      customerId: row.customer_id,
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
    console.error('Error fetching repair records:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch repair records' });
  }
};

export const getRepairById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM repair_records WHERE id = $1 OR job_number = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Repair record not found' });
      return;
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        jobNumber: row.job_number,
        customerId: row.customer_id,
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
      },
    });
  } catch (error) {
    console.error('Error fetching repair record by id:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch repair record' });
  }
};

export const createRepair = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      customerMobile,
      bikeBrand,
      bikeModel,
      registrationNumber,
      currentKm,
      serviceType,
      problemDetails,
      partsReplaced,
      laborCharge,
      partsTotal,
      totalAmount,
      paymentStatus,
      status,
      photos,
      repairDate,
    } = req.body;

    if (!customerName || !customerMobile) {
      res.status(400).json({
        success: false,
        error: 'Customer name and mobile number are required',
      });
      return;
    }

    const cleanMobile = customerMobile.trim().replace(/\D/g, '').slice(-10);

    // Sequential job number JOB-2026-xxx
    const countResult = await query('SELECT COUNT(*) FROM repair_records');
    const seq = parseInt(countResult.rows[0].count, 10) + 1;
    const jobNumber = `JOB-2026-${String(seq).padStart(3, '0')}`;
    const id = `job-${Date.now()}`;
    const dateStr = repairDate || new Date().toISOString().split('T')[0];

    // Compute parts total and grand total if not supplied
    const parts = Array.isArray(partsReplaced) ? partsReplaced : [];
    const calculatedPartsTotal = parts.reduce(
      (sum: number, p: any) => sum + (parseFloat(p.cost) || 0),
      0
    );
    const calculatedLabor = parseFloat(laborCharge || 0);
    const calculatedTotal =
      parseFloat(totalAmount) || calculatedPartsTotal + calculatedLabor;

    // 1. Insert into repair_records
    const result = await query(
      `INSERT INTO repair_records (
        id, job_number, customer_id, customer_name, customer_mobile,
        bike_brand, bike_model, registration_number, current_km,
        service_type, problem_details, parts_replaced, labor_charge,
        parts_total, total_amount, payment_status, status, photos,
        repair_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *`,
      [
        id,
        jobNumber,
        cleanMobile,
        customerName.trim(),
        cleanMobile,
        bikeBrand?.trim() || null,
        bikeModel?.trim() || null,
        registrationNumber?.trim() || null,
        currentKm?.trim() || null,
        serviceType?.trim() || 'General Bike Repair',
        problemDetails?.trim() || '',
        JSON.stringify(parts),
        calculatedLabor,
        calculatedPartsTotal,
        calculatedTotal,
        paymentStatus || 'Paid',
        status || 'Completed',
        JSON.stringify(photos || []),
        dateStr,
      ]
    );

    // 2. Ensure customer profile is registered in customers table
    const custId = `cust-${cleanMobile}`;
    await query(
      `INSERT INTO customers (
        id, name, mobile, bike_brand, bike_model, registration_number, current_km
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (mobile) DO UPDATE SET
        name = EXCLUDED.name,
        bike_brand = COALESCE(EXCLUDED.bike_brand, customers.bike_brand),
        bike_model = COALESCE(EXCLUDED.bike_model, customers.bike_model),
        registration_number = COALESCE(EXCLUDED.registration_number, customers.registration_number),
        current_km = COALESCE(EXCLUDED.current_km, customers.current_km),
        updated_at = NOW()`,
      [
        custId,
        customerName.trim(),
        cleanMobile,
        bikeBrand?.trim() || null,
        bikeModel?.trim() || null,
        registrationNumber?.trim() || null,
        currentKm?.trim() || null,
      ]
    );

    const row = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        id: row.id,
        jobNumber: row.job_number,
        customerName: row.customer_name,
        customerMobile: row.customer_mobile,
        bikeModel: row.bike_model,
        registrationNumber: row.registration_number,
        totalAmount: parseFloat(row.total_amount),
        paymentStatus: row.payment_status,
        status: row.status,
        repairDate: row.repair_date,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Error logging repair record:', error);
    res.status(500).json({ success: false, error: 'Failed to create repair record' });
  }
};

export const updateRepair = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      status,
      paymentStatus,
      laborCharge,
      partsReplaced,
      totalAmount,
      problemDetails,
      photos,
    } = req.body;

    const result = await query(
      `UPDATE repair_records SET
        status = COALESCE($1, status),
        payment_status = COALESCE($2, payment_status),
        labor_charge = COALESCE($3, labor_charge),
        parts_replaced = COALESCE($4, parts_replaced),
        total_amount = COALESCE($5, total_amount),
        problem_details = COALESCE($6, problem_details),
        photos = COALESCE($7, photos),
        updated_at = NOW()
      WHERE id = $8 OR job_number = $8
      RETURNING *`,
      [
        status || null,
        paymentStatus || null,
        laborCharge !== undefined ? parseFloat(laborCharge) : null,
        partsReplaced !== undefined ? JSON.stringify(partsReplaced) : null,
        totalAmount !== undefined ? parseFloat(totalAmount) : null,
        problemDetails !== undefined ? problemDetails.trim() : null,
        photos !== undefined ? JSON.stringify(photos) : null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Repair record not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating repair record:', error);
    res.status(500).json({ success: false, error: 'Failed to update repair record' });
  }
};

export const deleteRepair = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM repair_records WHERE id = $1 OR job_number = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Repair record not found' });
      return;
    }

    res.json({ success: true, message: 'Repair record deleted successfully' });
  } catch (error) {
    console.error('Error deleting repair record:', error);
    res.status(500).json({ success: false, error: 'Failed to delete repair record' });
  }
};

export const getDailyStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const [todayCompleted, todayRevenue, inWorkshop, allTime] = await Promise.all([
      query("SELECT COUNT(*) FROM repair_records WHERE status = 'Completed' AND repair_date = $1", [todayStr]),
      query("SELECT COALESCE(SUM(total_amount), 0) as revenue FROM repair_records WHERE repair_date = $1", [todayStr]),
      query("SELECT COUNT(*) FROM repair_records WHERE status = 'In Progress'"),
      query("SELECT COUNT(*) as total_count, COALESCE(SUM(total_amount), 0) as total_revenue FROM repair_records"),
    ]);

    res.json({
      success: true,
      stats: {
        todayCompletedCount: parseInt(todayCompleted.rows[0].count, 10),
        todayRevenue: parseFloat(todayRevenue.rows[0].revenue),
        inWorkshopCount: parseInt(inWorkshop.rows[0].count, 10),
        lifetimeRepairsCount: parseInt(allTime.rows[0].total_count, 10),
        lifetimeRevenue: parseFloat(allTime.rows[0].total_revenue),
        todayDate: todayStr,
      },
    });
  } catch (error) {
    console.error('Error calculating repair stats:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate daily stats' });
  }
};
