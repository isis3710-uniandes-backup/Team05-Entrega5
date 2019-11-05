import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import './Perfil.css';
import imagen from '../../assets/user.png';

import ListarPagos from './ListarPagos';

let jwt = require('jsonwebtoken');
const cookies = new Cookies();

class Perfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: jwt.decode(cookies.get("token"))
        };
    }

    

    handleCerrarSesion(event) {
        event.preventDefault();
        // this.props.removeUsuario();
        // toast.success('¡Vuelve pronto 😊!');
    }

    render() { 
        return ( 
            <div className="container host">
                <div className="row">
                    <div className="col-12 col-md-4 text-center d-flex flex-column justify-content-center align-items-center fijo">
                        <img className="rounded-circle img-perfil" alt="Imagen del usuario" src={imagen} />
                        <p className="perf">
                            {this.state.usuario.nombre}
                        </p>
                        <p className="perf text-muted">
                            @{this.state.usuario.nombreUsuario}
                        </p>
                        <p className="perf">
                            {this.state.usuario.correo}
                        </p>
                        <button onClick={this.handleCerrarSesion} type="button" className="btn btn-danger btn-block my-3">Cerrar sesión</button>
                    </div>
                    <div className="col-12 col-md-8 offset-md-4">
                        <div className="row flex-column justify-content-between align-items-center">
                            <div className="col-12">
                                <ListarPagos usuario={this.state.usuario} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Perfil;