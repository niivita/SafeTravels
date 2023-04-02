import './Home.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import axios from 'axios'
import { addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import './FillForm.css'; 
//import { TextInput, Tooltip, Center, Text } from '@mantine/core';


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
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDirChange = (e) => {
    setDir(e.target.value)
  }

  const handleInterChange = (e) => {
    setInter(e.target.value)
  }

  return (
    <div> 
    <div className="auth-form-container " >
    <div className='bg2'>
          Grouping Form
      </div>

      <div className='bg'> 
            
            <form action="" id="tripform" class="form-horizontal">
              <div class="form-group p1" style={{border: "2px solid green"}}  > 
                <label htmlFor="date"  > Date of Flight  </label>
                
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
          <button type="button" className="btn btn-outline-success" onClick={saveData}>
            Submit
           </button>
       </div>
  
      <div className="ml-3">
         <Link to="/GroupPage">
             <button type="button" className="btn btn-outline-success">
                 View Grouping
              </button>
         </Link>
        </div>
      </div>
                  
            
                
            </form>
        </div>
        </div>
        </div>
  )
}

export default FillForm