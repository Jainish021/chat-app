// import { server } from '../app'

// const io = socketio(server)

// const socketPool = {}

// io.on('connection', (socket) => {
//     // Attach the custom ID to the socket object
//     console.log("Listening")
//     socket.on('message', () => {
//         console.log("Hello")
//     })
//     // socket.customId = customId

//     // // Store the socket in the socket pool
//     // socketPool[customId] = socket

//     // const pingInterval = setInterval(() => {
//     //     socket.emit('ping')
//     // }, 30000)

//     // // Listen for pong responses from the client
//     // socket.on('pong', () => {
//     //     console.log(`Received pong from client: ${socket.id}`)
//     //     // You can add custom logic here if needed
//     // })

//     // // Handle other socket events, such as messages
//     // socket.on('message', (data) => {
//     //     // Your message handling logic here
//     // })

//     // // Handle client disconnects (whether triggered by the client or automatically)
//     // socket.on('disconnect', () => {
//     //     console.log(`Client disconnected: ${socket.id}`)
//     //     // Clear the ping interval when the client disconnects

//     //     clearInterval(pingInterval)
//     // })
// })



const setupSocketIO = (io) => {
    io.on('connection', (socket) => {
        console.log(`A client connected: ${socket.id}`)

        // Add your Socket.io event listeners and logic here

        socket.on('message', (data) => {
            console.log(`Received message from client: ${data}`)

            // Broadcast the message to all connected clients
            // io.emit('message', data)
        })

        socket.on('disconnect', () => {
            console.log(`A client disconnected: ${socket.id}`)
        })
    })
}

module.exports = { setupSocketIO }