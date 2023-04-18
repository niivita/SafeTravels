import './Home.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import axios from 'axios'
import { addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import './FillForm.css'; 
import HomeButton from '../components/HomeButton';
//import { TextInput, Tooltip, Center, Text } from '@mantine/core';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 


function FillForm() {
  const [date, setDate] = useState(addDays(new Date(), 2));
  const [direction, setDir] = useState(false);              // true = outgoing, false = incoming
  const [international, setInter] = useState(false);        // true = international, false = domestic


  // entering new flight into the database 
  const saveData = async (e) => {
    e.preventDefault();
    var currUser = window.localStorage.getItem("currUser");
    try {
      const response = await axios.post('http://localhost:4001/flights/create', {
        // Data to be sent to the server
      email: currUser,
      flighttime: date,
      direction: direction,
      international: international
      })
      .then(function(response) {
        toast.success('Flight submitted successfully!', {position: toast.POSITION.BOTTOM_CENTER});
      });
    } catch (error) {
      console.error(error);
      toast.error('Flight not submitted. Please reload the page and try again.', {position: toast.POSITION.BOTTOM_CENTER});
    }
  }

  const handleDirChange = (e) => {
    setDir(e.target.value)
  }

  const handleInterChange = (e) => {
    setInter(e.target.value)
  }

  return (
    <div classsName="pageBG"> 
    <div className="auth-form-container " >
    <div className='bg2'>
          Flight Form
    </div>

      <div className='bg'> 
            
            <form action="" id="tripform" class="form-horizontal">
              <div class="form-group p1"> 
                <label htmlFor="date"  > Date and Time of Flight:  </label>
                <DatePicker minDate={addDays(new Date(), 2)} selected={date} onChange={(e) => setDate(e)} showTimeSelect timeIntervals={1} dateFormat="MMMM d, yyyy h:mmaa"/>
              </div>
                
                <div className='center p2' > 
                <label htmlFor="direction">Outgoing or Incoming?</label>
                <div className="radioButtons1 "style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <div className="radio" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                        <label>
                            <input value="outgoing" checked={direction === "outgoing"} onChange={handleDirChange} name="direction" type="radio" />
                            Outgoing
                        </label>
                    </div>
                    <div className="radio" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                        <label>
                            <input value="incoming" checked={direction === "incoming"} onChange={handleDirChange} name="direction" type="radio" />
                            Incoming
                        </label>
                    </div>
                </div>
                </div>
                
                <div className="center p2">
                <label htmlFor="interOrDom">International or Domestic?</label>
                <div className="radioButtons2">
                    <div className="radio">
                        <label>
                            <input value="international" checked={international === "international"} onChange={handleInterChange} name="interOrDom" type="radio"/>
                            International
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input value="domestic" checked={international === "domestic"} onChange={handleInterChange} name="interOrDom" type="radio"/>
                            Domestic
                        </label>
                    </div>
                </div>
                </div>
        <div className="button-location button-style d-flex justify-content-center">
        <div className="action_btn mr-3">
          <button type="button" className="btn" onClick={saveData} style={{marginRight: "2px"}}>
            Submit
           </button>
           <ToastContainer />
       </div>
  
      <div className="ml-3">
         <Link to="/GroupPage">
             <button type="button" className="btn" style={{marginLeft: "2px"}}>
                 View Grouping
              </button>
         </Link>
        </div>
        
        <div>
        </div>
      </div>
                  
            
                
            </form>
        </div>
        </div>
        <div style={{backgroundColor: "#7c9ed9"}}>
          <center><HomeButton /></center>
        </div>
        </div>
  )
}

export default FillForm