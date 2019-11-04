import React, { Component } from 'react';
import Reserva from '../Reservas/Reserva';
import Button from 'react-bootstrap/Button';

class Reservas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reservas : []
        }

    }

    componentDidMount() {
        fetch('http://localhost:5000/api/reservas', {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( results => {
            console.log(results);
            return results.json();
        }).then( data => {
            console.log(data);
            let reserva = data.map((res) => {
                console.log(res)
                return (
                    <div>
                        <Reserva />
                    </div>
                );
            });
            this.setState({reservas: reserva});
            console.log("Hace el get del state para las reservas");
        })
    }

    render() {
        
        return (
            <div>
                {this.state.reservas}
            </div>
        );
    }
}

export default Reservas;