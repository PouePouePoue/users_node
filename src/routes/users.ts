import express from 'express';
import { getUsers, getUserById, blockUser, searchUsers } from '../controllers/usersController';
import { authenticateToken } from '../middleware/auth';
import { requireAdmin, requireAdminOrSelf } from '../middleware/roleCheck';

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getUsers);
router.get('/search', authenticateToken, requireAdmin, searchUsers);
router.get('/:id', authenticateToken, requireAdminOrSelf, getUserById);
router.patch('/:id/block', authenticateToken, requireAdminOrSelf, blockUser);

export default router;