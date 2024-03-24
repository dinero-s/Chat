const validator = require('validator')
const { StatusCodes } = require('http-status-codes')


const userValidationMiddleware = async (req, res, next) => {
    const { username, password } = req.body

    if (username &&
        password &&
        validator.isAlphanumeric(username) &&
        validator.isAlphanumeric(password) &&
        validator.isLength(username, { min: 4, max: 12 }) &&
        validator.isLength(password, { min: 6, max: 32 })
    ) {
        next()
        return
    }
    res.status(StatusCodes.BAD_REQUEST).send()
}

module.exports = userValidationMiddleware