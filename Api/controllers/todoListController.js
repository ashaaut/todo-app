const express = require('express')
const router = express.Router()
const data=require('./../data.json');
const filePath = "./data.json"
const fs=require('fs');
router.get('/', (req, res) => {
    res.json(data["todoLists"]);
})

router.post("/",(req,res)=>{
    const {title}=req.body;
    const todoLists=data["todoLists"]
    const id=data["lastTodoListId"]+1
    todoLists.push({title,id})

    const updatedData = {...data,todoLists,lastTodoListId:id}
    fs.writeFile(filePath,JSON.stringify(updatedData,null,3),(err)=>{
        if (err) throw err;
        res.send({added:{title,id}});
    })
})

router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const todoList=data["todoLists"].filter(list=>{
        return list["id"]==id
    })
    res.json(todoList[0])
})

router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const remainingTodoLists=data["todoLists"].filter(list=>{
        return list["id"]!=id
    })
    const updatedData={...data,todoLists:remainingTodoLists}
    fs.writeFile(filePath,JSON.stringify(updatedData,null,3),(err)=>{
        if (err) throw err;
        res.send({deleted:{id}});
    })
})

router.get("/:id/tasks",(req,res)=>{
    const {id}=req.params;
    const tasks=data["tasks"].filter(list=>{
        return list["todoListId"]==id
    })
    res.json(tasks)
})

module.exports=router;