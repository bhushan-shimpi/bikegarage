import { Router } from 'express';
import { login, getMe, createMechanic, getMechanics, deleteMechanic } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', requireAuth, getMe);
router.post('/mechanics', requireAuth, createMechanic);
router.get('/mechanics', requireAuth, getMechanics);
router.delete('/mechanics/:id', requireAuth, deleteMechanic);

export default router;
