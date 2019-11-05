import React, { Component } from 'react';

export default class PagoDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            i : this.props.i,
            cantidad : this.props.pago.cantidad,
            metodoPago : this.props.pago.metodoPago,
            fecha : Date(this.props.pago.fecha),
            imagen : this.props.pago.imagenMetodoPago,
        };
    }
    render() {
        return (
            <li key={this.state.i} className="list-group-item d-flex d-flex flex-md-row flex-column justify-content-between align-items-center">
                <img className="rounded float-left" src={this.state.imagen} alt="Icono método de pago" width="55" height="55"/>
                <h4 className="mt-3">Valor: {this.state.cantidad}</h4>
                <h4>Fecha: {this.state.fecha.split(" ")[2]}/{this.state.fecha.split(" ")[1]}/{this.state.fecha.split(" ")[3]}</h4>
                <h4>Hora: {this.state.fecha.split(" ")[4].split(":")[0]}:{this.state.fecha.split(" ")[4].split(":")[1]}</h4>
            </li>
        );
    }
}