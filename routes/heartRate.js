const express = require('express');
const router = express.Router()
const HeartRateModel = require('../models/heartRate');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method - test
router.post('/post', auth, async (req, res) => {
    try{
        const heartRateData = new HeartRateModel({
            ...req.body,
            ...{userId: req.user}
        })
        const dataToSave = await heartRateData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method - test
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const heartRateData = await HeartRateModel.findById(req.params.id);
        const hrIdSearch = heartRateData.filter(hr => hr.userId === req.user)
        res.json(hrIdSearch)
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
        const heartRateData = await HeartRateModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const hrIdSearch = heartRateData.filter(hr => hr.userId === req.user)
        res.json(hrIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method - test
router.get('/getAll', auth, async (req, res) => {
    try{
        const heartRateData = await HeartRateModel.find();
        const hrIdSearch = heartRateData.filter(hr => hr.userId === req.user)
        res.json(hrIdSearch)
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

        const result = await HeartRateModel.findByIdAndUpdate(
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
        const heartRateData = await HeartRateModel.findByIdAndDelete(id)
        res.send(`Document with ${heartRateData._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all goals - test
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const heartRateData = await HeartRateModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL HEART RATE DATA DELETED - Total: ${heartRateData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
