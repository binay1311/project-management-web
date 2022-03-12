import React, {useEffect, useState} from "react";
import {createProject, updateProject} from "./service";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function AddProject(){
    const[project, setProject] =useState({});
    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false);
    const[isDisabled, setIsDisabled] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const getProject = location.state != null ? location.state.project : null;

    useEffect(async () => {
        if (getProject) {
            setProject({
                projectName: getProject.projectName,
                projectIdentifier: getProject.projectIdentifier,
                description: getProject.description,
                start_date: getProject.start_date,
                end_date: getProject.end_date
            });
            setIsDisabled(true);
        }
    }, []);


    useEffect(() => {
        console.log("formErrors value chnaged");
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log("conditions passed");
            if(getProject){
                console.log({project});
                updateProject(project)
                    .then((res) => {
                        if(res.data.responseCode === 200){
                            console.log("project updated");
                            navigate('/dashboard')
                        } else {
                            console.log("project updation failed");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                createProject(project)
                    .then((res) => {
                        if(res.data.responseCode === 200){
                            console.log("project created");
                            navigate('/dashboard')
                        } else {
                            console.log("project creation failed");
                        }
                    })
                    .catch((err) => {
                        toast.error("Project Creation failed! Try again with different Project Id")
                        console.log(err);
                    })
            }
        }
    }, [formErrors]);

    const handleForm = (e) => {
        setFormErrors(validate(project));
        setIsSubmit(true);
        e.preventDefault();
    }

    const validate =(values) => {
        const errors = {};
        if(!values.projectName){
            errors.projectName = "Project Name is required!";
        }
        if(!values.projectIdentifier){
            errors.projectIdentifier = "Project Id is required!";
        } else if (values.projectIdentifier.length !== 5){
            errors.projectIdentifier = "Project Id should have 5 letters!"
        }
        if(!values.description){
            errors.description = "Project Description is required!";
        }
        return errors;
    }

    return(
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        {getProject ?
                            <h5 className="display-4 text-center">Update Project form</h5>
                            : <h5 className="display-4 text-center">Create Project form</h5>
                        }
                        <hr/>
                        <Form onSubmit={handleForm}>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="text"
                                    name="projectName"
                                    className="form-control form-control-lg "
                                    placeholder="Project Name"
                                    value={project.projectName}
                                    onChange={(e) => {
                                        setProject({...project, projectName: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.projectName}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="text"
                                    name="projectIdentifier"
                                    className="form-control form-control-lg"
                                    placeholder="Unique Project ID"
                                    value={project.projectIdentifier}
                                    onChange={(e) => {
                                        setProject({...project, projectIdentifier: e.target.value})
                                    }}
                                    disabled={isDisabled}
                                />
                                <p style={{color: 'red'}}>{formErrors.projectIdentifier}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="textarea"
                                    name="description"
                                    className="form-control form-control-lg"
                                    placeholder="Project Description"
                                    value={project.description}
                                    onChange={(e) => {
                                        setProject({...project, description: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.description}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <h6>Start Date</h6>
                                <Input
                                    type="date"
                                    name="start_date"
                                    className="form-control form-control-lg"
                                    value={project.start_date}
                                    onChange={(e) => {
                                        setProject({...project, start_date: e.target.value})
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <h6>Estimated End Date</h6>
                                <Input
                                    name="end_date"
                                    type="date"
                                    className="form-control form-control-lg"
                                    value={project.end_date}
                                    onChange={(e) => {
                                        setProject({...project, end_date: e.target.value})
                                    }}
                                />
                            </FormGroup>
                            <Button type="submit" color="primary" >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject;