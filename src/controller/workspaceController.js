import { StatusCodes } from 'http-status-codes';

import {
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspaceWhereUserIsMemberOfService,
  updateWorkspaceService
} from '../service/workspaceService.js';
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

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getAllWorkspaceWhereUserIsMemberOfService(req.id);
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

export const updateWorkspaceController = async(req, res) => {
  try {
    const data = req.body
    const response = await updateWorkspaceService(req.params.workspaceId, data, req.id)
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
}
