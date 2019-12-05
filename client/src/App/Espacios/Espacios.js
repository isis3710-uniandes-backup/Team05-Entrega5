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

import { FormattedMessage } from "react-intl";

const url_espacios = "/api/espacios";

const cookies = new Cookies();

const headers = {
  "Content-Type": "application/json",
  authorization: cookies.get("token")
};

class Espacios extends Component {
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
    if (!navigator.onLine) {
      this.setState(_ => {
        return {
          espacios: JSON.parse(localStorage.getItem("espacios")) || []
        };
      });
    }

    this.get_espacios();
  }

  get_espacios() {
    axios
      .get(url_espacios, { headers: headers })
      .then(response => {
        this.setState(
          _ => {
            return { espacios: response.data };
          },
          _ => {
            localStorage.setItem(
              "espacios",
              JSON.stringify(this.state.espacios)
            );
          }
        );
      })
      .catch(err => {
        this.setState(_ => {
          return {
            espacios: JSON.parse(localStorage.getItem("espacios")) || []
          };
        });
        console.log("*--> Error Get Espacios", err);
        toast.error(
          <FormattedMessage id="toast.errorEspacios"/>
        );
      });
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
          <h1 className="display-3 font-weight-bold">
            <FormattedMessage id="Espacios" />
          </h1>
          <div className="row">
            <div className="col-4 col-12-md col-12-sd" textalign="center">
              <div className="d-flex align-items-stretch align-center">
                <div
                  className="card-container ReservaCard d-flex align-items-stretch-center"
                  style={{ padding: "1em" }}
                >
                  <Card className="d-flex align-items-stretch">
                    <h2 style={{ padding: "1em" }} className="card-title">
                      <FormattedMessage id="FechaHora" />
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
                <button className="but-solid">
                  <FormattedMessage id="Oferta" />
                </button>
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
                                <FormattedMessage id="Reservar" />
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
                          <FormattedMessage id="MsEspacios" />
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

export default Espacios;
