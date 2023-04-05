// bookshelf-app/server/routes/books-route.js

// Import express
const express = require('express')

// Import login-controller
const loginRoutes = require('./../controllers/login-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all flights
// In server.js, books route is specified as '/flight'
// this means that '/all' translates to '/flights/all'
//router.get('/all', loginRoutes.loginAll)

// Add route for POST request to create new account
// In server.js, login route is specified as '/login'
// this means that '/create' translates to '/login/create'
router.post('/create', loginRoutes.loginCreate)

// route to get users info from login table 
router.get('/userInfo', loginRoutes.getUserData)

// route to send email of loggedin user to backend for use in other queries
router.post('/sendEmail', loginRoutes.recieveEmail)

// route to update the user displayname
router.post('/updateProfile', loginRoutes.updateLogin)

// Export router
module.exports = router