const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")
const { model } = require("mongoose")
const router = new express.Router()

// router.post('friends/addFriend', auth, async (req, res) => {
//     try{

//     }
// })

router.get('/friends/findFriend', auth, async (req, res) => {
    const searchQuery = req.body.searchQuery
    console.log(searchQuery)
    try {
        const matches = await User.find({
            $or: [
                { email: { $regex: searchQuery, $options: 'i' } },
                { username: { $regex: searchQuery, $options: 'i' } },
            ],
        },
            { _id: 1, email: 1, username: 1 }
        )
        console.log(matches)
    } catch (e) {

    }
})

module.exports = router