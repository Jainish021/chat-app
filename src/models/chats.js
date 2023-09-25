const mongoose = require("mongoose")

const chatsSchema = mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    messages: [{
        message: {
            type: String,
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        seen: {
            type: Boolean,
            required: true,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }]
}, {
    timestamps: true
})

const Chats = mongoose.model('Chats', chatsSchema)

module.exports = Chats