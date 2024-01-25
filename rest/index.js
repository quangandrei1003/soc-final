import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRouter from './routes/userRouter.js';
import trainRouter from './routes/trainRouter.js';
import trainCarriageRouter from './routes/trainCarriageRouter.js';
import reservationRouter from './routes/reservationRouter.js';

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
    console.log(`quang`);
    console.log('Requested Path:', req.path);
    next();
});


app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/trains/carriages', trainCarriageRouter);
app.use('/api/trains', trainRouter);
app.use('/api/reservations', reservationRouter);

app.use(notFound);
app.use(errorHandler);

app.get('/', function (req, res) {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
});




