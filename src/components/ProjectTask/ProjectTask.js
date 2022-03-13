import React from "react";
import {useNavigate} from "react-router-dom";
import {deleteProjectTask, getProjectTask} from "./service";
import {SUCCESS} from "../../constants/responseCode";
import {toast} from "react-toastify";

function ProjectTask({projectTask}){
    let navigate = useNavigate()

    let priorityString;
    let priorityClass;

    if(projectTask.priority === 1){
        priorityClass = "bg-danger text-light"
        priorityString = "HIGH"
    } else if(projectTask.priority === 2){
        priorityClass = "bg-warning text-light"
        priorityString = "MEDIUM"
    } else if(projectTask.priority === 3){
        priorityClass = "bg-info text-light"
        priorityString = "LOW"
    }

    const removeProjectTask = (projectIdentifier, projectTaskSequence) => {
        deleteProjectTask(projectIdentifier, projectTaskSequence)
            .then((response) => {
                if (response.data.responseCode === SUCCESS) {
                    toast.success("Task Deleted Successfully !");
                    console.log("deleted ProjectTask");
                    navigate(`/projectBoard/${projectIdentifier}`, {
                        state: {projectIdentifier, projectTaskSequence},
                    });
                } else {
                    toast.error("Failed to delete Task");
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                toast.error("Something went wrong ! Please login and try again");
                console.log(err);
            })

    }

    const editProjectTask = (projectIdentifier, projectSequence) => {
        getProjectTask(projectIdentifier, projectSequence)
            .then((response) => {
                if (response.data.responseCode === SUCCESS) {
                    console.log("updating project task");
                    let projectTask = response.data.response;
                    navigate(`/addProjectTask/${projectIdentifier}`, {
                        state: {projectTask, projectIdentifier},
                    });
                } else {
                    toast.error("Failed to fetch ProjectTask");
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                toast.error("Something went wrong ! Please login and try again");
                console.log(err);
            });
    }

    return(
        <div className="card mb-2 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {projectTask.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-white">
                <h5 className="card-title">{projectTask.summary}</h5>
                <p className="card-text text-truncate ">
                    {projectTask.acceptanceCriteria}
                </p>
                <div className="card-button">
                <i
                    className="btn btn-outline-primary opacity-75"
                    onClick={() => {
                        editProjectTask(projectTask.projectIdentifier, projectTask.projectSequence)
                    }}
                > Edit</i>
                {' '}
                <button
                    className="btn btn-outline-danger ml-4"
                    onClick={() => {
                        removeProjectTask(projectTask.projectIdentifier, projectTask.projectSequence)
                    }}
                > Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectTask;