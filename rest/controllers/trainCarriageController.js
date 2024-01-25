import asyncHandler from 'express-async-handler';

import TrainCarriageModel from '../models/trainCarriageModel.js';

export const getAllTrainCarriageAvailability = asyncHandler(async (req, res) => {
    try {
        const queryParams = req.query;
        const trainAvailabilities = await TrainCarriageModel.getAllTrainAvailabilityByFilter(queryParams);
        res.json(trainAvailabilities);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});

export const getTrainCarriageAvailability = asyncHandler(async (req, res) => {
    try {
        const trainId = req.params.id;
        const carriageInfo = TrainCarriageModel.getTrainAvailabilityByFilter(trainId);
        res.json(carriageInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
})








