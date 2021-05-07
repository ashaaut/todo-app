import "./../assets/css/App.css";
import Todo from "./todo.jsx";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import TodoListContainer from './todoListContainer'
function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/todo" component={Todo} />
        <Route path="/register" component={Register} />
        <Route component={Error} />
      </Switch> */}
      <TodoListContainer/>
    </div>
  );
}

export default App;
