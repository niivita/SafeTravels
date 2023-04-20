import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Button.css";
import logo from "./images/SafeTravelsLogo.webp";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (

            <div name='column'> 
            <img src={logo} width="100" height="100"></img>
            <h1 style={{fontFamily: "Copperplate"}}><center>SafeTravels</center></h1>

            <button className="btn" onClick={() => loginWithRedirect()}>
                Sign In
            </button>
            </div>
        )
    )
}

export default LoginButton