import React, { useEffect, useState } from "react";
import TaskContainer from "./taskContainer.jsx";
const fetchURL = "http://localhost:8888/todo";

function Todo() {
  const [newTask, setNewTask] = useState();
  const [todoData, setTodoData] = useState({});
  const [selectTodoListId, setSelectTodoListId] = useState(0);
  function getTodoData() {
    return fetch(`${fetchURL}/${selectTodoListId}`).then((res) => res.json());
  }

  useEffect(() => {
    getTodoData().then((data) => setTodoData(data));
  }, []);

  function addTask() {
    const parameters = {
      method: "POST",
      body: JSON.stringify({
        newTask: newTask,
        taskStatus: "pending",
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}/${selectTodoListId}/add-task`, parameters)
      .then((res) => res.json())
      .then((data) => setTodoData(data["lists"][selectTodoListId]));
  }

  function markDoneOrUndo(taskId, status) {
    const parameters = {
      method: "POST",
      body: JSON.stringify({
        newTask: todoData[status][taskId],
        taskStatusFrom: status,
        taskStatusTo: status=="pending"?"completed":"pending",
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}/${selectTodoListId}/${taskId}/update-status`, parameters)
      .then((res) => res.json())
      .then((data) => setTodoData(data["lists"][selectTodoListId]));
  }

  // function markUndo(id, status) {
  //   const parameters = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       newTask: todoData[status][id],
  //       taskStatusFrom: status,
  //       taskStatusTo: "pending",
  //     }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   };
  //   fetch(`${fetchURL}/${selectTodoListId}/done-undo`, parameters)
  //     .then((res) => res.json())
  //     .then((data) => setTodoData(data["lists"][selectTodoListId]));
  // }

  function deleteTask(taskId, status) {
    fetch(`${fetchURL}/${selectTodoListId}/${status}/${taskId}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => setTodoData(data["lists"][selectTodoListId]));
  }

  return (
    <div>
      <h1> Todo </h1>
      <div>
        <input onChange={(e) => setNewTask(e.target.value)} type="text" />
        <button onClick={addTask}> Add Task </button>
      </div>
      <div>
        <h1> Added Tasks </h1>
        {todoData ? (
          <TaskContainer
            tasks={todoData["pending"]}
            status="pending"
            actions={[
              { title: "done", onClick: markDoneOrUndo },
              { title: "delete", onClick: deleteTask },
            ]}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <h1> CompletedTasks </h1>
        {todoData ? (
          <TaskContainer
            tasks={todoData["completed"]}
            status="completed"
            actions={[
              { title: "undo", onClick: markDoneOrUndo },
              { title: "delete", onClick: deleteTask },
            ]}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Todo;
