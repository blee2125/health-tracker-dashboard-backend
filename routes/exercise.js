const express = require('express');
const router = express.Router()
const ExerciseModel = require('../models/exercise');

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    console.log(req)
    try{
        const exerciseData = new ExerciseModel({
            exerciseName: req.body.exerciseName,
            duration: req.body.duration,
            timeOfExercise: req.body.timeOfExercise,
            typeOfExercise: req.body.typeOfExercise
        })
        const dataToSave = await exerciseData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method
router.get('/searchByDate', async (req, res) => {
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const exerciseData = await ExerciseModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        res.json(exerciseData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const exerciseData = await ExerciseModel.find();
        res.json(exerciseData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const exerciseData = await ExerciseModel.findById(req.params.id);
        res.json(exerciseData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Update by ID Method
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ExerciseModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
