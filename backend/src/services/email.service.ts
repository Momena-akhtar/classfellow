import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sender_email = process.env.SMTP_EMAIL;
const password = process.env.SMTP_PASS
const smtp_server = process.env.SMTP_HOST
const port = process.env.SMTP_PORT

import { storeOTP, getOTP } from '../config/redis';

const transporter = nodemailer.createTransport({
    host: smtp_server,
    port: Number(port),
    secure: true,
    auth: {
        user: sender_email,
        pass: password
    }
} as SMTPTransport.Options);

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (to: string): Promise<string> => {
    const otp = generateOTP();
    const mailOptions = {
        from: sender_email,
        to: to,
        subject: 'Your ClassFellow password reset code',
        text: `Hello,\n\nWe received a request to reset your ClassFellow password.\n\nYour one-time verification code is: ${otp}\nThis code expires in 5 minutes.\n\nIf you didn't request this, you can safely ignore this email.\n\nThanks,\nThe ClassFellow Team`,
        html: `
            <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111827;">
                <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 600;">Reset your ClassFellow password</h2>
                <p style="margin: 0 0 16px;">We received a request to reset your ClassFellow password.</p>
                <p style="margin: 0 0 8px;">Use this one-time verification code:</p>
                <div style="display: inline-block; padding: 12px 16px; font-size: 24px; letter-spacing: 4px; font-weight: 700; background: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 8px; color: #111827;">
                    ${otp}
                </div>
                <p style="margin: 16px 0 0; color: #6B7280;">This code expires in 5 minutes.</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 16px 0;" />
                <p style="margin: 0; font-size: 12px; color: #6B7280;">If you didn't request this, you can safely ignore this email.</p>
                <p style="margin: 8px 0 0; font-size: 12px; color: #6B7280;">— The ClassFellow Team</p>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
    await storeOTP(to, otp);
    
    return otp;
};

export const verifyOTP = async (to: string, otp: string) => {
    const storedOTP = await getOTP(to);
    if (storedOTP === otp) {
        return true;
    }
    return false;
};