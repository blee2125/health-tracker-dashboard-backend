require('dotenv').config();

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use(cors())

var port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

// Routes
//const routes = require('./routes/routes');
//app.use('/api', routes)

const water = require('./routes/water');
app.use('/api/water', water)
