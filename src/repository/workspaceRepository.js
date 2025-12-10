import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import User from '../schema/user.js';
import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channelRepository.js';
import { crudRepository } from './crudRepository.js';

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

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
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

    const isUserAlreadyExistInWorkspace = workspace.members.some(
      (member) => member.userId.toString() === userId.toString()
    );

    if (isUserAlreadyExistInWorkspace) {
      throw new ClientError({
        message: 'User already exists in workspace',
        explanation: 'Duplicate member found',
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

    const workspace =
      await Workspace.findById(workspaceId).populate('channels');

    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        explanation: 'Provided workspaceId does not exist',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelNameExist = workspace.channels.some(
      (ch) => ch.name.toLowerCase() === channelName.toLowerCase()
    );

    if (isChannelNameExist) {
      throw new ClientError({
        message: 'Channel already exists in workspace',
        explanation: 'Duplicate channel name',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const newChannel = await channelRepository.create({ name: channelName });

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
