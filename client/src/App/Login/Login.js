import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import NavBar from '../NavBar/NavBar.js';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'


import "./Login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="prueba">
                    <h1 className="titulo">
                        Iniciar sesión
                </h1>
                    <div className="border-container">
                        <Container className="login-container">
                            <Form className="text-left">
                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Escribe tu correo"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password"></Form.Control>
                                </Form.Group>
                                <Button variant="success" size="md" block>Ingresar</Button>
                            </Form>
                        </Container>
                    </div>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            ¿No tienes cuenta? <Nav.Link href="/Registrar">Regístrate</Nav.Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}