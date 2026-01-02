import express from 'express';

import { getChannelController } from '../../controller/channelController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/:channelId', isAuthenticated, getChannelController);

export default router;
