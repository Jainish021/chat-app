const validator = require("validator")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL, {})
