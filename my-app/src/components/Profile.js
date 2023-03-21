import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import React, { useState } from "react";

function Profile () {
    const { user, isAuthenticated } = useAuth0();
    let [listOfItems, setListOfItems] = useState([]);

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

    const axiosTest = async () => {
        axios
            .get("http://localhost:4001/flights/personal", {
                responseType: "json",
            })
            .then(function (response) {
                //console.log(response.data.length);
                for (let i = 0; i < response.data.length; i++){
                    let flighti = [];
                    flighti.push(response.data[i].trip_id);
                    flighti.push(response.data[i].flighttime);
                    flighti.push(response.data[i].direction);
                    flighti.push(response.data[i].international);
                    flighti.push(response.data[i].comments)
                    //console.log(flighti);
                    listOfItems.push(flighti);
                    setListOfItems(listOfItems);
                }
                return response.data;
            });
    }

    if (isAuthenticated){
        window.localStorage.setItem("currUser", user.email);
    }

    //window.onload = createAccount();

    return (
        isAuthenticated && (
            <article className="column">
                <h2>User: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <script type="text/javascript">
                    createAccount();
                    axiosTest();
                </script>
                <div>
                    Flights: {listOfItems}
                </div>
                <img src={user.picture}/>
            </article>
        )
    )
}

export default Profile