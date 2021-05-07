import "./../assets/css/App.css";
import { Link } from "react-router-dom";
function Register() {
  return (
    <div className="Register">
      UserName: <input type="text" />
      Password: <input type="password" />
      Confirm Passsword: <input type="password" />
      <Link to="/">
        <button type="button">Register</button>
      </Link>
    
    </div>
  );
}

export default Register;
