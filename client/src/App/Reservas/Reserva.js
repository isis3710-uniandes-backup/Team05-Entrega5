import React, { Component } from 'react';

class Reserva extends Component {

    constructor(props) {
        super(props);
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
                {console.log(this.props)}
            </div>
        );
    }
}

export default Reserva;