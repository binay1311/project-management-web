import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Backlog from "./Backlog";
import {getBacklog} from "./service";
import {SUCCESS} from "../../constants/responseCode";
import {Card, CardBody, CardTitle} from "reactstrap";

function ProjectBoard(){
    const [projectTasks, setProjectTasks] =useState([]);
    const [isExists, setIsExists] = useState(true);
    let reload = "";

    const params = useParams();
    let navigate = useNavigate();
    const location = useLocation();
    const projectIdentifier = location.state != null ? location.state.projectIdentifier : null;
    let projectKey = projectIdentifier !== null ? projectIdentifier : params.id;
    reload = location.state != null ? location.state.projectTaskSequence : reload;

    const projectTaskDoesNotExist = (
        <Card className="alert alert-info text-center">
            <CardBody>
                <CardTitle>
                    <h3>No projectTasks on this Board</h3>
                </CardTitle>
            </CardBody>
        </Card>
    );

    const projectDoesNotExist = (
        <Card className="alert alert-danger text-center">
            <CardBody>
                <CardTitle>
                    <h3 className="text-danger">Project with Id : {params.id} does not exists</h3>
                </CardTitle>
            </CardBody>
        </Card>
    );

    const getBacklogUsingProjectIdentifier = (projectKey) => {
        getBacklog(projectKey).then(
            (response) => {
                if (response.data.responseCode === SUCCESS) {
                    setProjectTasks(response.data.response);
                } else {
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                setIsExists(false);
                console.log(err);
            })
    }

    useEffect(() => {
        getBacklogUsingProjectIdentifier(projectKey);
        console.log("inside useeffect ProjectBoard reload");
    },[reload])

    const createProjectTask = (projectIdentifier) => {
        navigate(`/addProjectTask/${projectIdentifier}`, {
            state: {projectIdentifier},
        });
    }

    return(
        <div className="container">
            <i
                className="btn btn-primary mb-3 fas fa-plus-circle"
                onClick={() => {
                    createProjectTask(projectKey)
                }}
            > Create Project Task</i>
            <br />
            <hr />
            {
                isExists ?
                    (
                        projectTasks.length > 0
                            ? <Backlog key={projectTasks.id} projectTasks={projectTasks}/>
                            : projectTaskDoesNotExist
                    )
                    : projectDoesNotExist
            }
        </div>
    )
}

export default ProjectBoard;