const express = require('express');
const router = express.Router()
const FoodModel = require('../models/food');
const auth = require("../middleware/auth");

module.exports = router;

//Post Method
router.post('/post', auth, async (req, res) => {
    try{
        const foodData = new FoodModel({
            name: req.body.name,
            amount: req.body.amount,
            calories: req.body.calories,
            carbsg: req.body.carbsg,
            fatg: req.body.fatg,
            proteing: req.body.proteing,
            meal: req.body.meal,
            userId: req.user
        })
        const dataToSave = await foodData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', auth, async (req, res) => {
    try{
        const foodData = await FoodModel.findById(req.params.id);
        const foodIdSearch = foodData.filter(food => food.userId === req.user)
        res.json(foodIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method - not working with auth yet
router.get('/searchByDate', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const foodData = await FoodModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const foodIdSearch = foodData.filter(f => f.userId === req.user)
        res.json(foodIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (time property) Method - not working with auth yet
router.get('/getFoodToday', auth, async (req, res) => {
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const foodData = await FoodModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const foodIdSearch = foodData.filter(f => f.userId === req.user)
        res.json(foodIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', auth, async (req, res) => {
    try{
        const foodData = await FoodModel.find({'userId': req.user});
        res.json(foodData)
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
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const foodData = await FoodModel.findByIdAndDelete(id)
        res.send(`Document with ${foodData._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete all for user
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const foodData = await FoodModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL FOOD DATA DELETED - Total: ${foodData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
