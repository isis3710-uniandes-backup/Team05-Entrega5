import React, { Component } from 'react';
import { FormattedMessage, FormattedTime, FormattedDate, FormattedNumber } from 'react-intl';

export default class PagoDetail extends Component {

    render() {
        return (
            <li key={this.props.i} className="list-group-item d-flex flex-md-row flex-column justify-content-between align-items-center">
                <img src={this.props.pago.imagenMetodoPago} alt="Icono método de pago" width="55" height="55"/>
                <strong><FormattedMessage id="pagoDetail.campoValor"/>: $<FormattedNumber value={this.props.pago.cantidad} /></strong>
                <strong><FormattedMessage id="reservas.tituloFecha" />: 
                    <FormattedDate value={new Date(this.props.pago.fecha)} year='numeric' month='long' day='numeric' weekday='long'/> - 
                    <FormattedTime value={new Date(this.props.pago.fecha)} />
                </strong>
            </li>
        );
    }
}