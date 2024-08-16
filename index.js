const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
//mongodb connection
const {MongoClient} = require('mongodb'); //importing MongoClient from mongodb





const port = 9000;
const host = 'http://127.0.0.1:' + port;

app.listen(port, () => console.log(host));

//mongodb connection
const mongodbURL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(mongodbURL); //mongodb object

//Promise kullanıyor yani databasee async bir şekilde bağlanıyor
async function connect(){
    try{
        const conn = await client.connect();
        //now we need to select a database
        const db = await conn.db('mydb');
        const coll = await db.collection('tasks');
        //const result = await coll.find().toArray();
        //res.send(result);
        return coll;
    }catch(err){
        console.log(err);
    }
    return;
}




//APIS
app.get('/', (req, res) => {
    res.send("hello baby");
})

//DISPLAY TASKS
app.get('/tasks', async (req, res) => {
    try {
        const coll = await connect(); // Get the tasks collection
        const tasks = await coll.find().toArray(); // Fetch all tasks
        res.status(200).json(tasks); // Send tasks as JSON
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).send('Error fetching tasks.');
    }
});


// Serve the form.html
app.get('/create-task', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

//CREATE TASK
app.post('/tasks', async (req, res) => {
    try {
        console.log(req.body); // Log the request body to check the received data
        const coll = await connect();
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            createdAt: new Date()
        };
        const result = await coll.insertOne(newTask);
        res.status(201).send(`Task created successfully with ID: ${result.insertedId}`);
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).send('Error creating task.');
    }
});


