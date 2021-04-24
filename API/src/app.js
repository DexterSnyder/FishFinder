const express = require('express')

// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

const stockedRouter = require('./routers/stocking')
const userRouter = require('./routers/user')

const app = express()

app.use('/', stockedRouter)
app.use('/user', userRouter)

app.use(express.json())

module.exports = app
