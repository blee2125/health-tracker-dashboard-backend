const express = require('express');
const router = express.Router()
const WeightModel = require('../models/weight');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method - New Weight Data
router.post('/post', auth, async (req, res) => {
    try{
        const weightData = new WeightModel({
            weight: req.body.weight,
            time: req.body.time,
            userId: req.user
        })
        const dataToSave = await weightData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Current Weight - current based on createdAt date
router.get('/getcurrentweight', auth, async (req, res) => {
    try{
        const weightData = await WeightModel.find({userId: req.user});
        const weightArray = weightData.sort((a, b) => b.createdAt - a.createdAt)
        const currentWeight = weightArray[0]
        res.json(currentWeight)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
