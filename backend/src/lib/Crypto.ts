import jwt from 'jsonwebtoken'

require('dotenv').config();
export default class Crypto {
    constructor() {

    }
    static jwtSign = (data: any, expiration?: any) => {
        const secret = process.env.JWT_SECRET
        return jwt.sign(data, secret, { expiresIn: expiration ?? '1y' });
    }

    static jwtVerify(token: string) {
        const secret = process.env.JWT_SECRET
        const decodedData = jwt.verify(token, secret);
        if (!token) throw 'Unauthorized'
        return decodedData
    }
}