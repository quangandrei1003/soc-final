import soap from 'soap';
import express from 'express';
import fs from 'fs';
import axios from 'axios';

import { N0_TRAIN_AVAILABLE_MSG } from '../constants/message.js';


async function handleFilterRequest(args) {
    console.log('handle filter train request');

    let trainFilterUrl = `http://localhost:5001/api/trains/carriages`;
    let queryParams = {
        departureStation: args.departureStation !== null ? args.departureStation : undefined,
        arrivalStation: args.arrivalStation !== null ? args.arrivalStation : undefined,
        departureTime: args.departureTime !== null ? args.departureTime : undefined,
        arrivalTime: args.arrivalTime !== null ? args.arrivalTime : undefined,
        carriageClass: args.carriageClass !== null ? args.carriageClass : undefined,
        limit: args.limit !== null ? args.limit : undefined,
        offset: args.offset !== null ? args.offset : undefined,
    };

    queryParams = Object.fromEntries(
        Object.entries(queryParams).filter(([key, value]) => value !== undefined)
    );

    if (Object.values(queryParams).length) {
        trainFilterUrl = `${trainFilterUrl}?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    try {
        const trainResponse = await axios.get(trainFilterUrl);
        if (trainResponse.data.length === 0) return N0_TRAIN_AVAILABLE_MSG;
        return trainResponse.data;
    } catch (error) {
        console.log(`filter train error in soap service!`);
        console.log(error);
    }
}

async function handleBookRequest(args) {
    console.log('handle book train request');;
    let reservationUrl = `http://localhost:5001/api/reservations`;
    let requestBody = {
        trainId: args.trainId !== null ? args.trainId : undefined,
        className: args.className !== null ? args.className : undefined,
        userId: args.userId !== null ? args.userId : undefined,
        seatNumber: args.seatNumber !== null ? args.seatNumber : undefined,
    };

    requestBody = Object.fromEntries(
        Object.entries(requestBody).filter(([key, value]) => value !== undefined)
    );

    try {
        const reservationResponse = await axios.post(reservationUrl, requestBody);
        return reservationResponse.data;
    } catch (error) {
        console.log(error);
        console.log(`reserve train error in soap service!`);
    }


}

const serviceObject = {
    TrainMessageService: {
        TrainMessageSoapPort: {
            TrainMessage: handleFilterRequest,
            BookTrainMessage: handleBookRequest
        },
    }
};

const xml = fs.readFileSync('service.wsdl', 'utf8');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello world from soap service!');
});

const port = 8000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check http://localhost:" + port + wsdl_path + "?wsdl to see if the service is working");
});