import React from "react";
import './Home.css';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import FillFormButton from '../components/FillFormButton';
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";



function Home() {
    const { isLoading, error } = useAuth0();
  return (
    <main className="column">
      <h1><center>SafeTravels</center></h1>
      <center><LoginButton /></center>

      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}

      <Profile />
      <center><LogoutButton /></center>

      <center><FillFormButton /></center>



      
    </main>
  )
}

export default Home