import React, { Component } from 'react';
import PagoDetail from "./PagoDetail.js";

export default class Pago extends Component {

    constructor(props) {
        super(props);
    }

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