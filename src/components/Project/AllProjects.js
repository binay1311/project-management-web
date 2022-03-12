import React, {useEffect, useState} from "react";
import {getAllProjects} from "./service";
import {SUCCESS} from "../../constants/responseCode";
import Project from "./Project";
import {toast} from "react-toastify";

function AllProjects(){
    const [projects, setProjects] =useState([]);

    const getAllProjectsFromServer = () => {
        getAllProjects().then(
            (response) => {
                if (response.data.responseCode === SUCCESS) {
                    setProjects(response.data.response);
                    // toast.success("All courses has been loaded");
                    console.log("loading all projects");
                } else {
                    toast.error("Could not load projects, PLease refresh the page or login and try again!");
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                toast.error("Something went wrong, Please login and try again !");
                console.log(err);
            });

    }

    const updateProject = (projectIdentifier) => {
        setProjects(projects.filter((project) => project.projectIdentifier !== projectIdentifier));
    }

    useEffect(() => {
        getAllProjectsFromServer();
    }, [])

    return(
        <div>
            {
                projects.length > 0 ?
                    projects.map((item) => <Project key={item.id} project={item} update={updateProject}/> )
                    : "NO Projects"
            }
        </div>
    )
}

export default AllProjects;