const express = require('express');
const router = express.Router()
const FoodModel = require('../models/food');

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
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
