import express from 'express';

import user from './users.js';
import channel from './channels.js'
import workspace from './workspace.js';

const router = express.Router();

router.use('/workspaces', workspace);
router.use('/channels', channel);
router.use('/users', user);

export default router;
