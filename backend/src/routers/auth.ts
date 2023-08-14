import express from 'express'
import User from '../models/User';
import MongoDB from '../lib/MongoDB';
import Crypto from '../lib/Crypto'
import ErrorResponse from '../lib/ErrorResponse';

require('dotenv').config();
const router = express.Router();

router.post('/api/v1/users/login', async (req, res) => {
    const data = req.body
    const email = data.email.toLowerCase()
    try {
        const user = await MongoDB.readOne('users', { email: email });
        const hash = user.password
        await User.validatePassword(data.password, hash)
        // Obtain Token
        const dataToSign = { "email": user.email, "type": user.type, "status": user.status }
        const jwtToken = Crypto.jwtSign(dataToSign);
        const responseBody = {
            "email": user.email,
            "token": jwtToken,
            "type": user.type,
            "status": user.status
        }
        res.send(responseBody);
    } catch (e) {
        ErrorResponse(e, res)
    }
});

router.post('/api/v1/users/register', async (req, res) => {
    const payload = req.body;
    const email = payload.email.toLowerCase();
    const password = payload.password;
    try {
        const hash = await User.generateHash(password);
        const user = await MongoDB.create('users', { email, password: hash, type: "user", status: "confirmed" });
        // Obtain Token
        const dataToSign = { "email": user.email, "type": user.type, "status": user.status }
        const jwtToken = Crypto.jwtSign(dataToSign);
        const responseBody = {
            "email": user.email,
            "token": jwtToken,
            "type": user.type,
            "status": user.status
        }
        res.send(responseBody);
    } catch (e) {
        ErrorResponse(e, res)
    }
});

export default router 