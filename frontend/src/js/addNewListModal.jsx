import React, { useState } from "react";
import "./../assets/css/modal.css";
function AddNewListModal(props) {
  const { onClose, addList } = props;
  const [newListName, setNewListName] = useState();
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-button-div" onClick={onClose}>
          <button>X</button>
        </div>
        <div className="add-list-title">Add New List</div>
        <div className="add-list-form">
          <input
            type="text"
            onChange={(e) => setNewListName(e.target.value)}
            required
          />
          <button
            disabled={!newListName}
            className="add-button"
            onClick={()=>addList(newListName)}
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListModal;
