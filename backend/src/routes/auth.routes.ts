import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', 
    authController
    .signup
    .bind(authController));

router.post('/login', 
    authController
    .login
    .bind(authController));

router.post('/logout',
     authenticateToken, 
     authController
     .logout
     .bind(authController));

router.get('/profile', 
    authenticateToken, 
    authController
    .getProfile
    .bind(authController));

export default router;