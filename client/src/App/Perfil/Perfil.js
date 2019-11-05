import React, { Component } from 'react';

import './Perfil.css';
import imagen from '../../assets/user.png';

import ListarPagos from './ListarPagos';
import { toast } from 'react-toastify';

class Perfil extends Component {
    constructor(props) {
        super(props);

        this.handleCerrarSesion = this.handleCerrarSesion.bind(this);
    }

    handleCerrarSesion(event) {
        event.preventDefault(); 
        this.props.removeUsuario();
        toast.success('¡Vuelve pronto 😊!');
    }

    render() { 
        return ( 
            <div className="container host">
                <div className="row">
                    <div className="col-12 col-md-4 text-center d-flex flex-column justify-content-center align-items-center fijo">
                        <img className="rounded-circle img-perfil" alt="Imagen del usuario" src={imagen} />
                        <p className="perf">
                            {this.props.getUsuario().nombre}
                        </p>
                        <p className="perf text-muted">
                            @{this.props.getUsuario().nombreUsuario}
                        </p>
                        <p className="perf">
                            {this.props.getUsuario().correo}
                        </p>
                        <button onClick={this.handleCerrarSesion} type="button" className="btn btn-danger btn-block my-3">Cerrar sesión</button>
                    </div>
                    <div className="col-12 col-md-8 offset-md-4">
                        <div className="row flex-column justify-content-between align-items-center">
                            <div className="col-12">
                                <ListarPagos usuario={this.props.getUsuario()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Perfil;