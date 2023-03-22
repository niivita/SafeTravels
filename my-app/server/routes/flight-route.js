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

router.get('/personal', flightRoutes.flightsPersonal)

router.post('/sendEmail', flightRoutes.flightsRecieveEmail)

// Add route for POST request to create new flight
// In server.js, flights route is specified as '/flights'
// this means that '/create' translates to '/flights/create'
router.post('/create', flightRoutes.flightCreate)

// Export router
module.exports = router