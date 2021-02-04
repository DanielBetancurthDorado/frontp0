import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { useContext } from "react";
import { Context } from "../hooks/context.js";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registro, setRegistro] = useState({});
  const [context, setContext] = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/usuarios", {
      login: username,
      contrasena: password,
    });

   setRegistro(response.data);
   history.push("/login");

    //setUser(response.data);
  };
  // if there's a user show the message below

  const irInicioSesion = () => {
    history.push("/login");
  };
  // if there's no user, show the login form
  return (
    <div>
      <h1>Registrate</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Correo: </label>
        <input
          type="email"
          value={username}
          placeholder="Ingresa un correo"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            value={password}
            placeholder="Ingresa una contraseña"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">Enviar</Button>
        <Button onClick={irInicioSesion}>Ir a inicio de sesión</Button>
      </form>
    </div>
  );
};
export default Signup;
