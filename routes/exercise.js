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
