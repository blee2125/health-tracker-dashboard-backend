const express = require('express');
const router = express.Router()

module.exports = router;

const usdaApiString = process.env.USDA_URL

// USDA Food Central Api
router.get('/usda-api', async (req, res) => {
    try{
        //console.log(req.query)

        const searchResults = await fetch(usdaApiString+'pageSize='+req.query.pageSize+'&query='+req.query.query)
        const apiResponseJson = await searchResults.json()
        res.json(apiResponseJson)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Api Ninja - Nutrition
router.get('/api-ninja-nutrition', async (req, res) => {
    try{
        //console.log("api-ninja-nutrition", req.query)
        const apiNinjaURL = "https://api.api-ninjas.com/v1/nutrition?query="

        const searchResults = await fetch(
            apiNinjaURL + req.query.search,
            {
                method: "GET",
                headers: {
                    "X-Api-Key": process.env.API_NINJA_KEY,
                    "Content-Type": "application/json"
                }
            }
        )
        const apiResponseJson = await searchResults.json()
        res.json(apiResponseJson)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
