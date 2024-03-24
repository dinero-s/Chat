const express = require('express')
const router = express.Router()
const userService = require('../service/user')
const userValidMiddleware = require('../middleware/userValidMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userValidMiddleware, userService.registration)
router.post('/authorization', userService.authorization)
router.get('/', authMiddleware, userService.user)
router.get('/logout', authMiddleware, userService.logout)


module.exports = router