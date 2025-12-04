import express from 'express';

import message from './message.js';
import user from './users.js';

const router = express.Router();

router.use('/message', message);
router.use('/users', user);

export default router;
