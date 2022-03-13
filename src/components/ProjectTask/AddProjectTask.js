import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input} from "reactstrap";
import {createProjectTask, updateProjectTask} from "./service";
import {getProjectByIdentifier} from "../Project/service";
import {SUCCESS} from "../../constants/responseCode";
import moment from "moment";
import {toast} from "react-toastify";

function AddProjectTask(){
    const[projectTask, setProjectTask] = useState({});
    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false);
    const[isProjectExists, setIsProjectExists] = useState(false);

    let navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    let projectIdentifier = location.state != null ? location.state.projectIdentifier : params.id;
    const getProjectTask = location.state != null ? location.state.projectTask : null;

    const backToProjectBoard = (projectIdentifier) => {
        navigate(`/projectBoard/${projectIdentifier}`, {
            state: {projectIdentifier},
        });
    }

    useEffect(() => {
        getProjectByIdentifier(projectIdentifier)
            .then((response) => {
                if (response.data.responseCode === SUCCESS) {
                    setIsProjectExists(true);
                } else {
                    console.log(response.data.responseMessage);
                }
            }).catch((err) => {
                console.log(err);
            });
    },[])

    useEffect(async () => {
        if (getProjectTask) {
            setProjectTask({
                summary: getProjectTask.summary,
                acceptanceCriteria: getProjectTask.acceptanceCriteria,
                dueDate: getProjectTask.dueDate !== null
                    ? moment(getProjectTask.dueDate).format('yyyy-MM-DD')
                    : null,
                priority: getProjectTask.priority,
                status: getProjectTask.status,
                projectIdentifier: getProjectTask.projectIdentifier,
                projectSequence: getProjectTask.projectSequence,
            });
        }
    }, []);

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            if(getProjectTask){
                updateProjectTask(projectTask, projectTask.projectIdentifier, projectTask.projectSequence)
                    .then((res) => {
                        if(res.data.responseCode === 200){
                            console.log("projectTask updated");
                            console.log(res);
                            navigate(`/projectBoard/${projectIdentifier}`, {
                                state: {projectIdentifier},
                            });
                            toast.info("Task updated Successfully !");
                        } else {
                            console.log("projectTask creation failed");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                createProjectTask(projectTask, projectIdentifier)
                    .then((res) => {
                        if(res.data.responseCode === 200){
                            console.log("projectTask created");
                            navigate(`/projectBoard/${projectIdentifier}`, {
                                state: {projectIdentifier},
                            });
                            toast.success("Task created Successfully !")
                        } else {
                            console.log("projectTask creation failed");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }, [formErrors]);

    const handleForm = (e) => {
       setFormErrors(validate(projectTask));
       setIsSubmit(true);
       e.preventDefault();
    }

    const validate = (values) => {
        const errors = {};
        if(!values.summary){
            errors.summary = "ProjectTask summary is required!";
        }
        return errors;
    }

    const addProjectTaskBody = (
        <div className="add-PBI">
            <br/>
            <i
                className="btn btn-primary opacity-75"
                style={{marginLeft: "30px"}}
                onClick={() => {
                    backToProjectBoard(projectIdentifier)
                }}
            > Back to Project Board</i>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        {
                            getProjectTask ? (
                                    <h4 className="display-4 text-center">Edit Project Task</h4>
                                ) :
                                (
                                    <h4 className="display-4 text-center">Add Project Task</h4>
                                )
                        }
                        <h4 className="text-center text-primary">Project Code : {projectIdentifier}</h4>
                        <Form onSubmit={handleForm}>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="text"
                                    name="summary"
                                    className="form-control form-control-lg"
                                    placeholder="Project Task summary"
                                    value={projectTask.summary}
                                    onChange={(e) => {
                                        setProjectTask({...projectTask, summary: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.summary}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="textarea"
                                    name="acceptanceCriteria"
                                    className="form-control form-control-lg"
                                    placeholder="Acceptance Criteria"
                                    value={projectTask.acceptanceCriteria}
                                    onChange={(e) => {
                                        setProjectTask({...projectTask, acceptanceCriteria: e.target.value})
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <h6>Due Date</h6>
                                <Input
                                    type="date"
                                    name="dueDate"
                                    className="form-control form-control-lg"
                                    value={projectTask.dueDate}
                                    onChange={(e) => {
                                        setProjectTask({...projectTask, dueDate: e.target.value})
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="select"
                                    name="priority"
                                    className="form-control form-control-lg"
                                    value={projectTask.priority}
                                    onChange={(e) => {
                                        setProjectTask({...projectTask, priority: e.target.value})
                                    }}
                                >
                                    <option value={0}>Select Priority</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="select"
                                    name="status"
                                    className="form-control form-control-lg"
                                    value={projectTask.status}
                                    onChange={(e) => {
                                        setProjectTask({...projectTask, status: e.target.value})
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </Input>
                            </FormGroup>
                            <Button
                                type="submit"
                                className="btn btn-primary opacity-75"
                                color="primary"
                            >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );

    return(
        isProjectExists ?
            (
                addProjectTaskBody
            ) :
            (
                <Card className="alert alert-danger text-center container">
                    <CardBody>
                        <CardTitle>
                            <h3 className="text-danger">
                                Project Task cant be created since Project with Id : {projectIdentifier} does not exists
                            </h3>
                        </CardTitle>
                    </CardBody>
                </Card>
            )

    )
}

export default AddProjectTask;