const { StatusCodes } = require('http-status-codes')
const userModel = require('../models/userModel')
const tokenModel = require('../models/tokenModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authorization = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel.findOne({ username })

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send()
        }
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(StatusCodes.BAD_REQUEST).send()
        }
        const payload = {
            username,
            role: user.role,
            id: user._id
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

        const oldToken = await tokenModel.findOne({ idUser: user._id })

        if (oldToken) {
            oldToken.token = token
            await oldToken.save()
        } else {
            const newToken = new tokenModel({ token, idUser: user._id })
            await newToken.save()
        }
        return res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true }).send(payload)

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
}

const registration = async (req, res) => {
    const { username, password } = req.body
    try {
        const oldUser = await userModel.findOne({ username })
        if (oldUser) {
            return res.status(StatusCodes.FORBIDDEN).send()
        }
        const newPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({ username, password: newPassword })
        const user = await newUser.save()
        return res.send({
            username: user.username,
            role: user.role,
            id: user._id
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
}

const user = (req, res) => {
  res.send(req.user)
}

const logout = async (req, res) => {
    const user = req.user
    try {
        res.clearCookie("token")
        await tokenModel.deleteOne({ idUser: user.id })
        res.send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }

}

module.exports = {
    registration,
    authorization,
    user,
    logout
}