import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student, IStudent } from '../models/student';
import { getOTP, removeOTP } from '../config/redis';

export interface AuthResponse {
  success: boolean;
  message: string;
  student?: {
    id: string;
    email: string;
    name: string;
    university: string;
    photo?: string | undefined;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  university: string;
  photo?: string;
}

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const existingStudent = await Student.findOne({ email: data.email });
      if (existingStudent) {
        return {
          success: false,
          message: 'Student with this email already exists'
        };
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const student = new Student({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        university: data.university,
        photo: data.photo
      });

      await student.save();

      const token = this.generateToken(student._id);

      return {
        success: true,
        message: 'Student created successfully',
        student: {
          id: student._id,
          email: student.email,
          name: student.name,
          university: student.university,
          photo: student.photo
        }
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Internal server error during signup'
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const student = await Student.findOne({ email: credentials.email });
      if (!student) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      const isPasswordValid = await bcrypt.compare(credentials.password, student.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      const token = this.generateToken(student._id);

      return {
        success: true,
        message: 'Login successful',
        student: {
          id: student._id,
          email: student.email,
          name: student.name,
          university: student.university,
          photo: student.photo
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Internal server error during login'
      };
    }
  }

  async getStudentById(id: string): Promise<IStudent | null> {
    try {
      return await Student.findById(id).select('-password');
    } catch (error) {
      console.error('Get student error:', error);
      return null;
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<AuthResponse> {
    try {
      const student = await Student.findOne({ email });
      if (!student) {
        return { success: false, message: 'Account not found' };
      }

      const stored = await getOTP(email);
      if (!stored || stored !== otp) {
        return { success: false, message: 'OTP expired or not found' };
      }

      const saltRounds = 12;
      student.password = await bcrypt.hash(newPassword, saltRounds);
      await student.save();
      await removeOTP(email);

      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, message: 'Internal server error during password reset' };
    }
  }

  private generateToken(studentId: string): string {
    return jwt.sign(
      { studentId },
      this.JWT_SECRET,
      { expiresIn: '1d'}
    );
  }

  verifyToken(token: string): { studentId: string } | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as { studentId: string };
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
