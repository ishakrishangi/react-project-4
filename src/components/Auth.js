import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../store/authContext";

const Auth = () => {
    const authCtx = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const url = "https://socialmtn.devmountain.com";

    axios.post(register ? `${url}/register` : `${url}/login`, body)
      .then(({data}) => {
        console.log("AFTER AUTH", data);
        authCtx.login(data.token, data.expTime, data.userId)
      })
      .catch(err => {
        setPassword("")
        setUsername("")
        console.log(err)
      })

    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn">
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
