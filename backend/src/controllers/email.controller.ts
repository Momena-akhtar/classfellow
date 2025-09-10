import { Request, Response } from 'express';
import { sendOTPEmail, verifyOTP } from '../services/email.service';

export class EmailController {
  async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      await sendOTPEmail(email);

      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: { email }
      });
    } catch (error: any) {
      let errorMessage = 'Failed to send OTP email';
      if (error && error.code === 'EAUTH') {
        errorMessage = 'Email authentication failed. Please check email configuration.';
      } else if (error && error.code === 'ECONNECTION') {
        errorMessage = 'Failed to connect to email server.';
      }

      res.status(500).json({
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? (error?.message || 'Unknown error') : undefined
      });
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      const isOTPValid = await verifyOTP(email, otp);

      if (!isOTPValid) {
        return res.status(400).json({
          success: false,
          message: 'OTP expired or not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        data: { email }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to verify OTP',
        error: process.env.NODE_ENV === 'development' ? (error?.message || 'Unknown error') : undefined
      });
    }
  }
}

export const emailController = new EmailController();


