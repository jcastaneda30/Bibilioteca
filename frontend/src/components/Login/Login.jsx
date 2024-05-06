import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccessful, setloginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setloginSuccessful(true);
        } else {
          if (!result.success) alert("Contraseña o usuario incorrecto");
          setloginSuccessful(false);
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <>
      {loginSuccessful ? (
        <Home />
      ) : (
        <div>
          <form>
            <label htmlFor="Username">Username </label>
            <input
              type="text"
              id="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <label htmlFor="Password">Password </label>
            <input
              type="password"
              id="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div>
              <Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
            </div>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      )}
    </>
  );
}
