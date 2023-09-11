const mongoose = require("mongoose")
const User = require("./user")

const friendsSchema = mongoose.Schema({
    friends: [{
        friend: {
            type: String
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

const Friends = mongoose.model('Friends', friendsSchema)

module.exports = Friends