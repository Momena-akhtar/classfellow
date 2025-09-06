import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access tokenj required'
      });
      return;
    }

    const decoded = authService.verifyToken(token);
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
      return;
    }

    const student = await authService.getStudentById(decoded.studentId);
    if (!student) {
      res.status(401).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    req.user = student;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = authService.verifyToken(token);
      if (decoded) {
        const student = await authService.getStudentById(decoded.studentId);
        if (student) {
          req.user = student;
        }
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};
