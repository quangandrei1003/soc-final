import express from 'express';
import {
    getAllTrains,
    getTrainById,
    getTrainCarriageAvailabilityById,
    makeTrain
} from '../controllers/trainController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import trainCarriageRouter from './trainCarriageRouter.js';
const router = express.Router({ mergeParams: true });

router.route('/').get(getAllTrains);
router.route('/:id').get(getTrainById);
router.route('/:id/carriages').get(getTrainCarriageAvailabilityById);
router.route('/').post(protect, admin, makeTrain);

export default router;