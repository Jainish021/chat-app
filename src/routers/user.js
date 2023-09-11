const express = require("express")
const multer = require("multer")
const sharp = require("sharp")
const User = require("../models/user")
const Friends = require("../models/friends")
const auth = require("../middleware/auth")
const { sendWelcomeEmail, sendCancellationEmail } = require("../emails/account")
const router = new express.Router()

router.post('/users', async (req, res) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    if (req.body.password !== req.body.password2) {
        res.status(400).send({ error: "Passwords do not match." })
    } else if (req.body.password.includes(" ")) {
        res.status(400).send({ error: "Passwords can not contain space." })
    } else if (!regEx.test(req.body.email)) {
        res.status(400).send({ error: "Invalid email." })
    }

    const { password2, ...userData } = req.body
    const user = new User(userData)
    const friends = new Friends({ userId: user._id })
    try {
        const token = await user.generateAuthToken()
        user.tokens.token = token
        await user.save()
        await friends.save()
        sendWelcomeEmail(user.email, user.username)
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send({ error: "user already regitered" })
    }
})

router.post('/users/username', async (req, res) => {
    if (req.body.username.includes(" ")) {
        res.status(400).send({ error: "Username cannot contain space." })
    }
    try {
        const username = await User.where({ username: req.body.username }).findOne()
        if (username) {
            res.send({ error: "Username already in use." })
        }
        res.send()
    }
    catch (e) {
        res.send()
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send({ error: "Unable to find user!" })
    }
})


router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        const user = await req.user.save(req.user)

        if (!user) {
            return res.status(404).send()
        }
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await Task.deleteMany({ owner: req.user._id })
        await req.user.deleteOne()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const avatar = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload image in jpg, jpeg or png format"))
        }
        cb(undefined, true)
    }
})


router.post("/users/me/avatar", auth, avatar.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, heigh: 250 }).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send({ avatar: req.user.avatar.toString('base64') })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        // res.set("Content-Type", "image/png")
        res.send(user.avatar.toString('base64'))
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router