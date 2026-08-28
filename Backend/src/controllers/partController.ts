import { Request, Response } from 'express';
import { query } from '../config/database.js';

export const getAllParts = async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        id, 
        name, 
        category, 
        price, 
        stock_quantity as "stockQuantity",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM parts_inventory 
      ORDER BY category ASC, name ASC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Error fetching parts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPart = async (req: Request, res: Response) => {
  try {
    const { name, category, price, stockQuantity } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Part name and price are required' });
    }

    const id = `prt-${Date.now()}`;
    const result = await query(
      `INSERT INTO parts_inventory (id, name, category, price, stock_quantity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING 
         id, 
         name, 
         category, 
         price, 
         stock_quantity as "stockQuantity",
         created_at as "createdAt"`,
      [id, name.trim(), category?.trim() || 'General', Number(price) || 0, Number(stockQuantity) || 0]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Error creating part:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, stockQuantity } = req.body;

    const result = await query(
      `UPDATE parts_inventory
       SET 
         name = COALESCE($1, name),
         category = COALESCE($2, category),
         price = COALESCE($3, price),
         stock_quantity = COALESCE($4, stock_quantity),
         updated_at = NOW()
       WHERE id = $5
       RETURNING 
         id, 
         name, 
         category, 
         price, 
         stock_quantity as "stockQuantity",
         updated_at as "updatedAt"`,
      [
        name ? name.trim() : null,
        category ? category.trim() : null,
        price !== undefined ? Number(price) : null,
        stockQuantity !== undefined ? Number(stockQuantity) : null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating part:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM parts_inventory WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, message: 'Part deleted from inventory' });
  } catch (error: any) {
    console.error('Error deleting part:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
