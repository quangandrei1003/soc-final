import express from 'express';
import {
    makeReservation
} from '../controllers/reservationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, makeReservation);

export default router;