import React from 'react'

function addNewListModal(){
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    Add New List
                </div>
                <div className="modal-body">
                    this is model content
                </div>
                <div className="modal-footer">
                    this is footer
                    <button>Close</button>
                </div>
            </div>
        </div>
    )
}

export default addNewListModal;