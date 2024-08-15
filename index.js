const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const Task = require('./models/Tasks'); // Ensure this path is correct

// Define a route for GET requests to '/'
app.get('/', (req, res) => {
    res.send('Welcome to task manager!');
});

// Task Creation Route
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server listening on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
