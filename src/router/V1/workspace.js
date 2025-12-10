import express from 'express';

import { createWorkspace } from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { createWorkspaceSchema } from '../../validation/workspaceSchema.js';
import { validate } from '../../validation/zodValidator.js';

const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspace
);

export default router;
