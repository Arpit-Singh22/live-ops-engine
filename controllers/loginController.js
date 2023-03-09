const Player = require("../models/loginSchema/loginSchema")
const bcrypt = require('bcryptjs')
const genToken = require("../utils/genToken")
const playerRegisterCtrl = async (req, res) => {
    const { email, password } = req.body
    try {
        const player = await Player.findOne({ email })
        if (player) {
            return res.status(200).json({
                status: 'success',
                data: 'player already registered'
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const playerReg = await Player.create({
            email,
            password: hashedPassword
        })
        res.status(200).json({
            status: 'Success',
            data: playerReg
        })


    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const playerLoginCtrl = async (req, res) => {
    const { email, password } = req.body
    try {
        const player = await Player.findOne({ email });
        // verify password
        const isPasswordMatched = await bcrypt.compare(password, player.password)
        // console.log(player);
        if (!isPasswordMatched) {
            return res.status(500).json("Invalid login Credentials")
        }

        res.status(200).json({
            status: 'success',
            message: "logged in successfully",
            email, email,
            token: genToken(player._id)
        })
    }
    catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    playerRegisterCtrl,
    playerLoginCtrl
}