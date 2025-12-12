import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspace,
  deleteWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updateWorkspaceController
} from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import {
  createWorkspaceSchema,
  updateWorkspaceSchema
} from '../../validation/workspaceSchema.js';
import { validate } from '../../validation/zodValidator.js';

const router = express.Router();

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspace
);
router.post('/:workspaceId', isAuthenticated, addMemberToWorkspaceController);
router.post('/:workspaceId', isAuthenticated, addChannelToWorkspaceController);
router.put(
  '/:workspaceId',
  isAuthenticated,
  validate(updateWorkspaceSchema),
  updateWorkspaceController
);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default router;
