const express = require("express");

// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

const stockedRouter = require("./routers/stocking");

const app = express();

app.use("/", stockedRouter);

app.use(express.json());

module.exports = app;
