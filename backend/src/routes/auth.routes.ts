import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new student
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *           example:
 *             email: momen@gmail.com
 *             password: password123
 *             name: Momena
 *             university: NUST
 *             photo: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: Student created successfully
 *               student:
 *                 id: 507f1f77bcf86cd799439011
 *                 email: momen@gmail.com
 *                 name: Momena
 *                 university: NUST
 *                 photo: https://example.com/photo.jpg
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Email, password, name, and university are required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/signup', 
    authController.signup.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login student
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: momen@gmail.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: Login successful
 *               student:
 *                 id: 507f1f77bcf86cd799439011
 *                 email: momen@gmail.com
 *                 name: Momena
 *                 university: NUST
 *                 photo: https://example.com/photo.jpg
 *         headers:
 *           Set-Cookie:
 *             description: JWT token stored in httpOnly cookie
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid email or password
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', 
    authController.login.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout student
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *         headers:
 *           Set-Cookie:
 *             description: JWT token cookie cleared
 *             schema:
 *               type: string
 *               example: token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
 *       401:
 *         description: Unauthorized - token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Access token required
 */
router.post('/logout',
     authenticateToken, 
     authController.logout.bind(authController));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current student profile
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Student profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *             example:
 *               success: true
 *               student:
 *                 id: 507f1f77bcf86cd799439011
 *                 email: momen@gmail.com
 *                 name: Momena
 *                 university: NUST
 *                 photo: https://example.com/photo.jpg
 *                 courses: ["507f1f77bcf86cd799439012"]
 *       401:
 *         description: Unauthorized - token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Access token required
 */
router.get('/profile', 
    authenticateToken, 
    authController.getProfile.bind(authController));

export default router;