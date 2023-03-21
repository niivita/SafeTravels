

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../server/db/csds393.db',
  },
  useNullAsDefault: true
})

// Retrieve all books
exports.flightsAll = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('flight') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}

exports.flightsPersonal = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('flight') // from 'books' table
    .where('email', 'efg29@case.edu')
    .then(userData => {
      // Send books extracted from database in response
      console.log(userData)
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}


// Create new book
exports.flightCreate = async (req, res) => {
    // Add new book to database
    knex('flight')
      .insert({ // insert new record, a flight
        //'trip_id': req.body.trip_id,
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