import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from '../repository/workspaceRepository.js';
import ValidationError from '../utils/errors/validationError.js';

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

export const getAllWorkspaceWhereUserIsMemberOfService = async(userId) => {
    try {
        const response = await workspaceRepository.fetchAllWorkspaceByUserId(userId)
        return response
    } catch (error) {
        console.log("Get workspaces user is member of service error: ", error)
        throw error;
    }
}

export const deleteWorkspaceServicee = async(workspaceId, userId) => {
  try {
    
  } catch (error) {
    console.log("Error while deleting the workspace: ",error)
  }
}
