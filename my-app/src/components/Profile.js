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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import jQuery from "jquery";

function Profile () {

    const { user, isAuthenticated } = useAuth0();
    let [listOfItems, setListOfItems] = useState([]);                   // holds all of the flights for the loggedin user
    let [background, setBackground] = useState(false);                  // holds value of background (light or dark)
    let [editProfileOpen, setEditProfileOpen] = useState(false);        // determines whether the edit profile card is visible
    let [editCommentsOpen, setEditCommentsOpen] = useState(false);      // determines whether the edit comments card is visible
    let [currName, setCurrName] = useState("");                         // holds displayname for currently loggedin user 
    let [currPicture, setCurrPicture] = useState(1);                    // not currently in use, still implementing
    let [updatedTripID, setUpdatedTripID] = useState("");               // holds the trip id of the trip who's comments are being edited
    let [newComments, setNewComments] = useState("");                   // holds the new comments for 'updatedTripID' 
    let [start, setStart] = useState(0);                                // is used so that the onload function only happens once

    // is called when the profile page gets loaded
    // checks who is logged in, creates an entry in login for them if necessary 
    // calls getUsersFlights() to get the logged in users flights on screen
    const createAccount = async (e) => {
        if (isAuthenticated && start === 0){
                window.localStorage.setItem("currUser", user.email);
                window.localStorage.setItem("currFlights", getUsersFlights());
                sendEmailToLogin();
                getUsersInfo();
                setStart(1);
            
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
    }

    // get request to get all loggedin user data 
    const getUsersInfo = async () => {
                try {
                    await axios
                        .get("http://localhost:4001/login/userInfo", {
                            responseType: "json",
                        })
                        .then(function (response) {
                            setCurrName(response.data[0].displayname);
                            setCurrPicture(response.data[0].image);
                            return response;
                        });
                }
                catch (error) {
                    console.log(error);
                }
            }

    // sends post request to update comments for a given trip for the logged in user
    const updateComms = async (e) => {
        try {
            const response = await axios.post('http://localhost:4001/flights/updateComments', {
            // Data to be sent to the server
                comments: newComments,
                tripID: updatedTripID
            })
            .then(function(response) {
                console.log(response);
            });
            } catch (error) {
            console.error(error);
            }
    }

    // sends post request to update users display name 
    const updateProfile = async (e) => {
        console.log(currName);
        console.log(currPicture);
        
        try {
            const response = await axios.post('http://localhost:4001/login/updateprofile', {
            // Data to be sent to the server
                newName: currName
            })
            .then(function(response) {
                console.log(response);
            });
            } catch (error) {
            console.error(error);
            }
            
    }

    // sending email of currently logged in user to fligts backend
    const sendEmailToFlights = async (e) => {
        try {
            const response = await axios.post('http://localhost:4001/flights/sendEmail', {
            // Data to be sent to the server
                email: user.email
            })
            .then(function(response) {
                console.log(response);
            });
            } catch (error) {
            console.error(error);
        }
    }

    // sending email of currently logged in user to fligts backend
    const sendEmailToLogin = async (e) => {
        try {
            const response = await axios.post('http://localhost:4001/login/sendEmail', {
            // Data to be sent to the server
                email: user.email
            })
            .then(function(response) {
                console.log(response);
            });
            } catch (error) {
                console.error(error);
            }
        }

    // retrieves all fligts from the database that this user has entered
    const getUsersFlights = async () => {
        sendEmailToFlights();
        try {
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
        catch (error) {
            console.log(error);
        }
    }

    // called on dark/light mode button press 
    const changeBackground = async(e) => {
        setBackground(!background);
    }

    // creates conditional css for light/dark mode 
    const conditionalStyles = classNames("App", {
        "bkg-dark": background,
        "bkg-light": !background
    })

    // sets the edit profile card to visible
    const editProfile = () => {
        setEditProfileOpen(true);
    }

    // sets displayname on frontend if it was changed
    const newName = (input) => {
        setCurrName(input);
    }

    // not currently in use, still implementing
    const newPicture = (input) => {
        setCurrPicture(input);
    }

    // calls the function that sends the post request to save the displayname into db
    // sets edit profile card to invisible
    const saveProfileEditsToDB = async () => {
        updateProfile();
        setEditProfileOpen(false);
    }

    // saves the id of the trip that 'edit comments' was clicked on
    // set edit comments card to visible 
    const editComments = (input) => {
        setUpdatedTripID(input);
        setEditCommentsOpen(true);
    }

    // saves entered comments 
    const saveCommentEdits = (input) => {
        setNewComments(input);
    }

    // calls the function that sends the post request to save new comments into db
    // sets edit comments card to invisible 
    const updateCommentsInDB = async () => {
        updateComms();
        setEditCommentsOpen(false);
        window.location.reload();
    }

    // gets the date out of the smallDatTime SQL object and formats it 
    const getDate = (dateTime) => {
        if (dateTime.length === 0) {
            return '';
          }
        const year = dateTime.substring(0, 4);
        const month = dateTime.substring(5, 7);
        const day = dateTime.substring(8, 10);
        return month + '/' + day + '/' + year;
    }

    // gets the time out of the smallDatTime SQL object and formats it 
    const getTime = (dateTime) => {
        if (dateTime.length === 0) {
            return '';
          }
        const hours = dateTime.substring(11, 14);
        const minutes = dateTime.substring(14 ,16);
        return hours + minutes;
    }

    // called createAccount() on page load 
    jQuery(createAccount());


    return (
        isAuthenticated && (
            <article className={conditionalStyles}>

                <Dialog open={editProfileOpen}>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{ margin: '10px', width: '90%' }}
                            id="titleInput"
                            variant="outlined"
                            label="Name"
                            defaultValue={currName}
                            onChange={(e) => newName(e.target.value)}
                        />
                        <br />
                        <RadioGroup
                            sx={{ width: '280px', margin: '10px' }}
                            row
                            label="Picture"
                            defaultValue={currPicture}
                            onChange={(e) => newPicture(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={saveProfileEditsToDB}>save</button>
                    </DialogActions>
                </Dialog>
                <Dialog open={editCommentsOpen}>
                    <DialogTitle>
                        Add or Change your notes for this trip.
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{ margin: '10px', width: '90%' }}
                            id="commentInput"
                            variant="outlined"
                            label="Comments"
                            defaultValue={""}
                            onChange={(e) => saveCommentEdits(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                    <button onClick={(e) => updateCommentsInDB()}>save</button>
                    </DialogActions>
                </Dialog>


                
                <hr></hr>
                <TableContainer>
                    <Table>
                        <TableHead>
                                <TableCell width="20%">
                                    <TableRow>
                                            <TableCell>
                                                
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={conditionalStyles} sx={{fontSize:"10pt"}}>
                                                {user.name}
                                            </TableCell>
                                        </TableRow>
                                </TableCell>
                                <TableCell width="60%" className={conditionalStyles} sx={{fontSize:"25pt"}}>
                                        {currName}
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
                        </TableHead>
                    </Table>
                </TableContainer>
                <hr></hr>
                <span className="TableTitle">Your Past Flights:</span>
                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableCell align="center" width="20%" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                Date
                            </TableCell>
                            <TableCell align="center" width="20%" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                Time
                            </TableCell>
                            <TableCell align="center" width="20%" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                Direction
                            </TableCell>
                            <TableCell align="center" width="20%" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                Location
                            </TableCell>
                            <TableCell align="center" width="20%" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                Comments
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {listOfItems.map((item) => (
                                <TableRow 
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" className={conditionalStyles} sx={{fontSize:"15pt"}}>{getDate(item[1])}</TableCell>
                                    <TableCell align="center" className={conditionalStyles} >{getTime(item[1])}</TableCell>
                                    <TableCell align="center" className={conditionalStyles} >{item[2]}</TableCell>
                                    <TableCell align="center" className={conditionalStyles} >{item[3]}</TableCell>
                                    <TableCell align="center" className={conditionalStyles} >
                                        {item[4]}
                                        <br />
                                    <button className="btn" onClick={e => editComments(item[0])}>update comments</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </article>
        )
    )
}

export default Profile