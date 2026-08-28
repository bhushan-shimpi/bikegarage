import { Router } from 'express';
import {
  getAllCustomers,
  createCustomer,
  deleteCustomer,
  getCustomerRepairs,
} from '../controllers/customerController.js';

const router = Router();

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id/repairs', getCustomerRepairs);

export default router;
