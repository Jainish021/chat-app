const express = require("express")
const User = require("../models/user")
const Friends = require("../models/friends")
const Chats = require("../models/chats")
const auth = require("../middleware/auth")
const { model, mongo, default: mongoose } = require("mongoose")
const router = new express.Router()

router.post('/friends/addFriend', auth, async (req, res) => {
    const friendId = req.body.friendId.toString()

    let chatId = ""
    if (friendId < req.user._id.toString()) {
        chatId = friendId + req.user._id.toString()
    } else {
        chatId = req.user._id.toString() + friendId
    }

    const chat = new Chats({ chatId: chatId })

    try {
        const friend = await Friends.findOne({ 'userId': req.user._id, 'friends.friend': friendId })

        if (friend) {
            res.status(200).send({ error: "User is already added." })
            return
        }

        const friendList = await Friends.findOne({ userId: req.user._id.toString() })
        friendList.friends = friendList.friends.concat({ friend: friendId })
        await friendList.save()
        await chat.save()

        res.status(200).send({ error: "User added successfully" })

    } catch (e) {
        res.status(200).send({ error: "Failed to add the user" })
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

router.get('/friends', auth, async (req, res) => {
    try {
        const friendIds = await Friends.aggregate([
            {
                $match: { userId: req.user._id },
            },
            {
                $unwind: '$friends',
            },
            {
                $project: {
                    friend: '$friends.friend',
                    _id: 0,
                },
            },
            {
                $group: {
                    _id: null,
                    friendIds: { $push: '$friend' },
                },
            }
        ])

        if (friendIds.length === 0) {
            res.status(200).send({})
            return
        }

        const friendUsers = await User.find({ _id: { $in: friendIds[0].friendIds } }).select('-password -tokens -createdAt -updatedAt -__v')
        res.status(200).send(friendUsers)

    } catch (e) {
        res.status(200).send({ error: "Something went wrong! Could not fetch data." })
    }
})


module.exports = router