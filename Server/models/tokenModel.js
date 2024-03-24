const { Schema, model } = require('mongoose')

const modelToken = new Schema({
    token: {type: String, require: true, unique: true},
    idUser: {type: String, require: true, unique: true}
})

module.exports = model("token", modelToken)