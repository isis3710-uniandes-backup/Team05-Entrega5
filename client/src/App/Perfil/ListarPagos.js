import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'; 
import { FormattedMessage } from 'react-intl';

import PagoDetail from '../Pagos/PagoDetail';
import Grafica from './Grafica';

const cookies = new Cookies();

class ListarPagos extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            pagos: [],
            headers: {
               'authorization' : cookies.get('token') 
            }
        };
    }

    componentDidMount() {
        if(!navigator.onLine) {
            let p = localStorage.getItem('pagos');
            if (p) {
                this.setState({ pagos: JSON.parse(p) });
            }
        }
        else {
            axios.get(`/api/usuarios/${this.props.usuario._id}/pagos`, { headers: this.state.headers })
                .then(x => {
                    this.setState({ pagos: x.data });
                    localStorage.setItem('pagos', JSON.stringify(x.data));
                })
                .catch(err => {
                    let pa = localStorage.getItem('pagos');
                    if (pa) {
                        this.setState({ pagos: JSON.parse(pa) });
                    }
                    toast.error(<FormattedMessage id="toast.errorPagos" />)
                });
        }
    }

    render() { 
        return ( 
            <div className="p-md-3">
                {
                    (!this.state.pagos || this.state.pagos.length === 0) ?
                    <div><p><FormattedMessage id="listarPagos.noGrafica"/></p></div> :
                    <Grafica data={this.state.pagos} />
                }
                <div className="d-flex align-items-start my-3">
                    <h2 className="font-weight-bold ml-3"><FormattedMessage id="listarPagos.titulo"/></h2>
                </div>
                <ul className="list-group list-group-flush mb-5">
                    {
                        (!this.state.pagos || this.state.pagos.length === 0) ?
                        <li><p><FormattedMessage id="listarPagos.mensajeNoPagos"/></p></li> :
                        this.state.pagos.map((e, i) => <PagoDetail i={i} pago={e} />)
                    }
                </ul>
            </div>
        );
    }
}
 
export default ListarPagos;