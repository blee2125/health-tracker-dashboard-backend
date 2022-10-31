const express = require('express');
const router = express.Router()
const WaterModel = require('../models/water');

module.exports = router;

const auth = require("../middleware/auth");

//Post Method
router.post('/post', auth, async (req, res) => {
    let searchDate = req.body.date
    try{
        const checkWaterData = await WaterModel.find({'time': { '$regex' : searchDate, '$options' : 'i' }});
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
    if (!req._parsedUrl.query) {
        return
    }
    let searchDate = req._parsedUrl.query
    let searchDate2 = searchDate.split('=')
    let searchDateFinal = searchDate2[1].toString().split('+')
    try{
        const waterData = await WaterModel.find({'time': { '$regex' : `${searchDateFinal[0]} ${searchDateFinal[1]} ${searchDateFinal[2]}`, '$options' : 'i' }});
        const waterIdSearch = waterData.filter(w => w.userId === req.user)
        res.json(waterIdSearch)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date (createdAt property) Method
//(params: ?7+days+GMT) accepts days and timezone (timezone not yet working)
router.get('/getSevenDays', auth, async (req, res) => {
    //console.log(req._parsedUrl.query, req.user)
    try{
        const days = req._parsedUrl.query.split('+')[0]
        //console.log(days)
        // const timezone = req._parsedUrl.query.split('+')[2]
        // console.log(timezone)

        // let offset = new Date()
        // let off2 = offset.getTimezoneOffset()/60
        // console.log(off2, offset)

        let sevenbeforetoday = new Date()
        sevenbeforetoday.setUTCHours(0,0,0,0)
        sevenbeforetoday.setHours(sevenbeforetoday.getHours() + 6) //6 = offset for GMT
        sevenbeforetoday.setDate(sevenbeforetoday.getDate() - (days - 1))
        //console.log(sevenbeforetoday)

        let today = new Date()
        today.setUTCHours(23,59,59,999);
        today.setHours(today.getHours() + 6)
        console.log(today)

        const waterData = await WaterModel.find({'createdAt': {$gte: sevenbeforetoday, $lt: today}});
        const waterIdSearch = waterData.filter(w => w.userId === req.user)
        res.json(waterIdSearch)
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

//Delete all for user
router.delete('/deleteall', auth, async (req, res) => {
    try {
        const waterData = await WaterModel.deleteMany({'userId': req.user})
        console.log('deleted')
        res.send(`ALL WATER DATA DELETED - Total: ${waterData.deletedCount}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})