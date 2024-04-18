const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { dbConnect } = require('./config/dbconnect')
const initRoutes = require('./routers')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

dbConnect()
initRoutes(app)

const port = process.env.PORT || 7777
app.listen(port, () => {
    console.log('Server running on the port: '+ port)
})

