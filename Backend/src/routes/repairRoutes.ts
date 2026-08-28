import { Router } from 'express';
import {
  getAllRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
  getDailyStats,
} from '../controllers/repairController.js';

const router = Router();

router.get('/', getAllRepairs);
router.get('/stats/daily', getDailyStats);
router.get('/:id', getRepairById);
router.post('/', createRepair);
router.put('/:id', updateRepair);
router.patch('/:id', updateRepair);
router.delete('/:id', deleteRepair);

export default router;
