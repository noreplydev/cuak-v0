import ErrorResponse from '../lib/ErrorResponse';
import Crypto from '../lib/Crypto';

export const authentication = (req: any, res: any, next) => {
    try {
        let token = req.headers['authorization'];
        token = token.split('Bearer ')[1]; // Skips the 'Bearer [token]' part
        if(!token) {
            return ErrorResponse('Unauthorized', res)
        }
        const decodedData = Crypto.jwtVerify(token);
        req.auth = decodedData; // The data of the token is stored HERE
        next();
    } catch (e) {
        if (e == "JsonWebTokenError: invalid token") {
            return ErrorResponse('Unauthorized', res)
        }
    }
}