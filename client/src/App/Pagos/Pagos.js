import React, { Component } from 'react';
import PagoDetail from "./PagoDetail.js";

export default class Pagos extends Component {

    render() {
        return (
            <ul className="list-group list-group-flush mb-5">
                {
                    this.props.pagos.map((e, i) => <PagoDetail i={i} pago={e} />)
                }
            </ul>
        );
    }
}