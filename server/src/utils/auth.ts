import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

interface DecodedToken {
    data: {
        _id: string;
        username: string;
        email: string;
    };
    iat: number;
    exp: number;
}

export const authenticateToken = ({ req }: any) => {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop()?.trim();
    }

    if (!token) {
        return req;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string, { maxAge: '2hr' }) as DecodedToken;
        req.user = decoded.data;

        if (req.user && req.user._id && !mongoose.Types.ObjectId.isValid(req.user._id)) {
            console.error('Invalid user _id in token');
            return req;
        }

        return req;
    } catch (err) {
        console.log('Invalid token');
        return req;
    }
};

export const signToken = (username: string, email: string, _id: mongoose.Types.ObjectId) => {
    const secretKey: any = process.env.JWT_SECRET_KEY;

    if (typeof secretKey !== 'string') {
        throw new Error('Secret key is not a string');
    }

    try {
        const payload = {
            data: {
                _id: _id.toString(),
                username,
                email,
            },
        };
        return jwt.sign(payload, secretKey, { expiresIn: '2h' });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to sign token');
    }
};

export class AuthenticationError extends GraphQLError {
    constructor(message: string) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
};
