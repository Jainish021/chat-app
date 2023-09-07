const mongoose = require("mongoose")
const User = require("./user")

const friendsSchema = mongoose.Schema({
    friends: [{
        friend: {
            type: String,
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})