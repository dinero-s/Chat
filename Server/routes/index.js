const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const roomsRouter = require('./rooms')

router.use('/user', userRouter)
router.use('/rooms', roomsRouter)

module.exports = router