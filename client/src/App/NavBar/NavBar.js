import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './NavBar.css'

export default class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="transparent" variant="dark" expand="lg">
                <Navbar.Brand href="/">ParkIn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/Login">Login</Nav.Link>
                        <Nav.Link href="#link">Registrarse</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}