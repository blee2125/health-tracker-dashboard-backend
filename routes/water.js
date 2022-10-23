const express = require('express');
const router = express.Router()
const WaterModel = require('../models/water');

module.exports = router;

const auth = require("../middleware/auth");

//Post Method
router.post('/post', auth, async (req, res) => {
    let searchDate = req.body.date
    console.log(req.body)
    try{
        const checkWaterData = await WaterModel.find({'time': { '$regex' : searchDate, '$options' : 'i' }});
        console.log('1')
        if (checkWaterData !== null) {
            const waterIdSearch = checkWaterData.filter(w => w.userId === req.user)

            if (waterIdSearch.length > 0) {
                
            } else {
                const waterData = new WaterModel({
                    glasses: req.body.glasses,
                    userId: req.user
                })
                const dataToSave = await waterData.save();
                res.status(200).json(dataToSave)
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method
router.get('/searchByDate', auth, async (req, res) => {
    console.log('waterdate:', req.user)
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const waterData = await WaterModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const waterIdSearch = waterData.filter(w => w.userId === req.user)
        console.log(waterIdSearch)
        res.json(waterIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (createdAt property) Method - not working with auth yet
router.get('/getByDates', auth, async (req, res) => {
    try{
        let start = new Date("2022-10-10"); // update to accept external value
        let end = new Date("2022-10-31");
        console.log(start)

        let curDate = new Date()
        console.log(curDate)

        end.setUTCHours(23,59,59,999);
        console.log(end.toISOString())
        const waterData = await WaterModel.find({'createdAt': {$gte: start, $lt: end}});
        res.json(waterData)
        console.log(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method - not working with auth yet
router.get('/getAll', auth, async (req, res) => {
    try{
        const waterData = await WaterModel.find();
        res.json(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const waterData = await WaterModel.findById(req.params.id);
        res.json(waterData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.put('/update/:id', auth, async (req, res) => {
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
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const waterData = await WaterModel.findByIdAndDelete(id)
        res.send(`Document with ${waterData.glasses} glasses has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})