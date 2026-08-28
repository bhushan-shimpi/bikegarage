import { Router } from 'express';
import {
  getActiveServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = Router();

router.get('/', getActiveServices);
router.get('/all', getAllServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/:id', updateService);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
