import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

interface AuthenticatedUser {
  id: number;
  role: 'ADMIN' | 'USER';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Token format invalid' });
  }

  const token = parts[1] as string;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
      req.user = {
        id: (decoded as any).id,
        role: (decoded as any).role,
      };
      return next();
    } else {
      return res.status(403).json({ error: 'Invalid token payload' });
    }
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized - Admins only' });
  }

  return next();
};
