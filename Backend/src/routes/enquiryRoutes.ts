import { Router } from 'express';
import {
  getAllEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiryStatus,
  addEnquiryNote,
  deleteEnquiry,
  deleteMultipleEnquiries,
} from '../controllers/enquiryController.js';

const router = Router();

router.get('/', getAllEnquiries);
router.get('/:id', getEnquiryById);
router.post('/', createEnquiry);
router.patch('/:id/status', updateEnquiryStatus);
router.post('/:id/notes', addEnquiryNote);
router.delete('/:id', deleteEnquiry);
router.post('/bulk-delete', deleteMultipleEnquiries);
router.delete('/', deleteMultipleEnquiries);

export default router;
