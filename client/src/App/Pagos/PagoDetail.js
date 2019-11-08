import React, { Component } from 'react';

export default class PagoDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            fecha : (new Date(this.props.pago.fecha)).toString(),
        };

    }
    render() {
        const fecha = new Date(this.props.pago.fecha);
        let dia = fecha.getDay();
        let mes = fecha.getMonth();
        let anio = fecha.getFullYear();

        let horas = fecha.getHours();
        let minutos = fecha.getMinutes();
        
        return (
            <li key={this.props.i} className="list-group-item d-flex flex-md-row flex-column justify-content-between align-items-center">
                <img className="float-left" src={this.props.pago.imagenMetodoPago} alt="Icono método de pago" width="55" height="55"/>
                <strong className="mt-3">Valor: {this.props.pago.cantidad}</strong>
                <strong>Fecha: {dia}/{mes}/{anio}</strong>
                <strong>Hora: {horas}:{minutos}</strong>
            </li>
        );
    }
}