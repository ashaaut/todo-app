const express = require('express')
const router = express.Router()
const data=require('./../data.json');
const filePath = "./data.json"
const fs=require('fs');
router.get('/', (req, res) => {
    res.json(data["tasks"]);
})

router.post("/",(req,res)=>{
    const {title,todoListId}=req.body;
    const tasks=data["tasks"]
    const lastTaskId=data["lastTaskId"];
    const newTaskId = lastTaskId+1

    tasks.push({title,id:newTaskId,todoListId,completed:false})
    const updatedData = {...data,tasks,lastTaskId:newTaskId}

    fs.writeFile(filePath,JSON.stringify(updatedData,null,3),(err)=>{
        if (err) throw err;
        res.send({title,id:newTaskId,todoListId,completed:false});
    })
})

router.post('/:id/update-status',(req,res)=>{
    const {id}=req.params
    const tasks=data["tasks"].map(task=>{
        if(task["id"]==id){
           task["completed"] = !task["completed"]
        }
        return task
    })
    const updatedData={...data,tasks};
    fs.writeFile(filePath,JSON.stringify(updatedData,null,3),(err)=>{
        if (err) throw err;
        res.send({id});
    })
})
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const tasks=data["tasks"].filter(list=>{
        return list["id"]==id
    })
    res.json(tasks[0])
})

router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const remainingTaskLists=data["tasks"].filter(task=>{
        return task["id"]!=id
    })
    const updatedData={...data,tasks:remainingTaskLists}
    fs.writeFile(filePath,JSON.stringify(updatedData,null,3),(err)=>{
        if (err) throw err;
        res.send({id});
    })
})
module.exports=router;