const mongoose = require("./db/mongoose")
const socketio = require("socket.io")
const { server } = require("./app")
const { setupSocketIO } = require('./routers/socket')

// if (process.env.NODE_ENV !== "production") {
//     // io.origins('http://localhost:3000')
//     socketio = require("socket.io")(server, {
//         cors: {
//             origin: 'http://localhost:3000',
//             // methods: ["GET", "POST"],
//             // allowedHeaders: ["my-custom-header"],
//             credentials: true
//         }
//     })
// } else {

// }

const port = process.env.PORT
const io = socketio(server)

server.listen(port, () => {
    console.log("Server is up and listening on port: " + port)
})

setupSocketIO(io)