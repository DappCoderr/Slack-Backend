import express from 'express';

import { signUp } from '../../controller/userController';
import { validate } from '../../validation/zodValidator';
import { userSignupSchema } from '../../validation/userSchema';

const router = express.Router();

router.post('/signup', validate(userSignupSchema), signUp);

export default router;
