const express = require('express');
const router = express.Router()
const SleepModel = require('../models/sleep');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method
router.post('/post', auth, async (req, res) => {
    try{
        const sleepData = new SleepModel({
            bedtime: req.body.bedtime,
            wakeUpTime: req.body.wakeUpTime,
            activityBefore: req.body.activityBefore,
            userId: req.user
        })
        const dataToSave = await sleepData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const sleepData = await SleepModel.findById(req.params.id);
        const sleepIdSearch = sleepData.filter(sleep => sleep.userId === req.user)
        res.json(sleepIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method
router.get('/searchByDate', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const sleepData = await SleepModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const sleepIdSearch = sleepData.filter(s => s.userId === req.user)
        res.json(sleepIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', auth, async (req, res) => {
    try{
        const sleepData = await SleepModel.find();
        const sleepIdSearch = sleepData.filter(s => s.userId === req.user)
        res.json(sleepIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.put('/update/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body.sleepObject;
        const options = { new: true };

        const result = await SleepModel.findByIdAndUpdate(
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
        const sleepData = await SleepModel.findByIdAndDelete(id)
        res.send(`Document with ${sleepData._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all sleep
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const sleepData = await SleepModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL SLEEP DATA DELETED - Total: ${sleepData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})