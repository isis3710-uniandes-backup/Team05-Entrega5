import React, { Component } from 'react';
import PagoDetail from "./PagoDetail.js";

export default class Pago extends Component {

    render() {
        return (
            <ul className="list-group list-group-flush mb-5">
                 {
                        (this.props.pagos.length === 0) ?
                        <li>Parece que aún no has realizado pagos.</li> :
                        this.props.pagos.map((e, i) => <PagoDetail i={i} pago={e} />)
                    }
            </ul>
        );
    }
}