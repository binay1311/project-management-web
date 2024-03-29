import React from "react";
import {Link} from "react-router-dom";

const CreateProjectButton = () =>{
    return(
        <div>
            <Link to="/addProject" className="btn btn-lg btn-primary opacity-75">
                Create a Project
            </Link>
        </div>
    )
}

export default CreateProjectButton;