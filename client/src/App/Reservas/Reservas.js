import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FormattedMessage } from "react-intl";
const url_reservas = "/api/reservas";

const cookies = new Cookies();

class Reservas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headers: {
        "Content-Type": "application/json",
        "authorization": cookies.get("token")
      },
      reservas: [],
      _idUsuario: this.props.getUsuario()._id
    };

    this.get_reservas = this.get_reservas.bind(this);
  }

  componentDidMount() {
    this.get_reservas();
  }

  async get_reservas() {
    const prom = await axios.get(url_reservas, { headers: this.state.headers });
    if (prom.status < 300 && prom.status > 199) {
      this.setState({
        reservas: (prom.data) ? prom.data.filter(d => d._idUsuario === this.state._idUsuario) : []
      });
    } else {
      console.log(prom.status, "\n The response was not OK");
    }
  }

  estaFinalizado(prop) {
    console.log(prop);
    if (prop.fechaFin != null) {
      return (
        <button
          className="but-solid"
          onClick={() => {
            this.updateFinalizado(prop._id);
          }}
        >
          <FormattedMessage id="reservas.botonFinalizar" />
        </button>
      );
    }
  }

  async updateFinalizado(id) {
    let d = Date();
    await axios.put(url_reservas + "/" + id, { fechaFin: d }).then(r => {
      console.log(r);
    });
  }

  render() {
    return (
      <div className="host">
        <h1 className="med font-weight-bold title pt-4"><FormattedMessage id="reservas.tituloMisReservas"/></h1>
        {this.state.reservas.length > 0 ? (
          <React.Fragment>
            {this.state.reservas.map((x, i) => {
              return (
                <div key={i} className="col" style={{ marginTop: "2em" }}>
                  <div className="card" style={{ textAlign: "left" }}>
                    <div className="card-body">
                      <h2 className="card-title med"><FormattedMessage id="reservas.tituloFecha"/></h2>
                      <strong className="card-body">
                        <FormattedDate
                        value={new Date(x.fechaInicio)}
                        year='numeric'
                        month='long'
                        day='numeric'
                        weekday='long'
                        />
                      </strong>
                      {this.estaFinalizado(x)}
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
                  <FormattedMessage id="reservas.mensajeNoHay" />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Reservas;
