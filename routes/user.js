const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = router;

const User = require('../models/user')

const auth = require("../middleware/auth");

// Register
router.post('/register', async (req, res) => {

    const user = req.body

    const usernameExists = await User.findOne({username: user.username})
    const emailExists = await User.findOne({email: user.email})

    if (usernameExists || emailExists) {
        res.json({message: "Username or email already being used"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({message: "Account created"})
    }
})

// Sign in
router.post('/login', async (req, res) => {

    const userSignIn = req.body
    //console.log(userSignIn)
    User.findOne({username: userSignIn.username})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid username"})
            }
            bcrypt.compare(userSignIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username,
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: '7 days'},
                            (err, token) => {
                                if (err) return res.json({message: err})
                                return res.json({
                                    message: "Sign in - Successful",
                                    token: token,
                                    id: dbUser._id,
                                    username: dbUser.username,
                                    email: dbUser.email
                                })
                            }
                        )
                    } else {
                        return res.json({message: "Invalid password"})
                    }
                })
        })
})

//Get by username
router.get('/:username', auth, async (req, res) => {
    console.log(req.params)
    try{
        const user = await User.findOne(req.params);
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

