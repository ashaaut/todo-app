function completedTasks(props) {
  const {tasks,status,actions} = props
  function addActions(id,status){
    return actions.map(action=><button onClick={()=>action.onClick(id,status)}>{action["title"]}</button>)
    
  }
  return (
    <div>
      {tasks != undefined ? (
        tasks.map((task,index) => (
          <div>
            {task} {addActions(index,status)}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default completedTasks;
