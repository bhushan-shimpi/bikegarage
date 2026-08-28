import { Router } from 'express';
import {
  getAllParts,
  createPart,
  updatePart,
  deletePart,
} from '../controllers/partController.js';

const router = Router();

router.get('/', getAllParts);
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;
