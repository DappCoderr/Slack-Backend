import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceDetailsByIdController,
  getWorkspacesUserIsMemberController,
  updateWorkspaceController,
  joinWorkspaceController,
  resetJoinCodeController,
  getWorkspaceByJoinCodeController
} from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { createWorkspaceSchema} from '../../validation/workspaceSchema.js';
import { validate } from '../../validation/zodValidator.js';

const router = express.Router();

router.get('/', isAuthenticated, getWorkspacesUserIsMemberController);
router.get('/:workspaceId', isAuthenticated, getWorkspaceDetailsByIdController);
router.get('/join/:joinCode',isAuthenticated,getWorkspaceByJoinCodeController);

router.post('/', isAuthenticated, validate(createWorkspaceSchema), createWorkspaceController);
router.post('/:workspaceId/members', isAuthenticated, addMemberToWorkspaceController);
router.post('/:workspaceId/channels',isAuthenticated, addChannelToWorkspaceController);

router.put('/:workspaceId',isAuthenticated,updateWorkspaceController);
router.put('/:workspaceId/join', isAuthenticated, joinWorkspaceController);
router.put('/:workspaceId/joinCode/reset',isAuthenticated,resetJoinCodeController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default router;
