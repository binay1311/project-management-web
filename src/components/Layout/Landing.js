import React from "react";
import {Link} from "react-router-dom";

function Landing(){
    return(
        <div className="landing">
            <div className="light-overlay landing-inner text-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-15 mb-0 text-break text-primary text-opacity-100">
                                Manage your Projects with one Tool
                            </h1>
                            <br/>
                            <img
                                src="https://johnlynchandassociates.com/wp-content/uploads/2020/10/project-management.jpg"
                            />
                            <br/>
                            <br/>
                             <h3 className=" text-primary text-opacity-100">
                                 Stay on track – even when the track changes
                            </h3>
                            <hr />
                            <Link className="btn btn-lg btn-primary opacity-75 mr-2" to="/register">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;