import express from 'express';
import {
    getAllUsers,
    registerUser,
    authUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/', registerUser);
router.route('/').get(protect, admin, getAllUsers);

export default router;