const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
require('express-ws')(app)
const mongoose = require('mongoose')
const router = require('./routes')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, "env", "dev.env") })


const PORT = process.env.PORT || 4000

const server = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    
    app.use(cors({
        credentials: true,
        origin: "http://localhost:5173"
    }))
    app.use(cookieParser())
    app.use(express.json())
    app.use(router)

    app.listen(PORT, () => console.log(`start server ${PORT}`))
}

server()