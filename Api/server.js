const http = require('http')
const express = require('express')
const todoListController=require('./controllers/todoListController')
const taskController=require('./controllers/taskController')
var cors = require('cors')
const PORT = 8888

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/todo-list",todoListController)
app.use('/tasks',taskController)
app.set('port', PORT)
const server = http.Server(app)
server.listen(PORT)
console.log(`Server started at port ${PORT}`)
