import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByJoinCodeService,
  getAllWorkspaceWhereUserIsMemberService,
  getWorkspaceDetailsByIdService,
  updateWorkspaceService,
  joinWorkspaceService,
  resetWorkspaceJoinCodeService
} from '../service/workspaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

import { verifyTokenService } from '../service/userService.js';

export const createWorkspaceController = async (req, res) => {
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

export const getWorkspaceByJoinCodeController = async (req, res) => {
  try {
    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Get workspace by joincode controller error', error);
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

export const resetJoinCodeController = async (req, res) => {
  try {
    const response = await resetWorkspaceJoinCodeService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Join code reset successfully'));
  } catch (error) {
    console.log('reset join code controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const joinWorkspaceController = async (req, res) => {
  try {
    const response = await joinWorkspaceService(
      req.params.workspaceId,
      req.body.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Joined workspace successfully'));
  } catch (error) {
    console.log('join workspace controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const response = await verifyTokenService(req.params.token);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Email verified successfully'));
  } catch (error) {
    console.log('verify email controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
