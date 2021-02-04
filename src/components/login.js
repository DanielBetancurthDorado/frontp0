import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { useContext } from "react";
import { Context } from "../hooks/context.js";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [context, setContext] = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/auth", {
      username: username,
      password: password,
    });
    const token = `JWT ${response.data.access_token}`;
    //'/usuarios/<str:login>/<str:password>'
    const usuarioActualizarToken = await axios.get(
      `/usuarios/${username}/${password}`
    );
    const idActualizar = usuarioActualizarToken.data.id;
    const actualizacionToken = await axios.put("/usuarios/" + idActualizar, {
      login: username,
      contrasena: password,
      token: token,
    });
    setContext(actualizacionToken.data);
    setUser(actualizacionToken.data);
  };
  // if there's a user show the message below
  if (user) {
    const path = `/usuarios/${user.id}/eventos`;
    return (
      <div>
        <Redirect to={path} />
      </div>
    );
  }
  const irRegistro = () => {
    history.push("/");
  };
  return (
    <div>
      <h1>Inicia sesión</h1>
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
        <Button onClick={irRegistro}>Ir a registro</Button>
      </form>
    </div>
  );
};
export default Login;
