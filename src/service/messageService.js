import messageRepository from '../repository/messageRepository';

export const getMessageServide = async (messageParams, page, limit) => {
  const message = await messageRepository.getPaginatedMessaged(
    messageParams,
    page,
    limit
  );
  return message;
};
