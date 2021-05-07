function completedTasks(props) {
    const {tasks,actions} = props
    function addActions(id){
      return actions.map(action=><button onClick={()=>action.onClick(id)}>{action["title"]}</button>)
      
    }
    return (
      <div>
        {tasks != undefined ? (
          tasks.map((task) => (
            <div>
              {task.title} {addActions(task.id)}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  
  export default completedTasks;