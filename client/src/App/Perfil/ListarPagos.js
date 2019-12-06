import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'; 

import PagoDetail from '../Pagos/PagoDetail';
import { FormattedMessage } from 'react-intl';

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
        axios.get(`/api/usuarios/${this.props.usuario._id}/pagos`, { headers: this.state.headers })
            .then(x => {
                this.setState({ pagos: x.data });
            })
            .catch(err => toast.error(`Hubo un error al traer los pagos :( -> ${err}`));
    }

    render() { 
        return ( 
            <div className="p-md-3">
                <div className="row my-4">
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