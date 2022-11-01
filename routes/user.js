const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require("../middleware/auth");

module.exports = router;

const User = require('../models/user')

//Get by username
router.get('/:username', auth, async (req, res) => {
    try{
        const user = await User.findOne(req.params);
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

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
            password: user.password,
            height: user.height,
            birthday: user.birthday
        })
        dbUser.save()
        res.json({message: "Account created"})
    }
})

// Sign in
router.post('/login', async (req, res) => {
    const userSignIn = req.body
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
                                    email: dbUser.email,
                                    height: dbUser.height,
                                    birthday: dbUser.birthday,
                                    createdAt: dbUser.createdAt
                                })
                            }
                        )
                    } else {
                        return res.json({message: "Invalid password"})
                    }
                })
        })
})

// Reset Password
router.put('/changepassword', auth, async (req, res) => {
    const userSignIn = req.body
    const newPassword = await bcrypt.hash(req.body.newPassword, 10)
    User.findById(req.user)
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid user"})
            }
            bcrypt.compare(userSignIn.currentPassword, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        dbUser.password = newPassword
                        dbUser.save()
                        res.json({message: "Password updated"})
                    } else {
                        return res.json({message: "Invalid password"})
                    }
                })
        })
})

// Add height to user
router.patch('/addheight', auth, async (req, res) => {
    User.findById(req.user)
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid user"})
            }
            if (dbUser) {
                dbUser.height = req.body.height
                dbUser.save()
                res.json({user: dbUser,message: "Height Added"})
            } else {
                return res.json({message: "Error adding height"})
            }
        })
})

// Add birthday to user
router.patch('/addbirthday', auth, async (req, res) => {
    User.findById(req.user)
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid user"})
            }
            if (dbUser) {
                dbUser.birthday = req.body.birthday
                dbUser.save()
                res.json({user: dbUser,message: "Birthday Added"})
            } else {
                return res.json({message: "Error adding birthday"})
            }
        })
})

// delete account
router.delete('/delete', auth, async (req, res) => {
    try {
        const id = req.user;
        const userData = await User.findByIdAndDelete(id)
        res.send(`Account deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
