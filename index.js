// Import express module
const express = require('express');

// Create an express application
const app = express();

// Define a port number
const port = 3000;

// Define a route for GET requests to '/'
app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start the server listening on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});