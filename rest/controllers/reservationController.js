import asyncHandler from 'express-async-handler';
import TrainCarriageModel from '../models/trainCarriageModel.js';
import ReservationModel from '../models/reservationModel.js';
import { REVERSATION_NOT_AVAILABLE } from '../../constants/message.js';

export const makeReservation = asyncHandler(async (req, res) => {
    try {
        const MIN_AVAILABLE_SEAT = 1;

        const { trainId, className, userId, seatNumber } = req.body;
        const classTypeId = className === 'A' ? 0 : 1;
        const availableSeats = await TrainCarriageModel.getSeatAvailability(trainId, classTypeId);
        const isAvailable = availableSeats.available_seat > MIN_AVAILABLE_SEAT ? true : false;

        if (!isAvailable) {
            res.status(409);
            res.json({
                message: REVERSATION_NOT_AVAILABLE
            });
            return;
        }

        const updateResponse = await TrainCarriageModel.updateSeatAvailability(trainId, classTypeId, +availableSeats.available_seat - 1);
        if (updateResponse) {
            const response = await ReservationModel.makeReservation({
                train_id: trainId,
                user_id: userId,
                carriage_class_id: classTypeId,
                seat_number: seatNumber,
            });

            const statusCode = response !== undefined ? 201 : 500;
            const reservationStatus = response !== undefined ? true : false;

            res.status(statusCode);
            res.json({
                reservationStatus
            });
        }
    } catch (error) {
        console.error(error);
        console.log(`Error while making reservation`);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});










