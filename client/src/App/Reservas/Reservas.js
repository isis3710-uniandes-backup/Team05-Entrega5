import React, { Component } from 'react';
import Reserva from '../Reservas/Reserva';
import Button from 'react-bootstrap/Button';
import axios from "axios";
const url_reservas = "http://localhost:5000/api/reservas";

class Reservas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reservas: []
        }

        this.get_reservas = this.get_reservas.bind(this);

    }

    componentDidMount() {
        this.get_reservas();
    }

    async get_reservas() {
        const prom = await axios.get(url_reservas);
        if (prom.status < 300 && prom.status > 199) {
            this.setState({
                reservas: prom.data
            });
        } else {
            console.log(prom.status, "\n The response was not OK");
        }
    }

    estaFinalizado(prop){
        console.log(prop);
        if(prop.fechaFin == null){
            return <button className="btn btn-danger" onClick={()=>{this.updateFinalizado(prop._id)}}>Finalizar Reserva</button>
        }
    }

    async updateFinalizado(id){
        await axios.put(url_reservas, {fechaFin: Date()}).then((r) => {
            console.log(r);
        })
    }

    render() {

        return (
            <div className="host">
            {this.state.reservas.map((x, i) => {
                return (
                  <div
                    key={i}
                    className="col-md-4"
                    style={{ marginTop: "2em" }}
                  >
                    <div className="card" style={{ textAlign: "left" }}>
                      <div className="card-body">
                        <h2 className="card-title">Fecha </h2>
                        <h5 className = "card-body">{Date(x.fechaInicio)}</h5>
                        {this.estaFinalizado(x)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        );
    }
}

export default Reservas;