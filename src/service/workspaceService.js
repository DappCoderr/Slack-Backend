import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from '../repository/workspaceRepository.js';

export const createWorkspaceService = async (workspaceObj) => {
  const joinCode = uuidv4().substring(0, 6);

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
};
