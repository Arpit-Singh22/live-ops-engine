const express = require("express")
const { playerRegisterCtrl,
    playerLoginCtrl } = require("../controllers/loginController")

const playerRouter = express.Router()


// player registration
playerRouter.post('/register', playerRegisterCtrl)

// player login
playerRouter.post('/login', playerLoginCtrl)

module.exports = playerRouter 