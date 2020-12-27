import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) return res.status(401).json({ message: 'Token is required' });

  const token = bearer.split(" ")[1];

  try {
    await verify(token, jwtConfig.secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token malformed' });
  }
};