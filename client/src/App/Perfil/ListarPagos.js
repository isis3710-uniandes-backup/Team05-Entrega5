import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Pago from '../Pagos/Pago';
import { toast } from 'react-toastify'; 

const cookies = new Cookies();

const headers = {
    'Content-Type' : 'application/json',
    'authorization' : cookies.get('token')
  }

class ListarPagos extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            pagos: []
        };
    }

    componentDidMount() {
        axios.get(`/api/usuarios/${this.props.usuario._id}/pagos`,{headers:headers})
            .then(x => {
                this.setState({ pagos: x.data });
            })
            .catch(err => toast.error(`Hubo un error al traer los pagos :( -> ${err}`));
    }

    render() { 
        return ( 
            <div className="p-md-3">
                <div className="row my-4">
                    <h2 className="font-weight-bold ml-3">Mis Pagos</h2>
                </div>
                <div className="cont">
                    {
                        (this.state.pagos.length === 0) ?
                        <p>Parece que aún no has realizado pagos.</p> :
                        <Pago pago={this.state.pagos} />
                    }
                </div>
            </div>
        );
    }
}
 
export default ListarPagos;