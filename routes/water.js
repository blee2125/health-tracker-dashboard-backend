const express = require('express');
const router = express.Router()
const WaterModel = require('../models/water');

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    const waterData = new WaterModel({
        glasses: req.body.glasses
    })

    try {
        const dataToSave = await waterData.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get by date (time property) Method
router.get('/searchByDate', async (req, res) => {
    try{
        const searchDate = 'Oct 10 2022' // update to accept external value
        const waterData = await WaterModel.find({'time': { '$regex' : searchDate, '$options' : 'i' }});
        res.json(waterData)
        console.log(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (createdAt property) Method
router.get('/getByDate', async (req, res) => {
    try{
        let start = new Date("2022-10-10"); // update to accept external value
        let end = new Date("2022-10-11");
        end.setUTCHours(23,59,59,999);
        const waterData = await WaterModel.find({'createdAt': {$gte: start, $lt: end}});
        res.json(waterData)
        console.log(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const waterData = await WaterModel.find();
        res.json(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const waterData = await WaterModel.findById(req.params.id);
        res.json(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await WaterModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const waterData = await WaterModel.findByIdAndDelete(id)
        res.send(`Document with ${waterData.glasses} glasses has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})