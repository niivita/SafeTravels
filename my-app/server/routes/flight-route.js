// bookshelf-app/server/routes/books-route.js

// Import express
const express = require('express')

// Import flights-controller
const flightRoutes = require('./../controllers/flights-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all flight
// In server.js, flight route is specified as '/flight'
// this means that '/all' translates to '/flights/all'
router.get('/all', flightRoutes.flightsAll)

// route for getting the emails of a users group
router.get('/group', flightRoutes.groupAll)

// route for getting all flights for the logged in user 
router.get('/personal', flightRoutes.flightsPersonal)

// route for posting the email of the loggedin user to backend for use in other queries
router.post('/sendEmail', flightRoutes.flightsRecieveEmail)

// route for posting the new comments for a given trip for the loggedin user into the database
router.post('/updateComments', flightRoutes.putNewCommentsInDB)

// Add route for POST request to create new flight
// In server.js, flights route is specified as '/flights'
// this means that '/create' translates to '/flights/create'
router.post('/create', flightRoutes.flightCreate)

// Export router
module.exports = router