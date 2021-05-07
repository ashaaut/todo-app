import "./../assets/css/App.css";
import {Link} from 'react-router-dom'
function Login() {
  return (
    <div className="Login">
      Username: <input type="text" />
      Pasword: <input type="password" />
      <Link to="/todo">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

export default Login;
