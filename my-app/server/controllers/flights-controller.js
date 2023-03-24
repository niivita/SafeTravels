let loggedIn = "";

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../server/db/csds393.db',
  },
  useNullAsDefault: true
})

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
}

exports.flightsPersonal = async (req, res) => {
  // Get flights for logged in user from database
  knex
    .select('*') // select all records
    .from('flight') // from 'flight' table
    .where('email', loggedIn)
    .then(userData => {
      // Send flight extracted from database in response
      console.log(userData)
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}


// Create new flight
exports.flightCreate = async (req, res) => {
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

  exports.groupAll = async (req, res) => {

    knex('flight')
    .select('email')
    .whereBetween('flighttime', [
      knex.raw("ADDTIME(?,'0 2:0:0.00')", ['*insert flight time*']),
      knex.raw("ADDTIME(?,'0 -2:0:0.00')", ['*insert flight time*']),
    ])
    .where({ '*enter incoming or out going data *': true })
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
      loggedIn = req.body.email;
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}