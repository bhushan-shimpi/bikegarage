import { Router } from 'express';
import {
  getAllRestorations,
  getRestorationById,
  createRestoration,
  updateRestorationStatus,
} from '../controllers/restorationController.js';

const router = Router();

router.get('/', getAllRestorations);
router.get('/:id', getRestorationById);
router.post('/', createRestoration);
router.patch('/:id/status', updateRestorationStatus);

export default router;
