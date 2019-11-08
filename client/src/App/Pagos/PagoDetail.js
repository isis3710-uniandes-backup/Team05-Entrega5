import React, { Component } from 'react';

export default class PagoDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            fecha : (new Date(this.props.pago.fecha)).toString(),
        };

    }
    render() {
        return (
            <li key={this.props.i} className="list-group-item d-flex flex-md-row flex-column justify-content-between align-items-center">
                <img className="float-left" src={this.props.pago.imagenMetodoPago} alt="Icono método de pago" width="55" height="55"/>
                <strong className="mt-3">Valor: {this.props.pago.cantidad}</strong>
                <strong>Fecha: {this.state.fecha.split(" ")[2]}/{this.state.fecha.split(" ")[1]}/{this.state.fecha.split(" ")[3]}</strong>
                <strong>Hora: {this.state.fecha.split(" ")[4].split(":")[0]}:{this.state.fecha.split(" ")[4].split(":")[1]}</strong>
            </li>
        );
    }
}