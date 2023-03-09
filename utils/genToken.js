const jwt = require("jsonwebtoken")
require("dotenv").config()

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '10d' })
}

module.exports = genToken