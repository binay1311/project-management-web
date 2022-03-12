import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setJwtToken from "../../securityUtils/setJwtToken";
import {logout} from "../../actions/securityActions";

function Header() {
    let state = useSelector(state => state.security);
    const dispatch = useDispatch();

    const logoutUser = () => {
        localStorage.removeItem("jwtToken");
        setJwtToken(false);
        dispatch(logout);
        window.location.href = "/";
    }

    const userIsAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        {state.user.fullname}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/logout"
                        onClick={logoutUser}
                    >
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );

    const userIsNotAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    );

    const titleWhenNotAuthenticated = (
        <Link className="navbar-brand" to="/">
            Personal Project Management Tool
        </Link>
    );

    const tileWhenAuthenticated = (
        <Link className="navbar-brand" to="/dashboard">
            Personal Project Management Tool
        </Link>
    )
    let headerBody;
    let headerTitle;

    if(state.user && state.validToken){
        headerBody = userIsAuthenticated;
        headerTitle = tileWhenAuthenticated;

    } else {
        headerBody = userIsNotAuthenticated;
        headerTitle = titleWhenNotAuthenticated;
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
            <div className="container">
                {headerTitle}
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">*/}
                {/*    <span className="navbar-toggler-icon"/>*/}
                {/*</button>*/}

                {headerBody}


            </div>
        </nav>

    );
}

export default Header;


// <div className="collapse navbar-collapse" id="mobile-nav">
//     <ul className="navbar-nav mr-auto">
//         <li className="nav-item">
//             <Link className="nav-link" to="/dashboard">
//                 Dashboard
//             </Link>
//         </li>
//     </ul>
//     <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//             <Link className="nav-link" to="/register">
//                 Sign Up
//             </Link>
//         </li>
//         <li className="nav-item">
//             <Link className="nav-link" to="/login">
//                 Login
//             </Link>
//         </li>
//     </ul>
// </div>