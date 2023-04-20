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
import spartie from './images/spartie.jpeg';
import blankProfile from './images/blankProfile.png';
import LogoutButton from "../components/LogoutButton";
import FillFormButton from '../components/FillFormButton';
import logo from "./images/SafeTravelsLogo.webp";


function Profile () {

    const { user, isAuthenticated } = useAuth0();
    let [listOfItems, setListOfItems] = useState([]);                   // holds all of the flights for the loggedin user
    let [background, setBackground] = useState(false);                  // holds value of background (light or dark)
    let [editProfileOpen, setEditProfileOpen] = useState(false);        // determines whether the edit profile card is visible
    let [editCommentsOpen, setEditCommentsOpen] = useState(false);      // determines whether the edit comments card is visible
    let [currName, setCurrName] = useState("");                         // holds displayname for currently loggedin user 
    let [currPicture, setCurrPicture] = useState("");                    // not currently in use, still implementing
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
                            //setCurrPicture(response.data[0].image);
                            if (response.data[0].image === 1)
                                setCurrPicture(user.picture);
                            else if (response.data[0].image === 2)
                                setCurrPicture(blankProfile);
                            else 
                                setCurrPicture(spartie)
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

    // sends post request to update users display name and profile photo
    const updateProfile = async (e) => {
        console.log(currName);
        console.log(currPicture);

        /* doesn't work yet but for picking a file of your own for profile pic
        const img = document.querySelector('#photo');
        const picInput = document.querySelector('#picInput');
        picInput.addEventListener('change', function(){
            const chosenFile = this.files[0]
    
            if (chosenFile) {
                const reader = new FileReader();
                reader.addEventListener('load', function(){
                    //img.setAttribute('src', reader.result);
                    newPicture(reader.result);
                });
                reader.readAsDataURL(chosenFile);
            }
        });
        */

        let pic = 0;
        if (currPicture == "https://lh3.googleusercontent.com/a/AGNmyxZ4iFOsKKTrv6LbviAiAskJeUO_6FD1pHGJnP1Q=s96-c"){
            pic = 1;
        }
        else if (currPicture == "/static/media/spartie.9c71a87e90debe743e35.jpeg"){
            pic = 3;
        }
        else {
            pic = 2;
        }
        
        try {
            const response = await axios.post('http://localhost:4001/login/updateprofile', {
            // Data to be sent to the server
                newName: currName,
                newPicture: pic
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
    const conditionalStyles = classNames("App", "Home", {
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

    // sets profile picture on frontend if it was changed
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
            <article className={conditionalStyles} style={{height: "100vh"}}>
                <img src={logo} width="70" height="70" style={{display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
                <h1 style={{fontFamily: "Copperplate"}}><center>SafeTravels</center></h1>

                <Dialog open={editProfileOpen}>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>
                    <DialogContent> Display Name
                        <TextField
                            sx={{ margin: '10px', width: '90%' }}
                            id="titleInput"
                            variant="outlined"
                            label="Name"
                            defaultValue={currName}
                            onChange={(e) => newName(e.target.value)}
                        />

                        <br />
                        Select a profile picture:
                        <br />
                        <RadioGroup
                            sx={{ width: '280px', margin: '20px' }}
                            row
                            label="Picture"
                            defaultValue={currPicture}
                            onChange={(e) => newPicture(e.target.value)}
                        >
                            <FormControlLabel  value={user.picture} name="profile-pic" control={<Radio />} label="Default Profile Photo" />
                            <img className="profile" src={user.picture} id="photo"/>
                            <FormControlLabel  value={blankProfile} name="profile-pic" control={<Radio />} label="Blank Profile Photo" />
                            <img className="profile" src={blankProfile} id="photo"/>
                            <FormControlLabel  value={spartie} name="profile-pic" control={<Radio />} label="Spartie" />
                            <img className="profile" src={spartie} id="photo"/>
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={saveProfileEditsToDB}>Save</button>
                    </DialogActions>
                </Dialog>
                <Dialog open={editCommentsOpen}>
                    <DialogTitle>
                        Add or change your notes for this trip.
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
                    <button onClick={(e) => updateCommentsInDB()}>Save</button>
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
                                        <TableCell className={conditionalStyles}>
                                            <img className="profile" src={currPicture} id="photo"></img>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" className={conditionalStyles} sx={{fontSize:"15pt"}}>
                                            {currName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" className={conditionalStyles} sx={{fontSize:"12pt"}}>
                                            {user.email}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" className={conditionalStyles} sx={{fontSize:"10pt"}}>
                                            <LogoutButton />
                                        </TableCell>
                                    </TableRow>
                                </TableCell>
                                <TableCell width="60%" className={conditionalStyles} style={{fontSize:"17pt"}}>
                                        <p1>Need to get to or from the airport and cabs are too expensive?</p1> 
                                        <br></br>
                                        <br></br>
                                        <p1>Fill in your flight details and find a group to carpool with!</p1>
                                        <br></br>
                                        <br></br>
                                        <center><FillFormButton /></center>
                                        {/* {currName} */}
                                </TableCell>

                                <TableCell align="right" width="20%">
                                    <TableRow>
                                        <TableCell className={conditionalStyles}>
                                            User Preferences
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <button className="btn" onClick={editProfile}><b>Edit Profile</b></button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <button className="btn" onClick={changeBackground}><b>{background ? "Light Mode" : "Dark Mode"}</b></button>
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