import React, { useState, useEffect } from "react";
import TaskContainer from "./taskContainer";
import fetchData from "./useFetch.js";
import TodoListContainer from "./todoListContainer";
import "./../assets/css/todo.css";
const fetchURL = "http://localhost:8888/todo-list";


function TodoApp() {
  const [todoLists, setTodoLists] = useState();
  const [selectedTodoList, setSelectedTodoList] = useState();

  useEffect(() => {
    fetchData(fetchURL).then((data) => setTodoLists(data));
  }, []);
  console.log(selectedTodoList)

  //just move that todoLiest and set todolists ha
  return (
    <div className="todo-container">

      {selectedTodoList ? (
        <TaskContainer title={selectedTodoList.title} id={selectedTodoList.id} />
      ) : (
        todoLists?<TodoListContainer
        todoLists={todoLists}
        setSelectedTodoList={setSelectedTodoList}
      />:""
      )}
    </div>
  );
}
export default TodoApp;
