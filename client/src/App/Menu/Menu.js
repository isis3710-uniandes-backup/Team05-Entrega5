import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import './Menu.css'
import logo from '../../assets/logo.svg';
import imagen from '../../assets/user.png';

import { FormattedMessage } from "react-intl";


export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.removeUsuario();
        toast.success('¡Vuelve pronto 😊!');
    }

    listarEnlaces() {
        if(this.props.getUsuario()) {
            return (
                <ul className="navbar-nav ml-0 align-items-end">
                    <li className="nav-item mx-md-2">
                        <Link to="/espacios" className="nav-link">
                            <FormattedMessage id="EspaciosMenu" />
                        </Link></li>
                    <li className="nav-item mx-md-2">
                        <Link to="/reservas" className="nav-link">
                            <FormattedMessage id="ReservasMenu" />
                        </Link>
                        </li>
                    {this.revisarLogin()}
                </ul>
            );
        }
        else {
            return (
                <ul className="navbar-nav ml-0 align-items-end">
                    {this.revisarLogin()}
                </ul>
            );
        }
    }

    revisarLogin() {
        if(this.props.getUsuario()) {
            return (
                <li className="nav-item dropdown ml-5">
                    <div id="drop" role="button" tabIndex="0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="rounded-circle profilePic" src={imagen} width="45" height="45" alt="Imagen del perfil" />
                    </div>
                    <div className="dropdown-menu dropdown-menu-sm-right" aria-labelledby="drop">
                        <Link className="dropdown-item" to="/perfil">Mi Perfil</Link>
                        <Link className="dropdown-item" to="/" onClick={this.logout}>Cerrar Sesión</Link>
                    </div>
                </li>
            );
        }
        else {
            return (
                <li className="nav-item dropdown ml-5">
                    <div className="but-solid" id="drop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Entrar
                    </div>
                    <div className="dropdown-menu dropdown-menu-sm-right" aria-labelledby="drop">
                        <Link className="dropdown-item" to="/login">Ingresar</Link>
                        <Link className="dropdown-item" to="/registrar">Registrarse</Link>
                    </div>
                </li>
            );
        }
    }

    render() {
        // let username;

        // if (this.state.user) {
        //     username =
        //         <Row><Nav.Link href="/perfil">{this.state.user.nombre}</Nav.Link><Button variant="link" onClick={this.logout}>Cerrar sesión</Button></Row>
        // }
        // else {
        //     username =<Row><Nav.Link href="/login">Login</Nav.Link><Nav.Link href="/registrar">Registrarse</Nav.Link></Row>
        // }
        return (
            <nav className="fixed-top navbar navbar-expand-md bg-white shadow navbar-light">
                <Link className="navbar-brand d-flex align-items-center ml-3 font-weight-bold" to="/" title="Inicio">
                    <img src={logo} className="d-inline-block mr-2" width="45" height="45" alt="ParkIn logo" />
                    <span className="prefix">Park</span>In
                </Link>
                <button className="navbar-toggler mr-md-4" type="button" data-toggle="collapse" data-target="#thebar" aria-controls="thebar" aria-expanded="false" aria-label="Toggle Navigation Menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="thebar" className="collapse navbar-collapse justify-content-end mr-md-4">
                    {this.listarEnlaces()}
                </div>
            </nav>
        )
    }
}