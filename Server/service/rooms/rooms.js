const {StatusCodes} = require('http-status-codes')
const roomModel = require('../../models/roomModel')
const roomsModel = require('../../models/roomModel')
const userRoles = require('../../const/userRoles')
const {deleteUserRoom} = require("./rooms-ws");

const createRoom = async (req, res) => {
  const {roomName} = req.body
  const user = req.user
  try {
    const createNewRoom = new roomsModel({roomName, idUser: user.id})

    const room = await createNewRoom.save()
      .catch((oshibochka) => {
        if (oshibochka.code === 11000) {
          res.status(StatusCodes.FORBIDDEN).send()
          return false
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        return false
      })
    if (room) {
      return res.send(room)
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }

}

const deleteRoom = async (req, res) => {
  const {roomID} = req.params
  try {
    const user = req.user
    const room = await roomModel.findById(roomID)
    const roles = [userRoles.ADMIN, userRoles.MODERATOR]
    if (user.id == room.idUser || roles.includes(user.role)) {
      await roomsModel.deleteOne({_id: roomID})
      return res.send()
    }
    res.status(StatusCodes.FORBIDDEN).send()

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }

}

const getRoomByRoomName = async (req, res) => {
  const {roomName} = req.params

  try {

    const room = await roomsModel.findOne({roomName})
    res.send(room)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}

const getUserRooms = async (req, res) => {
  const user = req.user
  try {
    const allRooms = await roomsModel.find({idUser: user.id})
    res.send(allRooms)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}

const getAllRooms = async (req, res) => {
  try {
    res.send(await roomsModel.find())
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}

const deleteUser = async (req, res) => {
  const {room, user} = req.params
  const {id} = req.user
  try{
    const roomDB = await roomModel.findById(room)
    if(roomDB.idUser == id){
      deleteUserRoom(room, user)
      res.send()
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send()
    }
  } catch(e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
  
  
  
}

module.exports = {
  createRoom,
  deleteRoom,
  getRoomByRoomName,
  getUserRooms,
  getAllRooms,
  deleteUser
}