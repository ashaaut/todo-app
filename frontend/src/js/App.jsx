import "./../assets/css/App.css";
import { Switch, Route } from "react-router-dom";

import TodoListContainer from "./todoListContainer";
import TaskContainer from "./taskContainer";
function App() {
  return (
    <div className="App">
      <div className="app-title">Todo Application</div>
      <div className="todo-list-conatiner">
        
      <Switch>
        <Route path="/" component={TodoListContainer} exact />
        <Route path="/:id" component={TaskContainer} />
      
        <Route component={Error} />
      </Switch>
      </div>
    </div>
  );//switch uchal purn ani todo app la replace kr
}

export default App;
