import './Home.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

function FillForm() {
  const [date, setDate] = useState(new Date());
  const [direction, setDir] = useState(false); // true = outgoing, false = incoming
  const [international, setInter] = useState(false); // true = international, false = domestic

  const handleSubmit = (e) => {
    e.preventDefault();
    // save data to database here
  }

  const handleDirChange = (e) => {
    setDir(e.target.value)
  }

  const handleInterChange = (e) => {
    setInter(e.target.value)
  }

  return (
    <div className="auth-form-container">
            <form className="travelPlanForm" onSubmit={handleSubmit}>
                <label htmlFor="date">Date of Flight</label>
                <DatePicker selected={date} onChange={(e) => setDate(e)} showTimeSelect timeIntervals={1} dateFormat="MMMM d, yyyy h:mmaa"/>

                <label htmlFor="direction">Outgoing or Incoming?</label>
                <div className="radioButtons1">
                    <div className="radio">
                        <label>
                            <input value="outgoing" checked={direction === "outgoing"} onChange={handleDirChange} name="direction" type="radio" />
                            Outgoing
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input value="incoming" checked={direction === "incoming"} onChange={handleDirChange} name="direction" type="radio" />
                            Incoming
                        </label>
                    </div>
                </div>

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
                <button>
                    <label type="submit">Submit</label>
                </button>
            </form>
        </div>
  )
}

export default FillForm