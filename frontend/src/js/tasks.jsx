function tasks(props) {
  const { tasks, actions } = props;
  function addActions(id) {
    return actions.map((action) => (
      <div className="action-div">
        <button className="button-div" onClick={() => action.onClick(id)}>
          {action["title"]}
        </button>
      </div>
    ));
  }
  return (
    <div className="task-container">
      {tasks != undefined ? (
        tasks.map((task) => (
          <div className="task-div">
            <div className="task-title">{task.title}</div>
            <div className="task-actions">{addActions(task.id)}</div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default tasks;
