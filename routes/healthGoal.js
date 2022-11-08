const express = require('express');
const router = express.Router()
const HealthGoalModel = require('../models/healthGoal');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method - test
router.post('/post', auth, async (req, res) => {
    try{
        const healthGoalData = new HealthGoalModel({
            ...req.body,
            ...{userId: req.user}
        })
        const dataToSave = await healthGoalData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method - test
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const healthGoalData = await HealthGoalModel.findById(req.params.id);
        const goalIdSearch = healthGoalData.filter(goal => goal.userId === req.user)
        res.json(goalIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method - test
router.get('/searchByDate', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const healthGoalData = await HealthGoalModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const goalIdSearch = healthGoalData.filter(goal => goal.userId === req.user)
        res.json(goalIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method - test
router.get('/getAll', auth, async (req, res) => {
    try{
        const healthGoalData = await HealthGoalModel.find();
        const goalIdSearch = healthGoalData.filter(goal => goal.userId === req.user)
        res.json(goalIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method - test
router.patch('/update/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await HealthGoalModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method - test
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const healthGoalData = await HealthGoalModel.findByIdAndDelete(id)
        res.send(`Document with ${healthGoalData._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all goals - test
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const healthGoalData = await HealthGoalModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL HEALTH GOAL DATA DELETED - Total: ${healthGoalData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
