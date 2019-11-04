import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import './NavBar.css'

let jwt = require('jsonwebtoken');
const cookies = new Cookies();

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: jwt.decode(cookies.get("token"))
        }
        this.logout = this.logout.bind(this);
    }

    logout(){
        cookies.remove('token');
        this.setState({user: undefined});
        // window.location.reload();
        this.forceUpdate();
    }

    render() {
        let username;

        if (this.state.user) {
            username =
                <Row><Nav.Link href="/Perfil">{this.state.user.nombre}</Nav.Link><Button variant="link" onClick={this.logout}>Cerrar sesión</Button></Row>
        }
        else {
            username =<Row><Nav.Link href="/Login">Login</Nav.Link><Nav.Link href="/Registrar">Registrarse</Nav.Link></Row>
        }

        return (
            <div className="nav-bar">
                <Navbar bg="transparent" variant="dark" expand="lg">
                    <Navbar.Brand href="/">ParkIn</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {username}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}