import express from 'express';
import {
    getTrainCarriageAvailability,
    getAllTrainCarriageAvailability
} from '../controllers/trainCarriageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });


router.route('/').get(getAllTrainCarriageAvailability);

export default router;