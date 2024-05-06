import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import "./Registro.css";
export function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", {
        username,
        password,
        email
      })
      .then((response) => {
        // Manejar la respuesta exitosa
        console.log("Respuesta:", response);
        if(response.status==200){
          alert('Cuenta creada exitosamente')
          navigate("/")
        }
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error:", error);
      });
  };
  
  return (
    <div>
      <form>
        <label htmlFor="Username">Username </label>
        <input
          type="text"
          id="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="Password">Password </label>
        <input
          type="password"
          id="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="Email">Email </label>
        <input
          type="email"
          id="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <div>
          <Link to="/">¿Ya tienes cuenta? Ingresa aquí</Link>
        </div>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}
