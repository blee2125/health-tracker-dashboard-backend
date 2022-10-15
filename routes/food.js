const express = require('express');
const router = express.Router()
const FoodModel = require('../models/food');

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    console.log(req.body)
    try{
        const foodData = new FoodModel({
            foodName: req.body.foodName,
            totalCalories: req.body.totalCalories,
            timeOfConsumption: req.body.timeOfConsumption,
            meal: req.body.meal,
            placeOfConsumption: req.body.placeOfConsumption,
            withWhom: req.body.withWhom,
            activity: req.body.activity,
            mood: req.body.mood,
            hungerLevel: req.body.hungerLevel,
            fullness: req.body.fullness,
            amount: req.body.amount
        })
        const dataToSave = await foodData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const foodData = await FoodModel.findById(req.params.id);
        res.json(foodData)
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
        const foodData = await FoodModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        res.json(foodData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const foodData = await FoodModel.find();
        res.json(foodData)
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

        const result = await FoodModel.findByIdAndUpdate(
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
        const foodData = await FoodModel.findByIdAndDelete(id)
        res.send(`Document with ${foodData._id} glasses has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
