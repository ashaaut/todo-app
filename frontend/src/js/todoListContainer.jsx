import React, { useState, useEffect } from "react";
import TaskContainer from "./taskContainer";
import fetchData from "./useFetch.js";
const fetchURL = "http://localhost:8888/todo-list";
function TodoListContainer() {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    fetchData(fetchURL).then((data) => setTodoLists(data));
  }, []);
  
  return (
    <div>
      {todoLists.map((list) => {
        return <div><TaskContainer title={list.title}  id={list.id}/></div>;
      })}
    </div>
  );
}
export default TodoListContainer;
