const { StatusCodes } = require("http-status-codes")
const validator = require('validator')

const roomNameValidationMiddleware = async (req, res, next) => {
    const { roomName } = req.body

    try {
        if (roomName &&
            validator.isAlphanumeric(roomName) &&
            validator.isLength(roomName, { min: 4, max: 64 })) {
            next()
            return
        }
        res.status(StatusCodes.BAD_REQUEST).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
}

module.exports = roomNameValidationMiddleware