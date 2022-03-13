import React from 'react';
import CreateProjectButton from "./Project/CreateProjectButton";
import AllProjects from "./Project/AllProjects";

function Dashboard(){
    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <CreateProjectButton/>
                        <br/>
                        <hr/>
                        <AllProjects/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;