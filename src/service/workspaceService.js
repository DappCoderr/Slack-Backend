import workspaceRepository from "../repository/workspaceRepository"
import {v4 as uuidv4} from "uuid"

export const createWorkspaceService = async(workspaceObj) => {

    const joinCode = uuidv4().substring(0.6)

    const workspace = await workspaceRepository.create({
        name: workspaceObj.name,
        description: workspaceObj.description,
        joinCode
    })

    workspaceRepository.addMemberToWorkspace(workspace._id, workspace.owner, "admin")

    workspaceRepository.addChannelToWorkspace(workspace._id, 'general')

    return workspace
}
