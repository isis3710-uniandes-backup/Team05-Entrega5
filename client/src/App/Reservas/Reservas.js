import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Reserva from '../Reservas/Reserva';

class Reservas extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <NavBar />
                {this.props.params.reserva.map((e,i) => <Reserva key= {i} reserva = {e}/>)}
            </div>
        );
    }
}

export default Reservas;