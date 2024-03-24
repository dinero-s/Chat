const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const modelToken = require('../models/tokenModel')

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies
   
    try {
        if (!token) {   
            return res.status(StatusCodes.UNAUTHORIZED).send()
        }
        const user = jwt.verify(token, process.env.JWT_SECRET)

        const bdToken = await modelToken.findOne({ idUser: user.id })

        if (token == bdToken.token) {
            req.user = user
            return next()
        }
        return res.status(StatusCodes.UNAUTHORIZED).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }

}

module.exports = authMiddleware