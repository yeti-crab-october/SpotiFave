// declaring const express and assigning it to the default export of the express module
const express = require('express');
const path = require('path');
const app = express();
// the export with the name 'dirname' from the path module
const { dirname } = require('path');
const PORT = 3000;

// built-in middleware function, parses incoming requests
app.use(express.json());
app.use(express.static('assets'));
// sending params in url, e.g. starwars api queries versus req body params 
app.use(express.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

