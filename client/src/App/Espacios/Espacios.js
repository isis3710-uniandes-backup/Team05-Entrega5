import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "./Espacios.css";
import DateTimePicker from "react-datetime-picker";
import DateTime from "react-datetime";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";


const url_espacios = "/api/espacios";

const cookies = new Cookies();

const headers = {
  "Content-Type": "application/json",
  authorization: cookies.get("token")
};

export default class Espacios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      espacios: [],
      fechaInicio: new Date(),
      fechaFin: null,
      _idUsuario: this.props.getUsuario()._id,
      _idEspacio: null,
      _idReserva: null
    };
    this.onChange = date => this.setState({ fechaInicio: date });
    this.get_espacios = this.get_espacios.bind(this);
  }

  componentDidMount() {
    this.get_espacios();
  }

  async get_espacios() {
    const prom = await axios.get(url_espacios, { headers: headers });
    if (prom.status < 300 && prom.status > 199) {
      this.setState({
        espacios: prom.data
      });
    } else {
      toast.error("Hubo un error al consultar los espacios disponibles. Por favor, inténtalo de nuevo.");
      console.log(prom.status, "\n The response was not OK");
    }
  }

  handleDate(date) {
    console.log(date);
    this.setState({ fechaInicio: DateTime(date._d) });
  }

  handle_onPost() {
    const reserva = {
      fechaInicio: this.state.fechaInicio.toUTCString(),
      fechaFin: this.state.fechaFin,
      _idEspacio: this.state._idEspacio,
      _idUsuario: this.state._idUsuario
    };
    this.post_reserva(reserva);
  }

  async post_reserva(reserva) {
    await axios.post("/api/reservas", reserva, { headers: headers }).then(p => {
      this.setState({ _idReserva: p.data[0]._id });
      cookies.set("_idReserva", p.data[0]._id);
      cookies.set("_idEspacio", reserva._idEspacio);
      this.props.history.push("pagar");
    });

    /*
    fetch('/api/reservas', {
      method: "post",
      body: JSON.stringify(reserva),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(_ => {
        this.props.history.push('/reservas')
      })
      .catch(err => {
        console.log(err.message);
      });
      */
  }

  render() {
    return (
      <div>
        <div className="host">
          <h1 className="display-3 font-weight-bold">Espacios disponibles</h1>
          <div className="row">
            <div className="col-4 col-12-md col-12-sd" textalign="center">
              <div className="d-flex align-items-stretch align-center">
                <div
                  className="card-container ReservaCard d-flex align-items-stretch-center"
                  style={{ padding: "1em" }}
                >
                  <Card className="d-flex align-items-stretch">
                    <h2 style={{ padding: "1em" }} className="card-title">
                      Fecha y Hora
                    </h2>
                    <Card.Body
                      className="d-flex justify-content-center w-100"
                      style={{ width: "100%" }}
                    >
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.fechaInicio}
                      />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-8 col-12-md col-12-sd">
              <Link to="/espacios/post">
                <button className="but-solid">Agregar Oferta</button>
              </Link>
              <div className="row" id="CardsContainer">
                {this.state.espacios.length > 0 ? (
                  <React.Fragment>
                    {this.state.espacios.map((x, i) => {
                      return (
                        <div
                          key={i}
                          className="col-lg-4 col-md-8 col-sd-12"
                          style={{ marginTop: "2em" }}
                        >
                          <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-body">
                              <h3 className="card-title">{x.parqueadero}</h3>
                              <p className="card-text">{x.descripcion}</p>
                              <button
                                className="but-outline"
                                style={{ float: "right" }}
                                onClick={() => {
                                  this.setState(
                                    { _idEspacio: x._id },
                                    this.handle_onPost
                                  );
                                }}
                              >
                                Reservar
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <div
                    className="col-md-12"
                    style={{ marginTop: "2em", width: "100%" }}
                  >
                    <div className="card" style={{ textAlign: "center" }}>
                      <div className="card-body">
                        <p className="card-text">
                          En este momento no hay espacios de parqueo disponibles
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
