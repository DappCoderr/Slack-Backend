import channelRepository from '../repository/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';

export const getChannelByIdService = async (channelId) => {
  try {
    const channel = await channelRepository.getById(channelId);
    if (!channel) {
      throw ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Channel not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return channel;
  } catch (error) {
    console.log('Service error: on fetching the channel');
    throw error;
  }
};
