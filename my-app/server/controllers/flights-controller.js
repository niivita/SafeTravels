let loggedIn = "";
let flightTime = "";
let startTime = "";
let endTime = "";
let direction = "";

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../server/db/csdsfinal.db',
  },
  useNullAsDefault: true
})

const uuid = require('uuid');

// Retrieve all flights
exports.flightsAll = async (req, res) => {

  // Get all flights from database
  knex
    .select('*') // select all records
    .from('flight') // from 'flight' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}

// saving logged in users email to backend for use in sql queries 
exports.flightsRecieveEmail = async (req, res) => {
  loggedIn = req.body.email;
  res.json({ message: `Email saved successfully/` })
}

// Get flights for logged in user from database
exports.flightsPersonal = async (req, res) => {
  knex
    .select('*') // select all records
    .from('flight') // from 'flight' table
    .where('email', loggedIn)
    .then(userData => {
      // Send flight extracted from database in response
      //console.log(userData)
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}


// Create new flight
exports.flightCreate = async (req, res) => {
flightTime = req.body.flighttime;
direction = req.body.direction;
    // Add new flight to database
    knex('flight')
      .insert({ // insert new record, a flight
        'email': req.body.email,
        'flighttime': req.body.flighttime,
        'direction': req.body.direction,
        'international': req.body.international,
        'comments': req.body.comments
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `Flight \'${req.body.trip_id}\' by ${req.body.email} created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.email} flight: ${err}` })
      })
  }

  // get group for a submitted flight
exports.groupAll = async (req, res) => {
  const groupId = uuid.v4();
let hour = parseInt(flightTime.substring(11, 13)) - 4;
if (hour <= 0){
  hour = hour + 24;
}
let hour0 = hour - 0;
let hour4 = hour - 4;
let hour8 = hour - 8;
let hour12 = hour - 12;
let hour16 = hour - 16;
let hour20 = hour - 20;
let hour24 = hour - 24;

function getSmallestPositive(hour0, hour4, hour8, hour12, hour16, hour20, hour24) {
  const hoursArray = [hour0, hour4, hour8, hour12, hour16, hour20, hour24];
  const positiveHours = hoursArray.filter(hour => hour > 0);
  console.log(Math.min(...positiveHours), 'tim')
  return Math.min(...positiveHours);
  
}
let minhour = getSmallestPositive(hour0, hour4, hour8, hour12, hour16, hour20, hour24);
let leavehour = hour - minhour;



let startHour = hour - 2;
let endHour = hour + 2;
if (startHour < 10){
  startHour = String(startHour);
  startHour = '0' + startHour;

}
else {
  startHour = String(startHour);
}
if (endHour < 10){
  endHour = String(endHour);
  endHour = '0' + endHour;
}
else {
  endHour = String(endHour);
}
startTime = flightTime.substring(0,11) + leavehour;

console.log(startTime);
console.log(endTime);
    knex('flight')
    .select('email')
    .whereBetween('flighttime', [startTime, endTime])
    .where('direction', direction)
    //.whereNot('email', loggedIn)
    .then(userData => {
      // Send books extracted from database in response
      const group = {
        groupId: String(startTime) + String(direction),
        flights: userData
      };
      res.json(group); 
      loggedIn = req.body.email;
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}

// update comments for given trip in database
exports.putNewCommentsInDB = async (req, res) => {
  knex('flight')
  .update({
    comments: req.body.comments
  })
  .where({trip_id: req.body.tripID})
  .then(response => {
    // Send a success message in response
    res.json(response.userData);
    //res.json({ message: `Flight \'${req.query.trip_id}\' updated successfully.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error updating ${req.query.trip_id} flight: ${err}` })
  })
}