import express from 'express';

import { signIn, signUp } from '../../controller/userController';
import { userSignInSchema, userSignupSchema } from '../../validation/userSchema';
import { validate } from '../../validation/zodValidator';

const router = express.Router();

router.post('/signup', validate(userSignupSchema), signUp);
router.post('/signin', validate(userSignInSchema), signIn);

router.get('/');
router.get('/details');

router.put('/:id');
router.delete('/:id');

export default router;
