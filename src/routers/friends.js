const express = require("express")
const User = require("../models/user")
const Friends = require("../models/friends")
const auth = require("../middleware/auth")
const { model } = require("mongoose")
const router = new express.Router()

router.post('/friends/addFriend', auth, async (req, res) => {
    const friendId = req.body.friendId
    try {
        console.log(req.user._id)
        console.log(friendId)
        const friendList = Friends.where({ userId: req.user._id }).findOne()
        console.log(friendList.userId)
        friendList.friends = friendList.friends ? friendList.friends.concat({ friendId }) : friendList.friends.concat({ friendId })

        console.log(friendList.friends)
        await friendList.save()
        console.log(friendList)
        res.status(200).send({ error: "User added successfully" })
    } catch (e) {
        res.status(400).send({ error: "Failed to add the user" })
    }
})

router.post('/friends/findFriend', auth, async (req, res) => {
    const searchQuery = req.body.searchQuery

    try {
        const matches = await User.find({
            $and: [
                {
                    $or: [
                        { email: { $regex: searchQuery, $options: 'i' } },
                        { username: { $regex: searchQuery, $options: 'i' } },
                    ],
                },
                {
                    _id: { $ne: req.user._id },
                },
            ],
        },
            { _id: 1, email: 1, username: 1, avatar: 1 }
        )

        res.status(200).send(matches)
    } catch (e) {
        res.status(400).send({ error: "Something went wrong. Please try again." })
    }
})

module.exports = router