import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/context.js";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const Principal = () => {
  const [context, setContext] = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState(false);
  const [post, setPost] = useState(false);
  const [eventoActual, setEventoActual] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lugar, setLugar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [infoDetalle, setInfoDetalle] = useState({});

  const user = context;

  useEffect(() => {
    axios
      .get(`/usuarios/${user.id}/eventos`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setEventos(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventos]); //hay que colocar eventos en []

  const eliminar = (idEvento, idCreador) => {
    axios.delete("/usuarios/" + idCreador + "/eventos/" + idEvento);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      "/usuarios/" + user.id + "/eventos/" + eventoActual,
      {
        nombre: nombre,
        categoria: categoria,
        lugar: lugar,
        direccion: direccion,
        fechaInicio: startDate,
        fechaFin: endDate,
        tipo: tipo,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    if (response.status === 200) {
      alert("Se actualizó el evento correctamente");
    }
    if (!response.status) {
      alert(
        "No se pudo actualizar el evento, revise el valor de los parametros"
      );
    }
    setEdit(false);
    setEventoActual(0);
  };
  const editar = (idEvento) => {
    return (
      <div>
        <h2>Editando evento</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            placeholder="Ingrese el nuevo nombre del evento"
            onChange={({ target }) => setNombre(target.value)}
          />
          <div>
            <label htmlFor="direccion">Direccion: </label>
            <input
              type="text"
              value={direccion}
              placeholder="Ingrese la nueva direccion del evento"
              onChange={({ target }) => setDireccion(target.value)}
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoria: </label>
            <input
              type="text"
              value={categoria}
              placeholder="Ingrese la nueva categoria del evento"
              onChange={({ target }) => setCategoria(target.value)}
            />
          </div>
          <div>
            <label htmlFor="lugar">Lugar: </label>
            <input
              type="text"
              value={lugar}
              placeholder="Ingrese le nuevo lugar del evento"
              onChange={({ target }) => setLugar(target.value)}
            />
          </div>
          <div>
            <label htmlFor="fechaInicio">Fecha Inicio: </label>
            <DatePicker
              selected={startDate}
              format={"yyyy-mm-dd hh:mm:ss"}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">FechaFin: </label>
            <DatePicker
              selected={endDate}
              format={"yyyy-mm-dd hh:mm:ss"}
              onChange={(date) => {
                setEndDate(date);
              }}
            />{" "}
          </div>
          <div>
            <label htmlFor="tipo">Tipo: </label>
            <input
              type="text"
              value={tipo}
              placeholder="Ingrese el tipo del evento"
              onChange={({ target }) => setTipo(target.value)}
            />
          </div>
          <button type="submit">Editar evento</button>
        </form>
      </div>
    );
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/usuarios/" + user.id + "/eventos",
      {
        nombre: nombre,
        categoria: categoria,
        lugar: lugar,
        direccion: direccion,
        fechaInicio: startDate,
        fechaFin: endDate,
        tipo: tipo,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    if (response.status === 200) {
      alert("Se creo el evento correctamente");
    }
    if (!response.status) {
      alert(
        "No se pudo actualizar el evento, revise el valor de los parametros"
      );
    }
    setPost(false);
  };
  const agregar = () => {
    return (
      <div>
        <h2>Agregando evento</h2>
        <form onSubmit={handleSubmitPost}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            placeholder="Ingrese el nuevo nombre del evento"
            onChange={({ target }) => setNombre(target.value)}
          />
          <div>
            <label htmlFor="direccion">Direccion: </label>
            <input
              type="text"
              value={direccion}
              placeholder="Ingrese la nueva direccion del evento"
              onChange={({ target }) => setDireccion(target.value)}
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoria: </label>
            <input
              type="text"
              value={categoria}
              placeholder="Ingrese la nueva categoria del evento"
              onChange={({ target }) => setCategoria(target.value)}
            />
          </div>
          <div>
            <label htmlFor="lugar">Lugar: </label>
            <input
              type="text"
              value={lugar}
              placeholder="Ingrese le nuevo lugar del evento"
              onChange={({ target }) => setLugar(target.value)}
            />
          </div>
          <div>
            <label htmlFor="fechaInicio">Fecha Inicio: </label>
            <DatePicker
              selected={startDate}
              format={"yyyy-mm-dd hh:mm:ss"}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">FechaFin: </label>
            <DatePicker
              selected={endDate}
              format={"yyyy-mm-dd hh:mm:ss"}
              onChange={(date) => {
                setEndDate(date);
              }}
            />{" "}
          </div>
          <div>
            <label htmlFor="tipo">Tipo: </label>
            <input
              type="text"
              value={tipo}
              placeholder="Ingrese el tipo del evento"
              onChange={({ target }) => setTipo(target.value)}
            />
          </div>
          <button type="submit">Agregar evento</button>
        </form>
      </div>
    );
  };
  const verDetalle = () => {
    return (
      <div>
        <h1>{infoDetalle.nombre}</h1>
        <h2 className="text-primary">Categoria:</h2>
        <h3>{infoDetalle.categoria}</h3>
        <h2 className="text-primary">Dirección:</h2>
        <h3>{infoDetalle.direccion}</h3>
        <h2 className="text-primary">Fecha de inicio:</h2>
        <h3>{infoDetalle.fechaInicio}</h3>
        <h2 className="text-primary">Fecha de termino:</h2>
        <h3>{infoDetalle.fechaFin}</h3>
        <h2 className="text-primary">Tipo de evento:</h2>
        <h3>{infoDetalle.tipo}</h3>
      </div>
    );
  };
  return (
    <div>
      <Button
        onClick={() => {
          setPost(true);
          setDetail(false);
          setEdit(false);
        }}
      >
        Agregar un evento
      </Button>
      <div className="row">
        {eventos.map((evento, index) => (
          <div key={index + 1}>
            <Card>
              <Card.Header as="h5">{evento.nombre}</Card.Header>
              <Card.Body>
                <Card.Title>{evento.categoria}</Card.Title>
                <Card.Text>
                  Fechas: {evento.fechaInicio} - {evento.fechaFin}{" "}
                </Card.Text>
                <Card.Link
                  onClick={() => {
                    setPost(false);
                    setDetail(true);
                    setEdit(false);
                    setEventoActual(evento.id);

                    axios
                      .get(`/usuarios/${user.id}/eventos/${evento.id}`, {
                        headers: {
                          Authorization: user.token,
                        },
                      })
                      .then((response) => {
                        setInfoDetalle(response.data);
                      });
                  }}
                >
                  Detalle
                </Card.Link>
                <Card.Link
                  onClick={() => {
                    setPost(false);
                    setDetail(false);
                    setEdit(true);
                    setEventoActual(evento.id);
                  }}
                >
                  Editar evento
                </Card.Link>
                <Card.Link
                  onClick={() => {
                    eliminar(evento.id, evento.creador_id);
                    setPost(false);
                    setDetail(false);
                    setEdit(false);
                  }}
                >
                  Eliminar evento
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4"> {edit ? editar(eventoActual) : null}</div>
          <div className="col-4"> {post ? agregar() : null}</div>
          <div className="col-4">{detail ? verDetalle() : null}</div>
        </div>
      </div>
    </div>
  );
};
export default Principal;
