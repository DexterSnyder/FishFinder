const express = require('express')

require('dotenv').config()

const stockedRouter = require('./routers/stocking')
const userRouter = require('./routers/user')

const app = express()

// Parses json in the body of a request
app.use(express.json())

app.use('/', stockedRouter)
app.use('/user', userRouter)

module.exports = app
