import axios from "axios";
import base_url from "../../constants/bootapi";

export function getBacklog(projectIdentifier){
    return axios.get(`${base_url}/api/backlog/${projectIdentifier}`);
}