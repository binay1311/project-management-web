import './App.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectTask/AddProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import store from "./store";
import setJwtToken from "./securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "./actions/types";

const jwtToken = localStorage.getItem("jwtToken");

if(jwtToken){
    setJwtToken(jwtToken);
    const decoded_token = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token
    });

    const currentTime = Date.now() / 1000;

    if(decoded_token.exp < currentTime){
        localStorage.removeItem("jwtToken");
        setJwtToken(false);
        store.dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        })
        window.location.href = "/";
    }
}

function App() {
  return (
      <Provider store={store}>
          <Router>
              <div className="App">
                  <Header />
                  <ToastContainer />
                  <Routes>
                      {
                          //public Routes below
                      }
                      <Route path="/" element={<Landing />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      {
                          //private Routes below
                      }
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/addProject" element={<AddProject />} />
                      <Route path="/projectBoard/:id" element={<ProjectBoard />} />
                      <Route path="/addProjectTask/:id" element={<AddProjectTask />} />
                  </Routes>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
