import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./Espacios.css";
import axios from "axios";
const url_espacios = "http://localhost:5000/api/espacios";

export default class Espacios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      espacios: [],
      fechaInicio: null,
      fechaFin: null,
      motivo: null,
      estado: null
    };
    this.get_espacios = this.get_espacios.bind(this);
  }

  componentDidMount() {
    this.get_espacios();
  }

  async get_espacios() {
    const prom = await axios.get(url_espacios);
    if (prom.status < 300 && prom.status > 199) {
      this.setState({
        espacios: prom.data
      });
    } else {
      console.log(prom.status, "\n The response was not OK");
    }
  }

  handleDateChange(data) {
    this.setState({ fechaInicio: data });
    console.log(this.fechaInicio);
  }

  handle_onPost(_idEspacio, _idUsuario) {
    const reserva = {
      fechaInicio: this.state.fechaInicio,
      fechaFin: null,
      _idEspacio: _idEspacio,
      _idUsuario: _idUsuario
    };
    this.post_reserva(reserva);
  }

  post_reserva(reserva) {
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
  }

  render() {
    return (
      <div>
        <div className="host">
          <h1>Espacios disponibles</h1>
          <div className="row">
            <div className="col-4">
              <div>
                <div className="card-container">
                  <Card>
                    <Card.Body>
                      <Card.Title className="card-title">
                        Reserva parqueaderos de acuerdo con tus necesidades.
                            </Card.Title>
                      <Form className="card-label">
                        <Form.Group controlId="sectorForm">
                          <Form.Label>¿En qué sector te gustaría?</Form.Label>
                          <Form.Control type="text" placeholder="Empieza a escribir algún sector"></Form.Control>
                        </Form.Group>
                        <FormGroup>
                          <Row>
                            <Col>
                              <Form.Label>¿Para qué fecha?</Form.Label>
                            </Col>
                            <Col>
                              <Form.Label>¿Para qué hora?</Form.Label>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <SingleDatePicker
                                showClearDate={true}
                                // customInputIcon={
                                //     <svg className="icon icon-small">
                                //         <Icon
                                //             icon="ICON_CALENDER"
                                //             className="icon icon-large"
                                //         />
                                //     </svg>
                                // }
                                inputIconPosition="after"
                                small={true}
                                block={false}
                                numberOfMonths={1}
                                date={this.state.date}
                                onDateChange={date => this.handleDateChange.bind(date)}
                                focused={this.state.focused}
                                onFocusChange={({ focused }) =>
                                  this.setState({ focused })
                                }
                                openDirection="up"
                                hideKeyboardShortcutsPanel={true}
                              />
                            </Col>
                            <Col>
                              <div className="time-picker">
                                <TimePicker
                                  required={true}
                                  disableClock={true}
                                  clearIcon={null}
                                />
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row" id="CardsContainer">
                {this.state.espacios.length > 0 ? (
                  <React.Fragment>
                    {this.state.espacios.map((x, i) => {
                      return (
                        <div
                          key={i}
                          className="col-md-4"
                          style={{ marginTop: "2em" }}
                        >
                          <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-body">
                              <h5 className="card-title">{x.parqueadero}</h5>
                              <p className="card-text">{x.descripcion}</p>
                              <a
                                href="reservar"
                                className="btn btn-primary"
                                style={{ float: "right" }}
                                onClick={this.handle_onPost(x._id, null)}
                              >
                                Reservar
                          </a>
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
