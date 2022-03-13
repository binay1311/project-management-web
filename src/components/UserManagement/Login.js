import React, {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {loginUser, LoginUser} from "./service";
import {useNavigate} from "react-router-dom";
import connect from "react-redux/lib/connect/connect";
import {login} from "../../actions/securityActions";
import {useDispatch, useSelector} from "react-redux";
import setJwtToken from "../../securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";

function Login(){
    const[user, setUser] = useState({});
    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            loginUser(user)
                .then((res) => {
                    //extract token from res.data
                    const { token } = res.data;

                    //store the token in local storage
                    localStorage.setItem("jwtToken", token);

                    //set our token in header ***
                    setJwtToken(token);

                    //decode token on React
                    const decoded = jwt_decode(token);

                    // dispatch to Reducer
                    dispatch(login(decoded));

                    navigate("/dashboard");
                    toast.success("Logged In !");
                })
                .catch((err) => {
                    toast.error("Invalid Credentials , Please try again!");
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
        if(!values.username){
            errors.username = "Email is required!";
        }
        if(!values.password){
            errors.password = "Password is required!";
        }
        return errors;
    }

    return(
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 m-auto">
                        <br/>
                        <h1 className="display-4 text-center mb-3">Log In</h1>
                        <Form onSubmit={handleForm} style={{textAlign: "center"}}>
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
                            <Button
                                type="submit"
                                className="btn bg-primary opacity-75 btn-block mt-4"
                            >Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
