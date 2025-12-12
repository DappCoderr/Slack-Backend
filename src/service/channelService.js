import channelRepository from '../repository/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';
import { StatusCodes } from 'http-status-codes';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
    if (!channel || !channel.workspaceId) {
      throw ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserMember = isUserMemberOfWorkspace(channel.workspaceId ,userId)

    if(!isUserMember){
      throw new ClientError({
        explanation: 'User is either not a memeber or an admin of the workspace',
        message: 'User is not allowed to access the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    return channel;
  } catch (error) {
    console.log('Service error: on fetching the channel');
    throw error;
  }
};
