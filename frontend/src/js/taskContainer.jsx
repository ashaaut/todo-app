import { useState,useEffect } from "react";
import fetchData from "./useFetch.js";
import Task from "./tasks";
const fetchURL = "http://localhost:8888";

function TaskContainer(props) {
  const { title, id } = props;
  const [tasks,setTasks]=useState([])
  const [newTask,setNewTask]=useState("")

  useEffect(() => {
    fetchData(`${fetchURL}/todo-list/${id}/tasks`).then((data) => setTasks(data));
  }, []);
  
  const pendingTasks = tasks.filter((task) => {
    return task.completed == false;
  });

  const completedTasks = tasks.filter((task) => {
    return task.completed == true;
  });

  console.log(id,pendingTasks);
  // console.log(completedTasks);

  function deleteTask(taskId) {
    fetch(`${fetchURL}/tasks/${taskId}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => setTasks(tasks.filter(task=>{return task.id !=data.id})));
  }


  function markDoneOrUndo(taskId) {
    const parameters = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}/tasks/${taskId}/update-status`, parameters)
      .then((res) => res.json())
      .then((data) => setTasks(tasks.map(task=> {if(task["id"]==data["id"]){
        task["completed"] = !task["completed"]
     } return task})));
  }

  function addTask() {
    const parameters = {
      method: "POST",
      body: JSON.stringify({
        title: newTask,
        todoListId:id ,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}/tasks`, parameters)
      .then((res) => res.json())
      .then((data) => setTasks([...tasks,data]));
  }



  return (
    <div>
      <h1>{title}</h1>
      <div>
        <input type="text" onChange={(e)=>setNewTask(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <h5>Pending Tasks</h5>
        <Task
          tasks={pendingTasks}
          actions={[
            { title: "done", onClick: markDoneOrUndo },
            { title: "delete", onClick: deleteTask },
          ]}
        />
      </div>
      <div>
        <h5>Completed Tasks</h5>
        <Task
          tasks={completedTasks}
          actions={[
            { title: "undo", onClick: markDoneOrUndo },
            { title: "delete", onClick: deleteTask },
          ]}
        />
      </div>
    </div>
  );
}

export default TaskContainer;
