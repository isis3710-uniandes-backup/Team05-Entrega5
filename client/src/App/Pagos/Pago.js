import React, { Component } from 'react';

export default class Pagos extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            cantidad : this.props.pago.cantidad,
            metodoPago : this.props.pago.metodoPago,
            fecha : this.props.pago.fecha,
            imagen : this.props.pago.fecha,
        };
    }
    render() {
        return (
            <div>
                <li className="list-group-item d-flex d-flex flex-md-row flex-column justify-content-between align-items-center">
                    <img className="rounded float-left" src={this.state.imagen} alt="Icono metodo de pago" width="55" height="55"/>
                    <h4 className="mt-3">
                        Costo: {this.state.cantidad}
                    </h4>
                    <h4>
                        Fecha: {fecha.getFullYear() }  {fecha.getMonth()} { fecha.getDate()}
                    </h4>
                    <h4>
                        Hora: {fecha.getHours()}:{fecha.getMinutes()}
                    </h4>
                </li>
            </div>
        );
    }
}
