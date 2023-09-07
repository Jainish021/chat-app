const path = require("path")
const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const cors = require("cors")
const mongoose = require("./db/mongoose")
const userRouter = require("./routers/user")
const friendsRouter = require("./routers/friends")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(userRouter)
app.use(friendsRouter)

if (process.env.NODE_ENV !== "production") {
    app.use(cors())
}

app.use(express.static(path.join(__dirname, "../public")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.js"))
    })
}

module.exports = { app, io, server }