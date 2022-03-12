import React, {useEffect, useState} from "react";
import ProjectTask from "../ProjectTask/ProjectTask";

function Backlog({projectTasks}){
    const [projectTasksBacklog, setProjectTasksBacklog] = useState([projectTasks]);

    useEffect(() => {
        setProjectTasksBacklog(projectTasks);
    },[projectTasks, projectTasksBacklog]);

    const tasks = projectTasksBacklog.map(
        (item) => <ProjectTask key={item.id} projectTask={item} />
    );

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for(let i=0; i<tasks.length; i++){
        if(tasks[i].props.projectTask.status === "TO_DO"){
            todoItems.push(tasks[i]);
        } else if(tasks[i].props.projectTask.status === "IN_PROGRESS"){
            inProgressItems.push(tasks[i]);
        } else if(tasks[i].props.projectTask.status === "DONE"){
            doneItems.push(tasks[i]);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {/*{*/}
                    {/*    projectTasksBacklog.map((item) =>*/}
                    {/*        <ProjectTask key={item.id} projectTask={item}/>*/}
                    {/*    )*/}
                    {
                        todoItems
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {
                        inProgressItems
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {
                        doneItems
                    }
                </div>
            </div>
        </div>
    )
}

export default Backlog;
