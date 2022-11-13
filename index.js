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

// Port
var port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

// Routes
const water = require('./routes/water');
app.use('/api/water', water)

const exercise = require('./routes/exercise');
app.use('/api/exercise', exercise)

const food = require('./routes/food');
app.use('/api/food', food)

const external = require('./routes/external');
app.use('/api/external', external)

const user = require('./routes/user');
app.use('/api/user', user)

const sleep = require('./routes/sleep');
app.use('/api/sleep', sleep)

const weight = require('./routes/weight');
app.use('/api/weight', weight)

const settings = require('./routes/settings');
app.use('/api/settings', settings)

const healthGoal = require('./routes/healthGoal');
app.use('/api/healthgoal', healthGoal)

const bloodPressure = require('./routes/bloodPressure');
app.use('/api/bloodpressure', bloodPressure)

const heartRate = require('./routes/heartRate');
app.use('/api/heartrate', heartRate)
