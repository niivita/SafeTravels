import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import React, { useState } from "react";
import classNames from "classnames";
import "../pages/Home.css";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function Profile () {
    const { user, isAuthenticated } = useAuth0();
    let [listOfItems, setListOfItems] = useState([]);
    let [background, setBackground] = useState(false);

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

    const changeBackground = async(e) => {
        setBackground(!background);
    }

    const conditionalStyles = classNames("App", {
        "bkg-dark": background,
        "bkg-light": !background
    })

    const editProfile = () => {
        
    }

    if (isAuthenticated){
        window.localStorage.setItem("currUser", user.email);
        window.localStorage.setItem("currFlights", getUsersFlights());
    }

    const getDate = (dateTime) => {
        if (dateTime.length === 0) {
            return '';
          }
        const year = dateTime.substring(0, 4);
        const month = dateTime.substring(5, 7);
        const day = dateTime.substring(8, 10);
        return month + '/' + day + '/' + year;
    }

    const getTime = (dateTime) => {
        if (dateTime.length === 0) {
            return '';
          }
        const hours = dateTime.substring(11, 14);
        const minutes = dateTime.substring(14 ,16);
        return hours + minutes;
    }

    window.onload = createAccount();

    return (
        isAuthenticated && (
            <article className={conditionalStyles}>
                <hr></hr>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width="10%">
                                    <img src={user.picture}/>
                                </TableCell>
                                <TableCell width="70%" sx={{fontSize:"25pt"}}>
                                    {user.name}
                                </TableCell>
                                <TableCell align="right" width="20%">
                                    <TableRow>
                                        <TableCell>
                                            <button className="btn" onClick={editProfile}><b>edit profile</b></button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <button className="btn" onClick={changeBackground}><b>{background ? "light mode" : "dark mode"}</b></button>
                                        </TableCell>
                                    </TableRow>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <hr></hr>
                <span className="TableTitle">Your Past Flights:</span>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="20%" sx={{fontSize:"15pt"}}>
                                    Date
                                </TableCell>
                                <TableCell align="center" width="20%" sx={{fontSize:"15pt"}}>
                                    Time
                                </TableCell>
                                <TableCell align="center" width="20%" sx={{fontSize:"15pt"}}>
                                    Direction
                                </TableCell>
                                <TableCell align="center" width="20%" sx={{fontSize:"15pt"}}>
                                    Location
                                </TableCell>
                                <TableCell align="center" width="20%" sx={{fontSize:"15pt"}}>
                                    Comments
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOfItems.map((item) => (
                                <TableRow 
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{getDate(item[1])}</TableCell>
                                    <TableCell align="center">{getTime(item[1])}</TableCell>
                                    <TableCell align="center">{item[2]}</TableCell>
                                    <TableCell align="center">{item[3]}</TableCell>
                                    <TableCell align="center">
                                        {item[4]}
                                    <button className="btn">update comments</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </article>
        )
    )
/*
    return (
        isAuthenticated && (
            <article className={conditionalStyles}>
                <h2>User: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <img src={user.picture}/>
                <script type="text/javascript">
                    createAccount();
                    getUsersFlights();
                </script>
                <h2>
                    Flights: {listOfItems}
                </h2>
                <h2>
                    <button className="btn" onClick={changeBackground}>
                        <strong>{background ? "Light Mode" : "Dark Mode"}</strong>
                    </button>
                </h2>
                
            </article>
        )
    )
*/
}

export default Profile