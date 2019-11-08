import React, { Component } from 'react';
import PagoDetail from "./PagoDetail.js";

export default class Pago extends Component {

    constructor(props){
        super(props);
        this.state = {
            pagos : this.props.pago,
        };
    }
    render() {
        return (
            <ul className="list-group list-group-flush mb-5">
                 {
                        (this.state.pagos.length === 0) ?
                        <p>Parece que aún no has realizado pagos.</p> :
                        this.state.pagos.map((e, i) => <PagoDetail i={i} pago={e} />)
                    }
            </ul>
        );
    }
}