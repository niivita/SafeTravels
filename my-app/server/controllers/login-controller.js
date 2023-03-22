let loggedIn = "";

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: '../server/db/csds393.db',
    },
    useNullAsDefault: true
  })
  
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