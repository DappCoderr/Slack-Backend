import express from 'express';

import { signUp } from '../../controller/userController';
import { userSignupSchema } from '../../validation/userSchema';
import { validate } from '../../validation/zodValidator';

const router = express.Router();

router.post('/signup', validate(userSignupSchema), signUp);

export default router;
