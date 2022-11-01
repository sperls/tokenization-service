import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.API_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
};
