const express = require('express');
const router = express.Router()
const SettingsModel = require('../models/settings');

module.exports = router;

const auth = require("../middleware/auth");

//post/create settings
router.post('/post', auth, async (req, res) => {
    const userId = req.user;
    try{
        const checkForSettings = await SettingsModel.find({'userId': userId});
        if (checkForSettings.length === 0) {
            const settingsData = new SettingsModel({
                collectExerciseData: req.body.collectExerciseData,
                collectFoodData: req.body.collectFoodData,
                collectWaterData: req.body.collectWaterData,
                collectWeightData: req.body.collectWeightData,
                userId: req.user
            })
            const dataToSave = await settingsData.save();
            res.status(200).json(dataToSave)
        } else {
            res.status(500).json({message: 'already exists'})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get settings
router.get('/get', auth, async (req, res) => {
    try{
        const userId = req.user;
        const checkForSettings = await SettingsModel.find({'userId': userId});
        if (checkForSettings.length === 0) {
            const settingsData = new SettingsModel({
                userId: req.user
            })
            const dataToSave = await settingsData.save();
            res.status(200).json(dataToSave)
        } else {
            res.json(checkForSettings)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//update settings
router.patch('/update', auth, async (req, res) => {
    try {
        const userId = req.user;
        const updatedData = req.body;
        const checkForSettings = await SettingsModel.find({'userId': userId});
        if (checkForSettings.length === 0) {
            const settingsData = new SettingsModel(updatedData)
            const dataToSave = await settingsData.save();
            res.status(200).json(dataToSave)
        } else {
            const result = await SettingsModel.updateOne({userId: userId}, {$set: updatedData});
            const settingsData = await SettingsModel.find({'userId': userId});
            res.send(settingsData)
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//delete settings by userId
router.delete('/delete', auth, async (req, res) => {
    try {
        const userId = req.user;
        const settingsData = await SettingsModel.deleteOne({'userId': req.user})
        res.send(`Settings deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})