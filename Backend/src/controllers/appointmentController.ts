import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      'SELECT * FROM appointments ORDER BY created_at DESC'
    );

    // Map database snake_case to frontend camelCase
    const formatted = result.rows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      mobile: row.mobile,
      email: row.email,
      bikeBrand: row.bike_brand,
      bikeModel: row.bike_model,
      registrationNumber: row.registration_number,
      currentKm: row.current_km,
      serviceRequired: row.service_required,
      preferredDate: row.preferred_date,
      preferredTime: row.preferred_time,
      additionalProblem: row.additional_problem,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch appointments' });
  }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM appointments WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Appointment not found' });
      return;
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        fullName: row.full_name,
        mobile: row.mobile,
        email: row.email,
        bikeBrand: row.bike_brand,
        bikeModel: row.bike_model,
        registrationNumber: row.registration_number,
        currentKm: row.current_km,
        serviceRequired: row.service_required,
        preferredDate: row.preferred_date,
        preferredTime: row.preferred_time,
        additionalProblem: row.additional_problem,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch appointment' });
  }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      mobile,
      email,
      bikeBrand,
      bikeModel,
      registrationNumber,
      currentKm,
      serviceRequired,
      preferredDate,
      preferredTime,
      additionalProblem,
    } = req.body;

    if (!fullName || !mobile) {
      res.status(400).json({ success: false, error: 'Full name and mobile number are required' });
      return;
    }

    const id = `APT-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await query(
      `INSERT INTO appointments (
        id, full_name, mobile, email, bike_brand, bike_model,
        registration_number, current_km, service_required,
        preferred_date, preferred_time, additional_problem, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'new')
      RETURNING *`,
      [
        id,
        fullName,
        mobile,
        email || null,
        bikeBrand || null,
        bikeModel || null,
        registrationNumber || null,
        currentKm || null,
        serviceRequired || 'General Bike Service',
        preferredDate || null,
        preferredTime || null,
        additionalProblem || null,
      ]
    );

    const row = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        id: row.id,
        fullName: row.full_name,
        mobile: row.mobile,
        email: row.email,
        bikeBrand: row.bike_brand,
        bikeModel: row.bike_model,
        registrationNumber: row.registration_number,
        currentKm: row.current_km,
        serviceRequired: row.service_required,
        preferredDate: row.preferred_date,
        preferredTime: row.preferred_time,
        additionalProblem: row.additional_problem,
        status: row.status,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, error: 'Failed to create appointment' });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Appointment not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM appointments WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Appointment not found' });
      return;
    }

    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, error: 'Failed to delete appointment' });
  }
};
