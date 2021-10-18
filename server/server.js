// declaring const express and assigning it to the default export of the express module
const express = require('express');
const path = require('path');
const app = express();
// the export with the name 'dirname' from the path module
const { dirname } = require('path');
const PORT = 3000;
const musicControllers = require('./controllers.js')

// built-in middleware function, parses incoming requests
app.use(express.json());
app.use(express.static('assets'));
// sending params in url, e.g. starwars api queries versus req body params 
app.use(express.urlencoded({extended: true}));

//create get handler for /home to send the index.html
app.get('/', (req, res) => 
res.status(200).sendFile(path.join(__dirname, '../src/index.html'))
);

//create post handler for the sign in page
app.post('/api/logIn', 
  //will receive an option with password and username keys
  musicControllers.getUser,
  //add the username and password to the db
  //redirect the user to the home page
  (req, res) => res.status(200)
);
//create get handler for user pressing the button to get their latest songs
//get the songs that the user has listened to 


// app.listen(PORT, () => {
//     console.log(`Server listening on port: ${PORT}`)
// })

