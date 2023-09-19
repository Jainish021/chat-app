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

friendsSchema.methods.addVirtualToFriends = function () {
    return this.friends.map(friend => {

        const virtualProperty = User.findById(id)
        return {
            ...friend.toObject(),
            virtualProperty,
        }
    })
}

const Friends = mongoose.model('Friends', friendsSchema)

module.exports = Friends