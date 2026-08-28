import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getAllEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, type, search } = req.query;
    let sql = 'SELECT * FROM enquiries WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    if (type && type !== 'all') {
      params.push(type);
      sql += ` AND type = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (customer_name ILIKE $${params.length} OR customer_mobile ILIKE $${params.length} OR ticket_number ILIKE $${params.length} OR bike_model ILIKE $${params.length})`;
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);

    const formatted = result.rows.map((row) => ({
      id: row.id,
      ticketNumber: row.ticket_number,
      type: row.type,
      customer: {
        name: row.customer_name,
        mobile: row.customer_mobile,
        email: row.customer_email,
        city: row.customer_city,
      },
      bike: {
        brand: row.bike_brand,
        model: row.bike_model,
        registrationNumber: row.registration_number,
      },
      service: {
        serviceName: row.service_name,
        problemDescription: row.problem_description,
        quickIssues: row.quick_issues || [],
      },
      attachments: row.attachments || [],
      status: row.status,
      notes: row.notes || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch enquiries' });
  }
};

export const getEnquiryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM enquiries WHERE id = $1 OR ticket_number = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Enquiry not found' });
      return;
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        ticketNumber: row.ticket_number,
        type: row.type,
        customer: {
          name: row.customer_name,
          mobile: row.customer_mobile,
          email: row.customer_email,
          city: row.customer_city,
        },
        bike: {
          brand: row.bike_brand,
          model: row.bike_model,
          registrationNumber: row.registration_number,
        },
        service: {
          serviceName: row.service_name,
          problemDescription: row.problem_description,
          quickIssues: row.quick_issues || [],
        },
        attachments: row.attachments || [],
        status: row.status,
        notes: row.notes || [],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch enquiry' });
  }
};

export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, customer, bike, service, attachments } = req.body;

    if (!customer?.name || !customer?.mobile) {
      res.status(400).json({ success: false, error: 'Customer name and mobile are required' });
      return;
    }

    // Count existing to generate sequential ticket number CAC-2026-xxx
    const countResult = await query('SELECT COUNT(*) FROM enquiries');
    const seq = parseInt(countResult.rows[0].count, 10) + 1;
    const ticketNumber = `CAC-2026-${String(seq).padStart(3, '0')}`;
    const id = `enq-${Date.now()}`;

    const result = await query(
      `INSERT INTO enquiries (
        id, ticket_number, type, customer_name, customer_mobile,
        customer_email, customer_city, bike_brand, bike_model,
        registration_number, service_name, problem_description,
        quick_issues, attachments, status, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'new', '[]'::jsonb)
      RETURNING *`,
      [
        id,
        ticketNumber,
        type || 'general_inquiry',
        customer.name,
        customer.mobile,
        customer.email || null,
        customer.city || null,
        bike?.brand || null,
        bike?.model || null,
        bike?.registrationNumber || null,
        service?.serviceName || 'General Bike Service',
        service?.problemDescription || '',
        JSON.stringify(service?.quickIssues || []),
        JSON.stringify(attachments || []),
      ]
    );

    const row = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        id: row.id,
        ticketNumber: row.ticket_number,
        status: row.status,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to create enquiry' });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE enquiries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Enquiry not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
};

export const addEnquiryNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text) {
      res.status(400).json({ success: false, error: 'Note text is required' });
      return;
    }

    const newNote = {
      id: `n-${Date.now()}`,
      author: author || 'Staff',
      text,
      createdAt: new Date().toISOString(),
    };

    const result = await query(
      `UPDATE enquiries 
       SET notes = notes || $1::jsonb, updated_at = NOW() 
       WHERE id = $2 
       RETURNING *`,
      [JSON.stringify(newNote), id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Enquiry not found' });
      return;
    }

    res.json({ success: true, data: newNote });
  } catch (error) {
    console.error('Error adding note to enquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to add note' });
  }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM enquiries WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Enquiry not found' });
      return;
    }

    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to delete enquiry' });
  }
};
