import asyncHandler from 'express-async-handler';

import TrainModel from '../models/trainModel.js';
import TrainCarriageModel from '../models/trainCarriageModel.js';

export const getAllTrains = asyncHandler(async (req, res) => {
    try {

        let { limit, offset } = req.query;

        limit = limit || 10;
        offset = offset || 0;

        const trains = await TrainModel.all({ limit: limit, offset: offset });

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
});

export const makeTrain = asyncHandler(async (req, res) => {
    try {




        const { trainName, departureStation,
            arrivalStation,
            departureTime,
            arrivalTime
        } = req.body;


        const train = await TrainModel.makeTrain({
            train_name: trainName,
            departure_station: departureStation,
            arrival_station: arrivalStation,
            departure_time: new Date(departureTime),
            arrival_time: new Date(arrivalTime)
        });
        res.json(train);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});








