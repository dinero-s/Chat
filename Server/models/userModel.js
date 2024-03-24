const {Schema, model} = require('mongoose')
const userRoles = require('../const/userRoles')

const userSchema = new Schema ({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, require: true, default: userRoles.USER}
})

module.exports = model("User", userSchema)
