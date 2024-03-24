const { Schema, model } = require('mongoose')

const modelRoom = new Schema({
    roomName: {type: String, require: true, unique: true},
    online: {type: Boolean, default: false},
    idUser: {type: String, require: true}
})

module.exports = model("room", modelRoom)