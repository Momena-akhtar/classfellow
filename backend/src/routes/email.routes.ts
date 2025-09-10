import { Router } from 'express';
import { emailController } from '../controllers/email.controller';

const router = Router();

router.post('/send-otp',
  emailController
    .sendOTP
    .bind(emailController)
);

router.post('/verify-otp',
  emailController
    .verifyOTP
    .bind(emailController)
);

export default router;