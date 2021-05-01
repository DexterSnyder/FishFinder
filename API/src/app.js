const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const stockedRouter = require('./routers/stocking.router')
const userRouter = require('./routers/user.router')
const subscriptionRouter = require('./routers/subscription.router')

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('combined'))

// Parses json in the body of a request
app.use(express.json())

app.use('/', stockedRouter)
app.use('/user', userRouter)
app.use('/subscription', subscriptionRouter)

module.exports = app
