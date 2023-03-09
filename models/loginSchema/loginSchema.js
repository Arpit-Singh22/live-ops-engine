const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true }
)

const Player = mongoose.model("playerCredentials", loginSchema)

module.exports = Player