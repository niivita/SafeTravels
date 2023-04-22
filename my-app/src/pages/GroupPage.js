import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from 'axios'
import styled from 'styled-components';
import HomeButton from '../components/HomeButton';
import jQuery from "jquery";




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
    let [id, setId] = useState([]);
    let [start, setStart] = useState(0);
    let [groupIds, setGroupIds] = useState(new Set());
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
            .get("http://localhost:4001/flights/group", {
                responseType: "json",
            })
            .then(function (response) {
                // formatting all flight information
                
                console.log(response); 
                const groupID = response.data.groupId; 
                let str= String(groupID); 
            
                let strS = str.substring(0,16); 
                let strE = str.substring(24,40); 
                let strD = str.substring(48,56); 
                str = strS+'Z'+strE+'Z'+ strD;
                const CryptoJS = require("crypto-js");

                function generateHash(input, length) {
                    const fullHash = CryptoJS.SHA256(input).toString();
                    return fullHash.substr(0, length);
                  }
                  
                const hash = generateHash(str, 5);
                const flights = response.data.flights;
                console.log(groupID); 
                console.log(flights); 
                

                let allFlights = new Set(); // Create a Set object to store unique values
                
                 for (let i = 0; i < flights.length; i++){
                    
                        console.log(allFlights); 
                         allFlights.add(flights[i].email); // Add each unique email to the Set object
                    
                  }
                  setId(hash); 
                  setListOfItems(Array.from(allFlights)); // Convert the Set object to an array and update the state
                 return response.data;
        });
    
    }

    if (isAuthenticated && start == 0){
        jQuery(createAccount());
        window.localStorage.setItem("currUser", user.email);
        window.localStorage.setItem("currFlights", getUsersFlights());
        setStart(1);
    }

    //window.onload = createAccount();

    return (
        isAuthenticated && (
            <article className="column">
                <h1 className="refresh"> If you don't see the grouping in 30 seconds, refresh the page! </h1>
                <h2>Here are the emails of the people travleing around the same time as you. </h2>
                <script type="text/javascript">
                    createAccount();
                    getUsersFlights();
                </script>
                <ul className="list">
                {listOfItems.map((flight, index) => (
                    <li key={index}>
                        {flight}
                    </li>
                ))}
                <h1 className="group-id"> This is your group ID- use it to log in to your appropriate group </h1>
                <li> {id}</li>
                </ul>
                <center><HomeButton /></center>
            </article>
        )
    )
}


export default GroupPage