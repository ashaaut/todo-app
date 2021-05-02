const http = require('http')
const express = require('express')
const fs = require("fs")
var cors = require('cors')
const PORT = 8888
const data = require("./data.json")
const filePath = "./data.json"

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.set('port', PORT)
const server = http.Server(app)
server.listen(PORT)
console.log(`Server started at port ${PORT}`)

app.get('/', (req, res) => {
    res.send("WELCOME TO APP")
})

app.get('/todo/:idx',(req, res) => {
    const {idx} = req.params
    res.json(data["lists"][idx])
})
// app.get('/todo/:idx', (req, res) => {
//     const {idx} = req.params
//     res.json(data["lists"][idx])
// })

// app.post('/todo/:idx/update-title', (req, res) => {
//     const {idx} = req.params
//     const { newTitle } = req.body
//     const {lists} = data;
//     const listToBeUpdated = lists[idx]
//     listToBeUpdated.title = newTitle
//     lists[idx] = listToBeUpdated
//     const newData = {...data, lists}

//     fs.writeFile(filePath, JSON.stringify(newData),(err) => {
//         if (err) throw err;
//         res.send({"updateTitle": true})
//     });
// })

//add todo

app.post('/todo/:idx/add-task',(req,res)=>{
    const {newTask,taskStatus}=req.body;
    const {idx} = req.params
    const newData=data
    newData["lists"][idx][taskStatus].push(newTask);
    fs.writeFile(filePath,JSON.stringify(newData),(err)=>{
        if (err) throw err;
        res.send(newData);
    })
})

app.post('/todo/:idx/:taskId/update-status',(req,res)=>{
    const {newTask,taskStatusFrom,taskStatusTo}=req.body
    // const {idx}=req.params
    const newData=data
    newData["lists"][req.params.idx][taskStatusTo].push(newTask)
    newData["lists"][req.params.idx][taskStatusFrom].splice(req.params.taskid,1)
    fs.writeFile(filePath,JSON.stringify(newData),(err)=>{
        if (err) throw err;
        res.send(newData);
    })
})

app.delete('/todo/:idx/:status/:taskId',(req,res)=>{
    const newData=data;
    // const {idx,status}=req.params;
    newData['lists'][req.params.idx][req.params.status].splice(req.params.taskid,1);
    fs.writeFile(filePath,JSON.stringify(newData),(err)=>{
        if (err) throw err;
        res.send(newData);
    })
})
