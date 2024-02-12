import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import UserModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import matchPassword from '../utils/matchPassword.js';

export const getAllUsers = asyncHandler(async (req, res) => {
    try {

        let { limit, offset } = req.query;

        limit = limit || 10;
        offset = offset || 0;
        const users = await UserModel.all({ limit: limit, offset: offset });

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error!`
        });
    }
});

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (name === '' || name === null || name === undefined) {
        res.status(400);
        throw new Error('Empty name');
    }

    if (email === '' || email === null || email === undefined) {
        res.status(400);
        throw new Error('Empty mail');
    }

    if (password === '' || password === null || password === undefined) {
        res.status(400);
        throw new Error('Empty password');
    }

    const userExists = await UserModel.findByEmail(email);

    if (userExists.length) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        name,
        email,
        password: hashed_password,
    });

    console.log(`user:${user}`);

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const [user] = await UserModel.findByEmail(email);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const isPasswordMatch = await matchPassword(user.password, password);

    if (user && isPasswordMatch) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


