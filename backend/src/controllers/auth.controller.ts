import { Request, Response } from 'express';
import { authService, LoginCredentials, SignupData } from '../services/auth.service';

export class AuthController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, university, major, photo, courses } = req.body;

      if (!email || !password || !name || !university) {
        res.status(400).json({
          success: false,
          message: 'Email, password, name, and university are required'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
        return;
      }

      // Validate courses 
      if (courses && Array.isArray(courses)) {
        for (const course of courses) {
          if (!course.name || !course.description) {
            res.status(400).json({
              success: false,
              message: 'Each course must have a name and description'
            });
            return;
          }
          if (!Array.isArray(course.books) || course.books.length === 0) {
            res.status(400).json({
              success: false,
              message: 'Each course must have at least one book'
            });
            return;
          }
          for (const book of course.books) {
            if (!book.name || !book.pdfUrl) {
              res.status(400).json({
                success: false,
                message: 'Each book must have a name and PDF URL'
              });
              return;
            }
          }
        }
      }

      const signupData: SignupData = {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
        university: university.trim(),
        major: major?.trim(),
        photo: photo?.trim(),
        courses: courses?.map((course: any) => ({
          name: course.name.trim(),
          description: course.description.trim(),
          books: course.books.map((book: any) => ({
            name: book.name.trim(),
            pdfUrl: book.pdfUrl.trim()
          }))
        }))
      };

      const result = await authService.signup(signupData);

      if (result.success) {
        const token = authService['generateToken'](result.student!.id);
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
          success: true,
          message: result.message,
          student: result.student
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Signup controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
        return;
      }

      const credentials: LoginCredentials = {
        email: email.toLowerCase().trim(),
        password
      };

      const result = await authService.login(credentials);

      if (result.success) {
        const token = authService['generateToken'](result.student!.id);
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
          success: true,
          message: result.message,
          student: result.student
        });
      } else {
        res.status(401).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Login controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('token');
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const student = req.user;
      res.status(200).json({
        success: true,
        student
      });
    } catch (error) {
      console.error('Get profile controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, password } = req.body;

      if (!email || !otp || !password) {
        res.status(400).json({
          success: false,
          message: 'Email, OTP and new password are required'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
        return;
      }

      const result = await authService.resetPassword(email.toLowerCase().trim(), otp, password);

      if (result.success) {
        res.status(200).json({ success: true, message: result.message });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error('Reset password controller error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

export const authController = new AuthController();
