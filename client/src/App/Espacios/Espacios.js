import React from "react";
import Card from 'react-bootstrap/Card';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'
import DateTimePicker from 'react-datetime-picker';
import Cookies from 'universal-cookie';

import "./Espacios.css";
import axios from "axios";
import DateTime from 'react-datetime';
const url_espacios = "http://localhost:5000/api/espacios";

const cookies = new Cookies();

export default class Espacios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      espacios: [],
      fechaInicio: new Date(),
      fechaFin: null,
      _idUsuario: this.props.getUsuario().correo,
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
    const prom = await axios.get(url_espacios);
    console.log(this.props.getUsuario());
    if (prom.status < 300 && prom.status > 199) {
      this.setState({
        espacios: prom.data
      });
    } else {
      console.log(prom.status, "\n The response was not OK");
    }
  }

  handleDate(date) {
    console.log(date);
    this.setState({ fechaInicio: DateTime(date._d) });
  };

  handle_onPost() {
    const reserva = {
      fechaInicio: this.state.fechaInicio,
      fechaFin: this.state.fechaFin,
      _idEspacio: this.state._idEspacio,
      _idUsuario: this.state._idUsuario
    };
    this.post_reserva(reserva);
  }

  async post_reserva(reserva) {
    console.log(reserva);
    await axios.post('http://localhost:5000/api/reservas', reserva).then((p) => {
      this.setState({ _idReserva: p.data[0]._id });
      cookies.set('_idReserva', p.data[0]._id);
      cookies.set('_idEspacio', reserva._idEspacio);
      this.props.history.push('pagar');
    });

    /*
    fetch('http://localhost:5000/api/reservas', {
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
          <h1>Espacios disponibles</h1>
          <div className="row">
            <div className="col-4 col-12-md col-12-sd" textalign="center">
              <div className="d-flex align-items-stretch align-center">
                <div className="card-container ReservaCard d-flex align-items-stretch-center" style={{ padding: '1em' }}>
                  <Card className = "d-flex align-items-stretch">
                    <h3 style={{ padding: '1em' }} className="card-title">Fecha y Hora</h3>
                    <Card.Body className="d-flex justify-content-center w-100" style={{ width: '100%' }}>
                      <DateTimePicker onChange={this.onChange} value={this.state.fechaInicio} />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-8 col-12-md col-12-sd">
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
                              <h5 className="card-title">{x.parqueadero}</h5>
                              <p className="card-text">{x.descripcion}</p>
                              <button
                                className="btn btn-primary"
                                style={{ float: "right" }}
                                onClick={() => {
                                  this.setState({ _idEspacio: x._id }, this.handle_onPost);
                                }}>
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
