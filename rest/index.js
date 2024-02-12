import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRouter from './routes/userRouter.js';
import trainRouter from './routes/trainRouter.js';
import trainCarriageRouter from './routes/trainCarriageRouter.js';
import reservationRouter from './routes/reservationRouter.js';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with OpenAPI',
            version: '1.0.0',
            description: 'Documentation for Express API',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./index.js'], // Path to the API routes file
};


const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
    console.log(`quang`);
    console.log('Requested Path:', req.path);
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(cors());


/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               users: [user1, user2, ...]
 *
 *   post:
 *     summary: Register a new user
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *
 */

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 123
 *               name: John Doe
 *               email: john.doe@example.com
 *               token: <generated_token>
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid email or password
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

app.use('/api/users', userRouter);

/**
 * @openapi
 * /api/trains/carriages:
 *   get:
 *     summary: Get all trains with carriages
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               trains: [
 *                 {
 *                   train_id: 1,
 *                   departure_station: 'Paris',
 *                   arrival_station: 'London',
 *                   departure_time: '2024-01-26T13:24:55.732Z',
 *                   arrival_time: '2024-01-25T21:46:18.046Z',
 *                   available_seats: 50,
 *                 },
 *               ]
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

app.use('/api/trains/carriages', trainCarriageRouter);
/**
 * @openapi
 * /api/trains:
 *   get:
 *     summary: Get all trains
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               trains: [train1, train2, ...]
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @openapi
 * /api/trains/{trainId}:
 *   get:
 *     summary: Get a train by ID
 *     parameters:
 *       - in: path
 *         name: trainId
 *         required: true
 *         description: The ID of the train to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               train: {id, train_name, departure_station, arrival_station, departure_time, arrival_time }
 *       '404':
 *         description: Train not found
 *         content:
 *           application/json:
 *             example:
 *               error: Train not found
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @openapi
 * /api/trains/{id}/carriages:
 *   get:
 *     summary: Get train details with carriages and seat availability
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the train to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 5
 *               train_name: "RATP"
 *               departure_station: "Paris"
 *               arrival_station: "Lyon"
 *               departure_time: "2024-01-27T07:30:00.000Z"
 *               arrival_time: "2024-01-27T12:00:00.000Z"
 *               created_at: "2024-01-26T13:27:36.101Z"
 *               updated_at: "2024-01-26T13:27:36.101Z"
 *               carriageInfo:
 *                 0:
 *                   train_id: 5
 *                   available_seat: 49
 *                   class_name: "A"
 *                 1:
 *                   train_id: 5
 *                   available_seat: 200
 *                   class_name: "B"
 *       '404':
 *         description: Train not found
 *         content:
 *           application/json:
 *             example:
 *               error: Train not found
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
app.use('/api/trains', trainRouter);

/**
 * @openapi
 * /api/reservations:
 *   post:
 *     summary: Create a reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainId:
 *                 type: string
 *                 description: The ID of the train for the reservation
 *               className:
 *                 type: string
 *                 description: The class name for the reservation
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the reservation
 *               seatNumber:
 *                 type: string
 *                 description: The seat number for the reservation
 *     responses:
 *       '200':
 *         description: Successful reservation
 *         content:
 *           application/json:
 *             example:
 *               reservationStatus: true
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
app.use('/api/reservations', reservationRouter);

app.use(notFound);
app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
});




