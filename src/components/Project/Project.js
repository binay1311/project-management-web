import React from "react";
import {deleteProject, getProjectByIdentifier} from "./service";
import {SUCCESS} from "../../constants/responseCode";
import {useNavigate} from "react-router-dom";

function Project({project, update}){
    let navigate = useNavigate();

    const displayProjectBoard = (projectIdentifier) => {
        navigate(`/projectBoard/${projectIdentifier}`, {
            state: {projectIdentifier},
        });
    }

    const updateProjectByIdentifier = (projectIdentifier) => {
        getProjectByIdentifier(projectIdentifier)
            .then((response) => {
                if (response.data.responseCode === SUCCESS) {
                    // toast.success("updating course");
                    console.log("updated Project");
                    let project = response.data.response;
                    navigate("/addProject", {
                        state: {project},
                        disabled: true
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

    const deleteProjectByIdentifier = (projectIdentifier) => {
        if(window.confirm("Are you sure? This will delete the project and all the data related to it")){
            deleteProject(projectIdentifier)
                .then((response) => {
                    if (response.data.responseCode === SUCCESS) {
                        console.log("deleted Project");
                        update(projectIdentifier);
                    } else {
                        console.log(response.data.responseMessage);
                    }
                }).catch((err) => {
                console.log(err);
            });
        }
    }

    return(
        <div className="container">
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <span className="mx-auto">{project.projectIdentifier}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{project.projectName}</h3>
                        <p>{project.description}</p>
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                        <ul className="list-group">
                            <li className="list-group-item board"
                                onClick={() => {
                                    displayProjectBoard(project.projectIdentifier);
                                }}>
                                <i className="fa fa-flag-checkered pr-1">Project Board </i>
                            </li>
                            <li
                                className="list-group-item update"
                                onClick={() => {
                                    updateProjectByIdentifier(project.projectIdentifier);
                                }}>
                                <i className="fa fa-edit pr-1"> Update Project Info</i>
                            </li>
                            <li
                                className="list-group-item delete"
                                onClick={() => {
                                    deleteProjectByIdentifier(project.projectIdentifier);
                                }}>
                                <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;
