import React from 'react';
import NavBar from '../NavBar/NavBar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Registrar.css';


export default class Registrar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="content-body">
                    <Container className="prueba">
                        <h1 className="title">
                            Registrarse
                        </h1>
                        <div className="border-container">
                            <Container className="registrar-container">
                                <Form className="text-left">
                                    <Form.Group>
                                        <Form.Label>Nombre de usuario *</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Correo *</Form.Label>
                                        <Form.Control type="email"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Contraseña *</Form.Label>
                                        <Form.Control type="password"></Form.Control>
                                    </Form.Group>
                                    <Button variant="success" size="md" block>Registrarse</Button>
                                </Form>
                            </Container>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}