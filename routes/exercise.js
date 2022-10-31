const express = require('express');
const router = express.Router()
const ExerciseModel = require('../models/exercise');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method
router.post('/post', auth, async (req, res) => {
    try{
        const exerciseData = new ExerciseModel({
            exerciseName: req.body.exerciseName,
            duration: req.body.duration,
            timeOfExercise: req.body.timeOfExercise,
            typeOfExercise: req.body.typeOfExercise,
            userId: req.user
        })
        const dataToSave = await exerciseData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method (?date=Oct+27+2022)
router.get('/searchByDate', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const exerciseData = await ExerciseModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const exerciseIdSearch = exerciseData.filter(e => e.userId === req.user)
        res.json(exerciseIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get today date (time property) Method (?date=Oct+27+2022)
router.get('/getExerciseToday', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const exerciseData = await ExerciseModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const exerciseIdSearch = exerciseData.filter(e => e.userId === req.user)
        res.json(exerciseIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', auth, async (req, res) => {
    try{
        const exerciseData = await ExerciseModel.find();
        const exerciseIdSearch = exerciseData.filter(exercise => exercise.userId === req.user)
        res.json(exerciseIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const exerciseData = await ExerciseModel.findById(req.params.id);
        res.json(exerciseData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Update by ID Method
router.put('/update/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body.exerciseObject;
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

//Delete by ID Method
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const exerciseData = await ExerciseModel.findByIdAndDelete(id)
        res.send(`Document with ${exerciseData._id} glasses has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all for user
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const exerciseData = await ExerciseModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL EXERCISE DATA DELETED - Total: ${exerciseData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
