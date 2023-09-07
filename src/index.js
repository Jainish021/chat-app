const mongoose = require("./db/mongoose")
const { server } = require("./app")
// const userRouter = require("./routers/user")

const port = process.env.PORT

server.listen(port, () => {
    console.log("Server is up and listening on port: " + port)
})
