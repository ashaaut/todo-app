import React, { useState, useEffect } from "react";
import "./../assets/css/todo.css";
import fetchData from "./useFetch.js";
import addNewListModal from './addNewListModal';
import { useHistory } from "react-router-dom";
const fetchURL = "http://localhost:8888/todo-list";

function TodoListContainer(props) {
  const [todoLists, setTodoLists] = useState();
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [newListName, setNewListName] = useState();
  const history = useHistory();

  function setSelectedTodoList(params) {
    history.push(`/${params.id}`);
  }

  useEffect(() => {
    fetchData(fetchURL).then((data) => setTodoLists(data));
  }, []);

  function addList() {
    const parameters = {
      method: "POST",
      body: JSON.stringify({
        title: newListName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${fetchURL}`, parameters)
      .then((res) => res.json())
      .then(({ added: newList }) => setSelectedTodoList(newList));
  }
  //bgh ata

  return (
    <div className="todo-app-container">
      {showAddListForm ? (
        <div className="addNewList-div">
          <div className="add-list-title">
            Add New List
          </div>
          <div className="add-list-form">
            <input
              type="text"
              onChange={(e) => setNewListName(e.target.value)}
              required
            />
            <button disabled={!newListName} className="add-button" onClick={addList}>
              Add List
            </button>
          </div>
        </div>
      ) : (
        todoLists && (
          <div className="todo-lists-container">
            {todoLists.map((todoList) => {
              return (
                <div
                  className="todo-card"
                  onClick={() => setSelectedTodoList(todoList)}
                >
                  {todoList.title}
                </div>
              );
            })}
            <div className="todo-card" onClick={() => setShowAddListForm(true)}>
              <h1>+</h1>
            </div>
          </div>
        )
      )}
    </div>
  );
}
export default TodoListContainer;
