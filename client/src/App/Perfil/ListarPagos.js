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
        axios.get(`http://localhost:5000/api/usuarios/${this.props.usuario._id}/pagos`,{headers:headers})
            .then(x => {
                this.setState({ pagos: x.data });
            })
            .catch(err => toast.error(`Hubo un error al traer los pagos :( -> ${err}`));
    }

    render() { 
        return ( 
            <div className="p-md-3">
                <div className="row my-4">
                    <h3 className="font-weight-bold ml-3">Mis Pagos</h3>
                </div>
                <ul className="list-group list-group-flush mb-5">
                    {
                        (this.state.pagos.length === 0) ?
                        <p>Parece que aún no has realizado pagos.</p> :
                        this.state.pagos.map((e, i) => <Pago i={i} pago={e} key = {i} />)
                    }
                </ul>
            </div>
        );
    }
}
 
export default ListarPagos;