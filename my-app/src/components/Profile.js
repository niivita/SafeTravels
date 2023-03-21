import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    //var currUser = user.email;
    //sessionStorage.setItem("currUser", currUser);
    if (isAuthenticated){
        window.localStorage.setItem("currUser", user.email);
    }

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