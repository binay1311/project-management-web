import React, {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {createNewUser} from "./service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Register(){
    const[user, setUser] = useState({});
    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(user);
            createNewUser(user)
                .then((res) => {
                    console.log("user registered");
                    navigate('/login');
                })
                .catch((err) => {
                    toast.error("Failed to register user!");
                    console.log(err);
                })
        }
    }, [formErrors])

    const handleForm = (e) => {
        console.log("handle form");
        setFormErrors(validate(user));
        setIsSubmit(true);
        e.preventDefault();
    }

    const validate = (values) => {
        const errors = {};
        if(!values.fullname){
            errors.fullname = "Name is required!";
        }
        if(!values.username){
            errors.username = "Email is required!";
        }
        if(!values.password || values.password.length < 6){
            errors.password = "Password must be of atleast 6 characters";
        } else if(!values.confirmPassword || values.password !== values.confirmPassword){
            errors.confirmPassword = "Passwords must match !";
        }
        return errors;
    }

    return(
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <Form onSubmit={handleForm}>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Name"
                                    name="fullname"
                                    value={user.fullname}
                                    onChange={(e) => {
                                            setUser({...user, fullname: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.fullname}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="username"
                                    value={user.username}
                                    onChange={(e) => {
                                        setUser({...user, username: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.username}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={(e) => {
                                        setUser({...user, password: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.password}</p>
                            </FormGroup>
                            <FormGroup className="text-lg-start">
                                <Input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={(e) => {
                                        setUser({...user, confirmPassword: e.target.value})
                                    }}
                                />
                                <p style={{color: 'red'}}>{formErrors.confirmPassword}</p>
                            </FormGroup>
                            <Button
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                            >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;