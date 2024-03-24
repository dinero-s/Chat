const express = require('express')
const router = express.Router()
const roomService = require('../service/rooms')
const authMiddleware = require('../middleware/authMiddleware')
const roomNameValidationMiddleware = require('../middleware/roomNameValidMiddleware')

router.use(authMiddleware)
router.post('/', roomNameValidationMiddleware, roomService.rooms.createRoom)
router.delete('/delete/:roomID', roomService.rooms.deleteRoom)
router.get('/name/:roomName', roomService.rooms.getRoomByRoomName)
router.get('/roomsList', roomService.rooms.getUserRooms)
router.get('/allRooms', roomService.rooms.getAllRooms)
router.ws('/room/:id', roomService.roomsWS.chatRoomWS)
router.delete('/deleteUser/:room/:user', roomService.rooms.deleteUser)



module.exports = router