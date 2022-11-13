const express = require('express');
const router = express.Router()
const BloodPressureModel = require('../models/bloodPressure');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method - test
router.post('/post', auth, async (req, res) => {
    console.log(req.body)
    try{
        const bloodPressureData = new BloodPressureModel({
            ...req.body,
            ...{userId: req.user}
        })
        const dataToSave = await bloodPressureData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method - test
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const bloodPressureData = await BloodPressureModel.findById(req.params.id);
        const bpIdSearch = bloodPressureData.filter(bp => bp.userId === req.user)
        res.json(bpIdSearch)
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
        const bloodPressureData = await BloodPressureModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const bpIdSearch = bloodPressureData.filter(bp => bp.userId === req.user)
        res.json(bpIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method - test
router.get('/getAll', auth, async (req, res) => {
    try{
        const bloodPressureData = await BloodPressureModel.find();
        const bpIdSearch = bloodPressureData.filter(bp => bp.userId === req.user)
        res.json(bpIdSearch)
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

        const result = await BloodPressureModel.findByIdAndUpdate(
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
        const bloodPressureData = await BloodPressureModel.findByIdAndDelete(id)
        res.send(`Document with ${bloodPressureData._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all - test
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const bloodPressureData = await BloodPressureModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL BLOOD PRESSURE DATA DELETED - Total: ${bloodPressureData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
