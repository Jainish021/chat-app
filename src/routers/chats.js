const express = require("express")
const User = require("../models/user")
const Friends = require("../models/friends")
const Chats = require('../models/chats')
const auth = require("../middleware/auth")
const { model, mongo, default: mongoose } = require("mongoose")
const router = new express.Router()

router.post('/chats/postMessage', auth, async (req, res) => {
    const receiverId = req.body.receiverId
    const senderId = req.user._id.toString()
    let chatId = ""
    if (receiverId < senderId) {
        chatId = receiverId + senderId
    } else {
        chatId = senderId + receiverId
    }

    if (!chatId) {
        res.status(200).send({ error: "Could not deliver message." })
    }

    const messageInformation = {
        message: req.body.message,
        senderId: senderId
    }

    try {
        const chat = await Chats.findOne({ chatId: chatId })
        chat.messages = chat.messages.concat(messageInformation)
        await chat.save()
        res.status(200).send({ success: "Message received" })
    } catch (e) {
        res.status(200).send({ error: "Failed to send the message" })
    }
})

router.post('/chats/getMessages', auth, async (req, res) => {
    const receiverId = req.body.receiverId
    const senderId = req.user._id.toString()
    let chatId = ""
    if (receiverId < senderId) {
        chatId = receiverId + senderId
    } else {
        chatId = senderId + receiverId
    }

    if (!chatId) {
        res.status(200).send({ error: "Could not fetch messages." })
    }

    try {
        const messages = await Chats.findOne({ chatId: chatId }).select({ messages: { $slice: -100 } })
        res.status(200).send(messages.messages)
    } catch (e) {
        res.status(200).send({ error: "Could not fetch messages." })
    }
})

module.exports = router