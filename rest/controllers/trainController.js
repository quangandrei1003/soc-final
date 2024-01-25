import asyncHandler from 'express-async-handler';

import TrainModel from '../models/trainModel.js';
import TrainCarriageModel from '../models/trainCarriageModel.js';

export const getAllTrains = asyncHandler(async (req, res) => {
    try {
        const trains = await TrainModel.all();
        res.json(trains);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});


export const getTrainById = asyncHandler(async (req, res) => {
    try {
        const train = await TrainModel.findById(req.params.id);
        res.json(train);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});

export const getTrainCarriageAvailabilityById = asyncHandler(async (req, res) => {
    try {
        const train = await TrainModel.findById(req.params.id);
        const carriageInfo = await TrainCarriageModel.getTrainAvailabilityByFilter(req.params.id);

        const responseObject = {
            ...train,
            carriageInfo: {
                ...carriageInfo
            }
        };
        res.json(responseObject);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
})







