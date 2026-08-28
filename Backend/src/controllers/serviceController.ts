import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getActiveServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      'SELECT * FROM bike_services WHERE is_active = true ORDER BY sort_order ASC, created_at ASC'
    );

    const formatted = result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      marathiName: row.marathi_name,
      iconName: row.icon_name || 'Wrench',
      shortDescription: row.short_description || '',
      fullDescription: row.full_description || '',
      included: row.included || [],
      estimatedTime: row.estimated_time || '',
      priceStartingAt: row.price_starting_at || '',
      category: row.category || 'maintenance',
      imageUrl: row.image_url || '/images/services/general-service.jpg',
      isPopular: row.is_popular || false,
      isActive: row.is_active,
      sortOrder: row.sort_order,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching active services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
};

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      'SELECT * FROM bike_services ORDER BY sort_order ASC, created_at ASC'
    );

    const formatted = result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      marathiName: row.marathi_name,
      iconName: row.icon_name || 'Wrench',
      shortDescription: row.short_description || '',
      fullDescription: row.full_description || '',
      included: row.included || [],
      estimatedTime: row.estimated_time || '',
      priceStartingAt: row.price_starting_at || '',
      category: row.category || 'maintenance',
      imageUrl: row.image_url || '/images/services/general-service.jpg',
      isPopular: row.is_popular || false,
      isActive: row.is_active,
      sortOrder: row.sort_order,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching all services for admin:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM bike_services WHERE id = $1 OR slug = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        marathiName: row.marathi_name,
        iconName: row.icon_name || 'Wrench',
        shortDescription: row.short_description || '',
        fullDescription: row.full_description || '',
        included: row.included || [],
        estimatedTime: row.estimated_time || '',
        priceStartingAt: row.price_starting_at || '',
        category: row.category || 'maintenance',
        imageUrl: row.image_url || '/images/services/general-service.jpg',
        isPopular: row.is_popular || false,
        isActive: row.is_active,
      },
    });
  } catch (error) {
    console.error('Error fetching service by id:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch service' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      marathiName,
      iconName,
      shortDescription,
      fullDescription,
      included,
      estimatedTime,
      priceStartingAt,
      category,
      imageUrl,
      isPopular,
    } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ success: false, error: 'Service name is required' });
      return;
    }

    const id = `s-${Date.now()}`;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `service-${Date.now()}`;

    // Get max sort order
    const maxOrderResult = await query('SELECT COALESCE(MAX(sort_order), 0) as max_order FROM bike_services');
    const nextOrder = parseInt(maxOrderResult.rows[0].max_order, 10) + 1;

    const result = await query(
      `INSERT INTO bike_services (
        id, slug, name, marathi_name, icon_name, short_description,
        full_description, included, estimated_time, price_starting_at,
        category, image_url, is_popular, is_active, sort_order
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, $14)
      RETURNING *`,
      [
        id,
        slug,
        name.trim(),
        marathiName?.trim() || null,
        iconName?.trim() || 'Wrench',
        shortDescription?.trim() || '',
        fullDescription?.trim() || '',
        JSON.stringify(included || []),
        estimatedTime?.trim() || '2 - 3 Hours',
        priceStartingAt?.trim() || '₹299',
        category?.trim() || 'maintenance',
        imageUrl?.trim() || '/images/services/general-service.jpg',
        Boolean(isPopular),
        nextOrder,
      ]
    );

    const row = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        marathiName: row.marathi_name,
        iconName: row.icon_name,
        shortDescription: row.short_description,
        fullDescription: row.full_description,
        included: row.included,
        estimatedTime: row.estimated_time,
        priceStartingAt: row.price_starting_at,
        category: row.category,
        imageUrl: row.image_url,
        isPopular: row.is_popular,
        isActive: row.is_active,
      },
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, error: 'Failed to create service' });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      marathiName,
      iconName,
      shortDescription,
      fullDescription,
      included,
      estimatedTime,
      priceStartingAt,
      category,
      imageUrl,
      isPopular,
      isActive,
      sortOrder,
    } = req.body;

    const existingResult = await query('SELECT * FROM bike_services WHERE id = $1', [id]);
    if (existingResult.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }

    const current = existingResult.rows[0];

    const result = await query(
      `UPDATE bike_services SET
        name = COALESCE($1, name),
        marathi_name = COALESCE($2, marathi_name),
        icon_name = COALESCE($3, icon_name),
        short_description = COALESCE($4, short_description),
        full_description = COALESCE($5, full_description),
        included = COALESCE($6, included),
        estimated_time = COALESCE($7, estimated_time),
        price_starting_at = COALESCE($8, price_starting_at),
        category = COALESCE($9, category),
        image_url = COALESCE($10, image_url),
        is_popular = COALESCE($11, is_popular),
        is_active = COALESCE($12, is_active),
        sort_order = COALESCE($13, sort_order),
        updated_at = NOW()
      WHERE id = $14
      RETURNING *`,
      [
        name !== undefined ? name.trim() : null,
        marathiName !== undefined ? marathiName.trim() : null,
        iconName !== undefined ? iconName.trim() : null,
        shortDescription !== undefined ? shortDescription.trim() : null,
        fullDescription !== undefined ? fullDescription.trim() : null,
        included !== undefined ? JSON.stringify(included) : null,
        estimatedTime !== undefined ? estimatedTime.trim() : null,
        priceStartingAt !== undefined ? priceStartingAt.trim() : null,
        category !== undefined ? category.trim() : null,
        imageUrl !== undefined ? imageUrl.trim() : null,
        isPopular !== undefined ? Boolean(isPopular) : null,
        isActive !== undefined ? Boolean(isActive) : null,
        sortOrder !== undefined ? parseInt(sortOrder, 10) : null,
        id,
      ]
    );

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        marathiName: row.marathi_name,
        iconName: row.icon_name,
        shortDescription: row.short_description,
        fullDescription: row.full_description,
        included: row.included,
        estimatedTime: row.estimated_time,
        priceStartingAt: row.price_starting_at,
        category: row.category,
        imageUrl: row.image_url,
        isPopular: row.is_popular,
        isActive: row.is_active,
      },
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, error: 'Failed to update service' });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM bike_services WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, error: 'Failed to delete service' });
  }
};
