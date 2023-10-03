const path = require("path")
const express = require("express")
const http = require("http")
const cors = require("cors")
const mongoose = require("./db/mongoose")
const userRouter = require("./routers/user")
const friendsRouter = require("./routers/friends")
const chatsRouter = require("./routers/chats")

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(friendsRouter)
app.use(chatsRouter)

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: 'http://localhost:3000' }))
}

app.use(express.static(path.join(__dirname, "../public")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.js"))
    })
}

const server = http.createServer(app)

module.exports = { app, server }