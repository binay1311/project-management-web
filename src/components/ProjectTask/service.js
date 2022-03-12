import axios from "axios";
import base_url from "../../constants/bootapi";

export function createProjectTask(projectTask, projectIdentifier){
    console.log("inside createProjectTask");
    return axios.post(`${base_url}/api/backlog/${projectIdentifier}`, projectTask);
}

export function getProjectTask(projectIdentifier, projectTaskId){
    return axios.get(`${base_url}/api/backlog/${projectIdentifier}/${projectTaskId}`);
}

export function updateProjectTask(projectTask, projectIdentifier, projectTaskId){
    return axios.patch(`${base_url}/api/backlog/${projectIdentifier}/${projectTaskId}`, projectTask);
}

export function deleteProjectTask(projectIdentifier, projectTaskId){
    return axios.delete(`${base_url}/api/backlog/${projectIdentifier}/${projectTaskId}`);
}
