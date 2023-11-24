import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET_KEY = process.env.JWT_KEY;

if(!SECRET_KEY){
    throw new Error('SECRET_KEY not found in .env file!')
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string, role: string }; 

        if (decoded.role !== 'user') {
            return res.status(401).json({ message: 'Invalid user token' });
        }

        (req as any).user = decoded.userId;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const authenticateAndAuthorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string, role: string };

        if (decoded.role !== 'admin') {
            return res.status(401).json({ message: 'Invalid admin token' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const authenticateUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string, role: string };

        if (!decoded) {
            return res.status(403).json({ message: 'No token, authorization denied' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

