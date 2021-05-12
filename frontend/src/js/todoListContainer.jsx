import React, { useState, useEffect } from "react";
import "./../assets/css/todo.css";
import fetchData from "./useFetch.js";
import AddNewListModal from "./addNewListModal";
import { useHistory } from "react-router-dom";
const fetchURL = "http://localhost:8888/todo-list";

function TodoListContainer(props) {
  const [todoLists, setTodoLists] = useState();
  const [showAddListModal, setshowAddListModal] = useState(false);
  const history = useHistory();
  console.log(showAddListModal);
  function setSelectedTodoList(params) {
    history.push(`/${params.id}`);
  }

  useEffect(() => {
    fetchData(fetchURL).then((data) => setTodoLists(data));
  }, []);

  function addList(newListName) {
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

  return (
    <div className="todo-app-container">
      {todoLists ? (
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
          <div className="todo-card add-new-list " onClick={() => setshowAddListModal(true)}>
            <h1>+</h1>
          </div>
          {showAddListModal ? (
            <AddNewListModal
              onClose={() => setshowAddListModal(false)}
              addList={addList}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default TodoListContainer;
