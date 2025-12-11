import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from '../repository/workspaceRepository.js';
import ValidationError from '../utils/errors/validationError.js';
import ClientError from '../utils/errors/clientError.js';
import { StatusCodes } from 'http-status-codes';
import channelRepository from '../repository/channelRepository.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
  const response = workspace.members.find(
    (member) =>
      member.userId.toString() === userId ||
      member.role === 'Admin'
  );
  return response;
};

export const createWorkspaceService = async (workspaceObj) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const response = await workspaceRepository.create({
      name: workspaceObj.name,
      description: workspaceObj.description,
      joinCode
    });

    await workspaceRepository.addMemberToWorkspace(
      response._id,
      workspaceObj.owner,
      'Admin'
    );

    const updatedResponse = await workspaceRepository.addChannelToWorkspace(
      response._id,
      'general'
    );

    return updatedResponse;
  } catch (error) {
    console.log('Workspace service layer error: ', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A workspace with same the details already exists']
        },
        'A workspace with same the details already exists'
      );
    }
  }
};

export const getAllWorkspaceWhereUserIsMemberOfService = async (userId) => {
  try {
    const response =
      await workspaceRepository.fetchAllWorkspaceByUserId(userId);
    return response;
  } catch (error) {
    console.log('Get workspaces user is member of service error: ', error);
    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isAllowed = isUserAdminOfWorkspace(workspace, userId);

    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels);

      const response = await workspaceRepository.delete(workspaceId);
      return response;
    }
    throw new ClientError({
      explanation: 'User is either not a memeber or an admin of the workspace',
      message: 'User is not allowed to delete the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
