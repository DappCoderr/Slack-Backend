import express from 'express';

import { signUp } from '../../controller/userController';
import { userSignupSchema } from '../../validation/userSchema';
import { validate } from '../../validation/zodValidator';

const router = express.Router();

router.post('/signup', validate(userSignupSchema), signUp);

router.post('/signIn');

router.get('/');
router.get('/details')

router.put('/:id')
router.delete('/:id')

export default router;
