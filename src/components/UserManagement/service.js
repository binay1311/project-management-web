import axios from "axios";
import base_url from "../../constants/bootapi";

export function createNewUser(newUser){
    console.log("inside createNewUser");
    return axios.post(`${base_url}/api/users/register`, newUser);
}

export function loginUser(loginCredentials){
    console.log("inside loginuser");
    return axios.post(`${base_url}/api/users/login`, loginCredentials);
}
