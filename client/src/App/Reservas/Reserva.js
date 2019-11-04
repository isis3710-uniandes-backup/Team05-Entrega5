import React, { Component } from 'react';

class Reserva extends Component {

    constructor(props) {
        this.setState = {
            motivo: props.params.motivo,
            estado: props.params.estado,
            fechaInicio: props.params.fechaInicio,
            fechaFin: props.params.fechaFin
        };
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Reserva;