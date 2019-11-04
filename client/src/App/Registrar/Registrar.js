import React from 'react';
import NavBar from '../NavBar/NavBar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import axios from 'axios';

import './Registrar.css';

const cookies = new Cookies();

export default class Registrar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            nombre: '',
            correo: '',
            contrasenha: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleCorreo = this.handleCorreo.bind(this);
        this.handleContrasenha = this.handleContrasenha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value,
            nombre: this.state.nombre,
            correo: this.state.correo,
            contrasenha: this.state.contrasenha
        })
    }

    handleNombre(event) {
        this.setState({
            username: this.state.username,
            nombre: event.target.value,
            correo: this.state.correo,
            contrasenha: this.state.contrasenha
        })
    }

    handleCorreo(event) {
        this.setState({
            username: this.state.username,
            nombre: this.state.nombre,
            correo: event.target.value,
            contrasenha: this.state.contrasenha
        })
    }

    handleContrasenha(event) {
        this.setState({
            username: this.state.username,
            nombre: this.state.nombre,
            correo: this.state.correo,
            contrasenha: event.target.value
        })
    }

    async registrar(username, password, nombre, correo) {
        try{
            const response = await axios.post(
                'http://localhost:5000/registrar/registrar',
                {
                    "username": username,
                    "password": password,
                    "rol": "cliente",
                    "nombre": nombre,
                    "correo": correo
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            this.props.history.push('/Login')
        }
        catch(err) {
            throw err;
        }

    }

    handleSubmit(event) {
        this.registrar(this.state.username, this.state.contrasenha, this.state.nombre, this.state.correo);
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
                                        <Form.Control type="text" onChange={this.handleUsername}></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nombre completo *</Form.Label>
                                        <Form.Control type="name" onChange={this.handleNombre}></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Correo *</Form.Label>
                                        <Form.Control type="email" onChange={this.handleCorreo}></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Contraseña *</Form.Label>
                                        <Form.Control type="password" onChange={this.handleContrasenha}></Form.Control>
                                    </Form.Group>
                                    <Button variant="success" size="md" block onClick={this.handleSubmit}>Registrarse</Button>
                                </Form>
                            </Container>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}