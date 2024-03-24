const Room = require("../../class/room")
const allRooms = {}
const roomModel = require('../../models/roomModel')


const getRoom = (idRoom) => allRooms[idRoom]

const deleteUserRoom =(idRoom, username) => {
    const room = getRoom(idRoom)
    room.deleteUser(username,  ()=> {

    }, {isBan: true})
}

const chatRoomWS = async (ws, req) => {
    const { id } = req.params
    const roomDB = await roomModel.findById(id)
    if(!roomDB) {
        return ws.close()
    }
    const user = req.user


    let room = allRooms[id];
    if (!room) {
        room = new Room(id)
        allRooms[id] = room
    }
    if(room.userBan?.includes(user.username)){
        return ws.close()
    }
    room.addUser(user.username, ws, ()=>{
        room.sendAllMessage(JSON.stringify({
            type: "userList",
            data: {
                userList: room.userList
            }
        }))
    })


    ws.on("message", (msg) => {
        try {
            const data = JSON.parse(msg)
            if(data.type === 'private' ) {
                console.log(msg)
                const message = JSON.stringify({
                    type: "message",
                    data: {
                        user: user.username,
                        message: data.data.message,
                        private: true
                    }
                })
                ws.send(message)
                room.sendPrivate(message, data.data.user)

            } else if(data.type === 'all') {
                room.sendAllMessage(JSON.stringify({
                    type: "message",
                    data: {
                        user: user.username,
                        message: data.message
                    }
                }))
            }

        }catch (e) {

        }


    })

    ws.on("close", ()=> {

            room.deleteUser(user.username, ()=>{
                room.sendAllMessage(JSON.stringify({
                    type: "userList",
                    data: {
                        userList: room.userList
                    }
                }))
            })


    })
}


module.exports = {
    chatRoomWS,
    getRoom,
    deleteUserRoom
}