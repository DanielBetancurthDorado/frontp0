import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/context.js";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ListaEventos = () => {
  const [context, setContext] = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const [edit, setEdit] = useContext(Context);

  const user = context;
  useEffect(() => {
    eventosUsuario();
  }, [eventos]);
  const eventosUsuario = () => {
    axios.get("/usuarios/" + user.id + "/eventos").then((response) => {
      //Info en data
      setEventos(response.data);
    });
  };

  const eliminar = (idEvento, idCreador) => {
    axios.delete("/usuarios/" + idCreador + "/eventos/" + idEvento);
  };
  return (
    <div>
      {eventos.map((evento, index) => (
        <div key={index + 1}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{evento.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {evento.direccion} - {evento.lugar}
              </Card.Subtitle>
              <Card.Text>
                <p>
                  Categoria: {evento.categoria}
                  <br></br>
                  Empieza: {evento.fechaInicio}
                  <br></br>
                  Termina: {evento.fechaFin}
                  <br></br>
                  Tipo: {evento.tipo}
                </p>
              </Card.Text>
              <Card.Link onClick={() => setEdit(true)}>Editar evento</Card.Link>
              <Card.Link onClick={() => eliminar(evento.id, evento.creador_id)}>
                Eliminar evento
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default ListaEventos;
