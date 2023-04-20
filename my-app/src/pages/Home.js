import React, { useState } from "react";
import './Home.css';
import '../components/Button.css';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import FillFormButton from '../components/FillFormButton';
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import classNames from "classnames";

function Home() {
    const { isLoading, error } = useAuth0();
    let [background, setBackground] = useState(false);                  // holds value of background (light or dark)

  return (

      <div className="column"> 
          <center><LoginButton /></center>
          <Profile />
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          
      </div>
  )
}

export default Home