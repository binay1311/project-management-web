import axios from "axios";
import base_url from "../../constants/bootapi";

export function createProject(project){
    return axios.post(`${base_url}/api/project/add`, project);
}

export function updateProject(project){
    return axios.put(`${base_url}/api/project/update`, project);
}

export function getAllProjects(){
    return axios.get(`${base_url}/api/project/all`);
}

export function deleteProject(projectIdentifier){
    return axios.delete(`${base_url}/api/project/${projectIdentifier}`);
}

export function getProjectByIdentifier(projectIdentifier){
    return axios.get(`${base_url}/api/project/${projectIdentifier}`);
}