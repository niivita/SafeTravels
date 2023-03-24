import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from 'axios'
import styled from 'styled-components';

const ListEmail = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;
function GroupPage() {
    
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
        this.forceUpdate();
    }
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
    const getUsersFlights = async () => {
       
        sendEmail();
        axios
            .get("http://localhost:4001/flights/all", {
                responseType: "json",
            })
            .then(function (response) {
                // formatting all flight information
                let allFlights = new Set(); // Create a Set object to store unique values
                 for (let i = 0; i < response.data.length; i++){
                    allFlights.add(response.data[i].email); // Add each unique email to the Set object
                  }
                  setListOfItems(Array.from(allFlights)); // Convert the Set object to an array and update the state
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
                <h1> If you don't see the grouping in 30 seconds, refresh the page! </h1>
                <h2>User: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <script type="text/javascript">
                    createAccount();
                    getUsersFlights();
                </script>
                <ul>
                {listOfItems.map((flight, index) => (
                    <li key={index}>
                        Flight {flight}
                    </li>
                ))}
                </ul>
                <img src={user.picture}/>
            </article>
        )
    )
}


export default GroupPage