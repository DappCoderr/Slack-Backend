import Channel from '../schema/channel.js';
import { crudRepository } from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel),
  getChannelWithWorkspaceDetails: async function (channelId) {
    return await Channel.findById(channelId).populate('workspaceId');
  }
};

export default channelRepository;
