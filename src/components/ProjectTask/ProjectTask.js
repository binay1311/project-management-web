import React from "react";
import {useNavigate} from "react-router-dom";
import {deleteProjectTask, getProjectTask} from "./service";
import {SUCCESS} from "../../constants/responseCode";

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
                    console.log("deleted ProjectTask");
                    navigate(`/projectBoard/${projectIdentifier}`, {
                        state: {projectIdentifier, projectTaskSequence},
                    });
                } else {
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                console.log(err);
            })

    }

    const editProjectTask = (projectIdentifier, projectSequence) => {
        getProjectTask(projectIdentifier, projectSequence)
            .then((response) => {
                if (response.data.responseCode === SUCCESS) {
                    // toast.success("updating course");
                    console.log("updating project task");
                    let projectTask = response.data.response;
                    navigate(`/addProjectTask/${projectIdentifier}`, {
                        state: {projectTask, projectIdentifier},
                    });
                } else {
                    // toast.error("Could not update course");
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
            // toast.error("Something went wrong ! Please reload the page and try again");
            console.log(err);
        });
    }

    return(
        <div className="card mb-1 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {projectTask.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{projectTask.summary}</h5>
                <p className="card-text text-truncate ">
                    {projectTask.acceptanceCriteria}
                </p>
                <i
                    className="btn btn-primary"
                    onClick={() => {
                        editProjectTask(projectTask.projectIdentifier, projectTask.projectSequence)
                    }}
                > Edit</i>
                <button
                    className="btn btn-danger ml-4"
                    onClick={() => {
                        removeProjectTask(projectTask.projectIdentifier, projectTask.projectSequence)
                    }}
                > Delete</button>
            </div>
        </div>

    )
}

export default ProjectTask;