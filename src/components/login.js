import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux/es/exports";
import { handlelogin } from "../redux-toolkit/action";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state=>state.login.users);
  const [user, setUser] = useState({ username: "", password: "" });
  
  const login = (e) => {
    e.preventDefault();
    let loginUser = users.filter(
      (u) => u.username === user.username?.toLowerCase()
    );
    loginUser[0]
      ? loginUser[0].password === user.password
        ? dispatch(handlelogin(navigate, loginUser[0]))
        : toast.error("password is incorrect")
      : toast.error("User does not exist");
  };

  return (
    <div>
      <form onSubmit={login}>
        <div className="form-outline mb-4">
          <input
            required
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter Your Email"
            name="username"
            type="email"
            className="form-control bg-transparent border-0 border-bottom text-white"
          />
        </div>

        <div className="form-outline mb-4">
          <input
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Your Password"
            type="password"
            name="password"
            className="form-control bg-transparent border-0 border-bottom text-white"
          />
        </div>

        <button type="submit" className="btn btn-outline-info">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
