import "./Login.css";
import Home from "../Home/Home.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLoginSuccessful(true);
        } else {
          setLoginSuccessful(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loginSuccessful ? (
        <Home />
      ) : (
        <div className="custom-form">
          <form>
            <label className="custom-label">Username:</label>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="username"
              className="custom-input"
              type="text"
            />
            <label className="custom-label">Password:</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              className="custom-input"
              type="password"
            />
            <div>
              <Link to="/">¿Ya tienes cuenta? Ingresa aquí</Link>
            </div>
            <button className="custom-button" onClick={handdleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
