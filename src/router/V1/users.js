import express from 'express';

import {
  signIn,
  signUp,
  verifyEmailController
} from '../../controller/userController.js';
import {
  userSignInSchema,
  userSignUpSchema
} from '../../validation/userSchema.js';
import { validate } from '../../validation/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUp);
router.post('/signin', validate(userSignInSchema), signIn);
router.get('/verify/:token', verifyEmailController);

export default router;
