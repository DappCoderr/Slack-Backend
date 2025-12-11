import express from 'express';

import {
  createWorkspace,
  deleteWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updateWorkspaceController
} from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../../validation/workspaceSchema.js';
import { validate } from '../../validation/zodValidator.js';

const router = express.Router();

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspace
);

router.put('/:workspaceId', isAuthenticated, validate(updateWorkspaceSchema), updateWorkspaceController);

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default router;
