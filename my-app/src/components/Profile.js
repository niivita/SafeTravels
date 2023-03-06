import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <article className="column">
                <h2>User: {user.name}</h2>
                <img src={user.picture}/>
            </article>
        )
    )
}

export default Profile