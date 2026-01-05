import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspaceWhereUserIsMemberService,
  getWorkspaceDetailsByIdService,
  updateWorkspaceService} from '../service/workspaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const createWorkspace = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.id
    });

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace successfully created'));
  } catch (error) {
    console.log('Workspace controller error: ', error);
    if (error.StatusCodes) {
      return res.status(error.StatusCodes).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspacesUserIsMemberController = async (req, res) => {
  try {
    const response = await getAllWorkspaceWhereUserIsMemberService(req.id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log(
      'Workspace controller error while fetching all workspace: ',
      error
    );
    if (error.StatusCodes) {
      return res.status(error.StatusCodes).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getWorkspaceDetailsByIdController = async (req, res) => {
  try {
    const response = await getWorkspaceDetailsByIdService(
      req.params.workspaceId,
      req.id
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Workspace Details fetched successfully')
      );
  } catch (error) {
    console.log('Get workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.id
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const updateWorkspaceController = async (req, res) => {
  try {
    const data = req.body;
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      data,
      req.id
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace Updated successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    const { memberId, role } = req.body;
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.id,
      memberId,
      role || 'Member'
    );
    res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Channel addd to workspace successfully')
      );
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const addChannelToWorkspaceController = async (req, res) => {
  try {
    const { channelName } = req.body;
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.id,
      channelName
    );
    res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Channel addd to workspace successfully')
      );
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
