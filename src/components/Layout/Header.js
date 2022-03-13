import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setJwtToken from "../../securityUtils/setJwtToken";
import {logout} from "../../actions/securityActions";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

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
        <div>
            <Link className="navbar-brand text-light" to="/dashboard">
                Dashboard
            </Link>
            <Link className="navbar-brand text-light" to="/dashboard">
                {state.user.fullname}
            </Link>
            <Link className="navbar-brand text-light" to="/logout" onClick={logoutUser}>
                Logout
            </Link>
        </div>
    );

    const userIsNotAuthenticated = (
        <div>
            <Link className="navbar-brand text-light" to="/register">
                Sign Up
            </Link>
            <Link className="navbar-brand text-light" to="/login">
                Login
            </Link>
        </div>
    );

    const titleWhenNotAuthenticated = (
        <Link className="navbar-brand text-light" to="/">
            Personal Project Management Tool
        </Link>
    );

    const tileWhenAuthenticated = (
        <Link className="navbar-brand text-light" to="/dashboard">
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
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className="landing-page">
                <Typography component="div" sx={{ flexGrow: 1 }} color="inherit">
                {headerTitle}
                </Typography>
                    {headerBody}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;