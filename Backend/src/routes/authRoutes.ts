import { Router } from 'express';
import {
  login,
  getMe,
  createMechanic,
  getMechanics,
  updateMechanic,
  deleteMechanic,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', requireAuth, getMe);
router.post('/mechanics', requireAuth, createMechanic);
router.get('/mechanics', getMechanics);
router.put('/mechanics/:id', requireAuth, updateMechanic);
router.patch('/mechanics/:id', requireAuth, updateMechanic);
router.delete('/mechanics/:id', requireAuth, deleteMechanic);

export default router;
