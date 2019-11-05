import React, { Component } from 'react';

export default class Pago extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            i : this.props.i,
            cantidad : this.props.pago.cantidad,
            metodoPago : this.props.pago.metodoPago,
            fecha : this.props.pago.fecha,
            imagen : this.props.pago.imagen,
        };
    }
    render() {
        return (
            <li key={this.state.i} className="list-group-item d-flex d-flex flex-md-row flex-column justify-content-between align-items-center">
                <img className="rounded float-left" src={this.state.imagen} alt="Icono método de pago" width="55" height="55"/>
                <h4 className="mt-3">Valor: {this.state.cantidad}</h4>
                <h4>Fecha: {this.state.fecha.getDate()}/{this.state.fecha.getMonth()}/{this.state.fecha.getFullYear()}</h4>
                <h4>Hora: {this.state.fecha.getHours()}:{this.state.fecha.getMinutes()}</h4>
            </li>
        );
    }
}
