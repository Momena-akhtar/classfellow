import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// public
router.post('/signup', 
    authController.signup.bind(authController));
router.post('/login', 
    authController.login.bind(authController));

// protected
router.post('/logout',
     authenticateToken, 
     authController.logout.bind(authController));
router.get('/profile', 
    authenticateToken, 
    authController.getProfile.bind(authController));

export default router;
