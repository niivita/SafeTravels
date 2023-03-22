import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import React, { useState } from "react";

function Profile () {
    const { user, isAuthenticated } = useAuth0();
    let [listOfItems, setListOfItems] = useState([]);

    const createAccount = async (e) => {
        try {
            const response = await axios.post('http://localhost:4001/login/create', {
            // Data to be sent to the server
                email: user.email,
                name: user.name
            });
            } catch (error) {
            console.error(error);
        }
    }

    // sending email of currently logged in user to backend
    const sendEmail = async (e) => {
        try {
            const response = await axios.post('http://localhost:4001/flights/sendEmail', {
            // Data to be sent to the server
                email: user.email
            });
            } catch (error) {
            console.error(error);
        }
    }

    // retrieves all fligts from the database that this user has entered
    const getUsersFlights = async () => {
        sendEmail();
        axios
            .get("http://localhost:4001/flights/personal", {
                responseType: "json",
            })
            .then(function (response) {
                // formatting all flight information
                let allFlights = [];
                for (let i = 0; i < response.data.length; i++){
                    let flighti = [];
                    flighti.push(response.data[i].trip_id);
                    flighti.push(response.data[i].flighttime);
                    flighti.push(response.data[i].direction);
                    flighti.push(response.data[i].international);
                    flighti.push(response.data[i].comments)
                    allFlights.push(flighti);
                }
                setListOfItems(allFlights);
                return response.data;
            });
    }

    if (isAuthenticated){
        window.localStorage.setItem("currUser", user.email);
        window.localStorage.setItem("currFlights", getUsersFlights());
    }

    window.onload = createAccount();

    return (
        isAuthenticated && (
            <article className="column">
                <h2>User: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <script type="text/javascript">
                    createAccount();
                    getUsersFlights();
                </script>
                <h2>
                    Flights: {listOfItems}
                </h2>
                <img src={user.picture}/>
            </article>
        )
    )
}

export default Profile