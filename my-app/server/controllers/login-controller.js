let loggedIn = "";

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: '../server/db/csdsfinal.db',
    },
    useNullAsDefault: true
  })
  
  // creates entry in login for new users 
  exports.loginCreate = async (req, res) => {
    knex('login')
      .insert ({
        'email': req.body.email,
        'name': req.body.name
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `Login \'${req.body.email}\' by ${req.body.name} created.` })
        loggedIn = req.body.email;
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.email} account: ${err}` })
      })
  }

  // saving logged in users email to backend for use in sql queries 
  exports.recieveEmail = async (req, res) => {
    loggedIn = req.body.email;
    res.json({ message: `Email saved successfully/` })
  }

  // retrieves all info in login table for logged in user 
  exports.getUserData = async (req, res) => {
    knex
    .select('*')
    .from('login')
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

  // updates displayname for user
  exports.updateLogin = async (req, res) => {
    knex('login')
  .update({
    displayname: req.body.newName,
    image: req.body.newPicture
  })
  .where({email: loggedIn})
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