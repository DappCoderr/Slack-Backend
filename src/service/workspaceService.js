import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repository/channelRepository.js';
import userRepository from '../repository/userRepository.js';
import workspaceRepository from '../repository/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
  return workspace.members.find(
    (member) =>
      member.userId?.toString() === userId?.toString() &&
      member.role === 'Admin'
  );
};

export const isUserMemberOfWorkspace = (workspace, userId) => {
  return workspace.members.find(
    (member) => member.userId?.toString() === userId?.toString()
  );
};

const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
  return workspace.channels.find((channel) => channel.name === channelName);
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
    console.log('Service error: Get workspaces where user is member: ', error);
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
    console.log('Service error: Delete workspace: ', error);
    throw error;
  }
};

export const getWorkspaceByJoinCodeService = async (joinCode, userId) => {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceByJoinCode(joinCode);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMember = isUserMemberOfWorkspace(workspace, userId);

    if (!isMember) {
      throw new ClientError({
        explanation: 'User is not the member of the workspace',
        message: 'User is not the membe of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    return workspace;
  } catch (error) {
    console.log('Service error: Get workspace by joinCode: ', error);
    throw error;
  }
};

export const updateWorkspaceService = async (
  workspaceId,
  workspaceData,
  userId
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const updatedWorkspace = await workspaceRepository.update(
      workspaceId,
      workspaceData
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Service error: Update workspace: ', error);
    throw error;
  }
};

export const addMemberToWorkspaceService = async (
  workspaceId,
  userId,
  memberId,
  role
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const isMember = isUserMemberOfWorkspace(workspace, memberId);
    if (isMember) {
      throw new ClientError({
        explanation: 'User is already part of workspace',
        message: 'User is already part of workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const isValidUser = await userRepository.getById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'User is not a valid user',
        message: 'User is not a valid user',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(
      workspaceId,
      memberId,
      role
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Service error: Update workspace: ', error);
    throw error;
  }
};

export const addChannelToWorkspaceService = async (
  workspaceId,
  userId,
  channelName
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(workspace, userId);
    if (!isAdmin) {
      throw new ClientError({
        explanation: 'User is not an admin of the workspace',
        message: 'User is not an admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(
      workspace,
      channelName
    );

    if (isChannelPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    );
    return response;
  } catch (error) {
    console.log('Service error: Update workspace: ', error);
    throw error;
  }
};
