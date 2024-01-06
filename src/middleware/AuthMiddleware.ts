import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import SERVICE_IDENTIFIERS from '../config/serviceIdentifiers';

@injectable()
class AuthMiddleware {
  private jwtSecret: string;

  constructor(@inject(SERVICE_IDENTIFIERS.JWT_SECRET) jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization');

    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Missing token' });
      return;
    }

    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      req.body.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Forbidden: Invalid token' });
      return;
    }
  }
}

export default AuthMiddleware;
