class Room {
  constructor(id) {
    this.userList = [];
    this.usersWS = {}
    this.id = id
    this.isOpen = true
    this.userBan = [];
  }

  addUser(username, ws, callback) {
    if (!this.isOpen) {
      ws.close()
    }
    this.userList.push(username)
    this.usersWS[username] = ws
    if (callback) {
      callback()
    }
  }

  sendAllMessage(msg) {
    for (const username in this.usersWS) {
      this.usersWS[username].send(msg)
    }
  }

  sendPrivate(msg, username) {
    if (!this.usersWS.hasOwnProperty(username)) {
      return;
    }
    this.usersWS[username].send(msg)
  }

  deleteUser(username, callback, option) {
    if(option?.isBan){
      this.userBan.push(username)
      console.log(option?.isBan)
    }
    this.usersWS[username]?.close()
      this.userList = this.userList.filter(item => item !== username)
      if (callback) {
        callback()
      }
     delete this.usersWS[username]
  }


  closeRoom() {
    this.isOpen = false
    for (const key in this.usersWS) {
      this.usersWS[key].close()
    }
    delete this
  }
}


module.exports = Room