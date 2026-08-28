import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getAllRestorations = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM restorations ORDER BY created_at DESC');

    const formatted = result.rows.map((row) => ({
      id: row.id,
      ticketNumber: row.ticket_number,
      customerName: row.customer_name,
      mobileNumber: row.mobile,
      cityVillage: row.city_village,
      referralSource: row.referral_source,
      referralOther: row.referral_other,
      bikeBrand: row.bike_brand,
      bikeName: row.bike_name,
      bikeModel: row.bike_model,
      modelYear: row.model_year,
      registrationNumber: row.registration_number,
      bikeCondition: row.bike_condition,
      restorationRequired: row.restoration_required,
      selectedWorks: row.selected_works || [],
      otherWorkText: row.other_work_text,
      originalPartsRequired: row.original_parts_required,
      customerSuppliedParts: row.customer_supplied_parts,
      specialRequirements: row.special_requirements,
      customerSignature: row.customer_signature,
      formDate: row.form_date,
      status: row.status,
      createdAt: row.created_at,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching restorations:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch restoration submissions' });
  }
};

export const getRestorationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM restorations WHERE id = $1 OR ticket_number = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Restoration record not found' });
      return;
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        ticketNumber: row.ticket_number,
        customerName: row.customer_name,
        mobileNumber: row.mobile,
        cityVillage: row.city_village,
        referralSource: row.referral_source,
        referralOther: row.referral_other,
        bikeBrand: row.bike_brand,
        bikeName: row.bike_name,
        bikeModel: row.bike_model,
        modelYear: row.model_year,
        registrationNumber: row.registration_number,
        bikeCondition: row.bike_condition,
        restorationRequired: row.restoration_required,
        selectedWorks: row.selected_works || [],
        otherWorkText: row.other_work_text,
        originalPartsRequired: row.original_parts_required,
        customerSuppliedParts: row.customer_supplied_parts,
        specialRequirements: row.special_requirements,
        customerSignature: row.customer_signature,
        formDate: row.form_date,
        status: row.status,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('Error fetching restoration by id:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch restoration record' });
  }
};

export const createRestoration = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    if (!data.customerName || !data.mobileNumber) {
      res.status(400).json({
        success: false,
        error: 'Customer Name and Mobile Number are required',
      });
      return;
    }

    // Generate sequential ticket number
    const countResult = await query('SELECT COUNT(*) FROM restorations');
    const seq = parseInt(countResult.rows[0].count, 10) + 1;
    const ticketNumber = `REST-2026-${String(seq).padStart(3, '0')}`;
    const id = `rst-${Date.now()}`;

    // 1. Insert into restorations table
    const result = await query(
      `INSERT INTO restorations (
        id, ticket_number, customer_name, mobile, city_village,
        referral_source, referral_other, bike_brand, bike_name,
        bike_model, model_year, registration_number, bike_condition,
        restoration_required, selected_works, other_work_text,
        original_parts_required, customer_supplied_parts, special_requirements,
        customer_signature, form_date, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, 'new')
      RETURNING *`,
      [
        id,
        ticketNumber,
        data.customerName,
        data.mobileNumber,
        data.cityVillage || null,
        data.referralSource || null,
        data.referralOther || null,
        data.bikeBrand || null,
        data.bikeName || null,
        data.bikeModel || null,
        data.modelYear || null,
        data.registrationNumber || null,
        data.bikeCondition || null,
        data.restorationRequired || null,
        JSON.stringify(data.selectedWorks || []),
        data.otherWorkText || null,
        data.originalPartsRequired || 'Yes',
        data.customerSuppliedParts || 'No',
        data.specialRequirements || null,
        data.customerSignature || null,
        data.formDate || new Date().toLocaleDateString('en-IN'),
      ]
    );

    // 2. Mirror into enquiries table so staff sees it in general dashboard
    const enqId = `enq-${Date.now()}`;
    const enqTicket = `CAC-2026-${String(seq).padStart(3, '0')}`;
    const problemSummary = `
[BIKE RESTORATION SUBMISSION]
City/Village: ${data.cityVillage || 'N/A'}
Bike: ${data.bikeBrand || ''} ${data.bikeName || ''} ${data.bikeModel || ''} (${data.modelYear || 'Year N/A'})
Condition: ${data.bikeCondition || 'Average'}
Restoration Scope: ${data.restorationRequired || 'Comprehensive'}
Selected Works (${(data.selectedWorks || []).length}): ${(data.selectedWorks || []).join(', ')}
${data.otherWorkText ? `Other Works: ${data.otherWorkText}` : ''}
Original Spares: ${data.originalPartsRequired || 'Yes'} | Customer Parts: ${data.customerSuppliedParts || 'No'}
Instructions: ${data.specialRequirements || 'Factory Spec'}
    `.trim();

    await query(
      `INSERT INTO enquiries (
        id, ticket_number, type, customer_name, customer_mobile,
        customer_city, bike_brand, bike_model, registration_number,
        service_name, problem_description, quick_issues, status
      ) VALUES ($1, $2, 'quote_request', $3, $4, $5, $6, $7, $8, 'Bike Restoration', $9, $10, 'new')
      ON CONFLICT (ticket_number) DO NOTHING`,
      [
        enqId,
        enqTicket,
        data.customerName,
        data.mobileNumber,
        data.cityVillage || null,
        data.bikeBrand || null,
        `${data.bikeName || ''} ${data.bikeModel || ''}`.trim(),
        data.registrationNumber || null,
        problemSummary,
        JSON.stringify(data.selectedWorks || []),
      ]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.rows[0].id,
        ticketNumber,
        status: 'new',
        createdAt: result.rows[0].created_at,
      },
    });
  } catch (error) {
    console.error('Error submitting restoration form:', error);
    res.status(500).json({ success: false, error: 'Failed to submit restoration form' });
  }
};

export const updateRestorationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE restorations SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Restoration record not found' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating restoration status:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
};
