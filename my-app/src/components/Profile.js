import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

function Profile () {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated){
        window.localStorage.setItem("currUser", user.email);
    }

    const createAccount = async (e) => {
        if (user.email && user.name){
            console.log(user.email)
            console.log(user.name)
          }
        try {
            const response = await axios.post('http://localhost:4001/login/create', {
            // Data to be sent to the server
                email: user.email,
                name: user.name
            });
            console.log(response.data);
            } catch (error) {
            console.error(error);
        }
    }

    window.onload = createAccount();

    return (
        isAuthenticated && (
            <article className="column">
                <h2>User: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <img src={user.picture}/>
            </article>
        )
    )
}

export default Profile