import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fetchData from "./useFetch.js";
import Tasks from "./tasks";
import "./../assets/css/todo.css";
import { useParams } from "react-router";
const fetchURL = "http://localhost:8888";

function TaskContainer(props) {
  const [title, setTitle] = useState("");
  const { id: todoListId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchData(`${fetchURL}/todo-list/${todoListId}/tasks`).then((data) =>
      setTasks(data)
    );
  }, []);
  useEffect(() => {
    fetchData(`${fetchURL}/todo-list/${todoListId}`).then(({ title }) =>
      setTitle(title)
    );
  }, []);

  const pendingTasks = tasks.filter((task) => {
    return task.completed == false;
  });

  const completedTasks = tasks.filter((task) => {
    return task.completed == true;
  });

  function deleteTask(taskId) {
    fetch(`${fetchURL}/tasks/${taskId}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) =>
        setTasks(
          tasks.filter((task) => {
            return task.id != data.id;
          })
        )
      );
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
      .then((data) =>
        setTasks(
          tasks.map((task) => {
            if (task["id"] == data["id"]) {
              task["completed"] = !task["completed"];
            }
            return task;
          })
        )
      );
  }

  function addTask() {
    const parameters = {
      method: "POST",
      body: JSON.stringify({
        title: newTask,
        todoListId: todoListId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}/tasks`, parameters)
      .then((res) => res.json())
      .then((data) => setTasks([...tasks,data]),setNewTask(""))
      
  }
  return (
    <div className="tasks-container">
      <div className="task-card">
        <div className="list-title">{title}</div> 
        <div className="addTask-div">
          <input
            type="text"
            required="true"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
           
          />
          <button disabled={!newTask}  onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>
        <div className="completed-pending-tasks-div">
          <div className="task-status-div">Pending Tasks</div>
          <Tasks
            tasks={pendingTasks}
            actions={[
              { title: "Edit", onClick: deleteTask },
              { title: "done", onClick: markDoneOrUndo },
              { title: "X", onClick: deleteTask },
            ]}
          />

          <div className="task-status-div">Completed Tasks</div>
          <Tasks
            tasks={completedTasks}
            actions={[
              { title: "Edit", onClick: deleteTask },
              { title: "undo", onClick: markDoneOrUndo },
              { title: "X", onClick: deleteTask },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskContainer;
//
