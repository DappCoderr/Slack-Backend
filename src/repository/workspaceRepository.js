import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import { crudRepository } from './crudRepository.js';
import channelRepository from './channelRepository.js';

const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceByName: async function (name) {
    const workspace = await Workspace.findOne({ name: name });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  getWorkspaceByJoinCode: async function (data) {
    const workspace = await Workspace.findOne({ joinCode: data });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },

  addMemberToWorkspace: async function (workspaceId, userId, role) {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      throw new ClientError({
        message: 'Invalid workspace ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ClientError({
        message: 'Invalid user ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    const workspaceExists = await Workspace.exists({ _id: workspaceId });
    if (!workspaceExists) {
      throw new ClientError({
        message: 'Workspace not found',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new ClientError({
        message: 'User not found',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserAlreadyExistInWorkspace = await Workspace.members.find(
      (members) => {
        members.userId === userId;
      }
    );
    if (isUserAlreadyExistInWorkspace) {
      throw new ClientError({
        message: 'User already exist in workspace',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const updatedWorkspace = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      { $push: { members: { userId, role } } },
      { new: true, runValidators: true }
    );

    return updatedWorkspace;
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      throw new ClientError({
        message: 'Invalid workspace ID',
        explanation: 'workspaceId is not a valid ObjectId',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    const workspaceExists = await Workspace.exists({ _id: workspaceId });
    if (!workspaceExists) {
      throw new ClientError({
        message: 'Workspace not found',
        explanation: 'Provided workspaceId does not exist',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelNameExist = await Workspace.channels.find((channels) => {
      channels.name === channelName;
    });

    if (isChannelNameExist) {
      throw new ClientError({
        message: 'Channel already exist in workspace',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const newChannel = await channelRepository.create(channelName);

    const updatedWorkspace = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      { $push: { channels: newChannel._id } },
      { new: true, runValidators: true }
    );

    return updatedWorkspace;
  },

  fetchAllWorkspaceByUserId: async function (userId) {
    const workspaces = await Workspace.find({
      'members.userId': userId
    }).populate('members.userId', 'email username avatar');
    return workspaces;
  }
};

export default workspaceRepository;
