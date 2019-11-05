import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Registrar.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => {
            console.log(val.length);
            if (val.length > 0) {
                valid = false
            }
        }
    );
    return valid;
}

export default class Registrar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            nombre: '',
            correo: '',
            contrasenha: '',
            error: false,
            errors: {
                username: '',
                nombre: '',
                email: '',
                contrasenha: ''
            }
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleCorreo = this.handleCorreo.bind(this);
        this.handleContrasenha = this.handleContrasenha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'El nombre de usuario debe tener por lo menos 5 caracteres'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'El correo ingresado no es válido';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'La contraseña debe tener por lo menos 8 caracteres'
                        : '';
                break;
            case 'nombre':
                errors.nombre =
                    value.length < 5
                        ? 'El nombre debe tener más de 5 caracteres'
                        : '';
                break;
            default:
        }
    }

    handleUsername(event) {
        this.handleChange(event);
        this.setState({
            username: event.target.value,
            nombre: this.state.nombre,
            correo: this.state.correo,
            contrasenha: this.state.contrasenha,
            error: false
        })
    }

    handleNombre(event) {
        this.handleChange(event);
        this.setState({
            username: this.state.username,
            nombre: event.target.value,
            correo: this.state.correo,
            contrasenha: this.state.contrasenha,
            error: false
        })
    }

    handleCorreo(event) {
        this.handleChange(event);
        this.setState({
            username: this.state.username,
            nombre: this.state.nombre,
            correo: event.target.value,
            contrasenha: this.state.contrasenha,
            error: false
        })
    }

    handleContrasenha(event) {
        this.handleChange(event);
        this.setState({
            username: this.state.username,
            nombre: this.state.nombre,
            correo: this.state.correo,
            contrasenha: event.target.value,
            error: false
        })
    }

    async registrar(username, password, nombre, correo) {
        const response = await axios.post(
            'http://localhost:5000/api/usuarios',
            {
                "nombreUsuario": username,
                "contrasenia": password,
                "rol": "USUARIO",
                "nombre": nombre,
                "correo": correo
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            if(response.data.success){
                this.props.history.push('/login');
                toast.success("¡Registro exitoso!");
            }
            else {
                this.setState({
                    username: this.state.username,
                    nombre: this.state.nombre,
                    correo: this.state.correo,
                    contrasenha: this.state.contrasenha,
                    error: true
                });
                toast.error("¡Hubo un error en el registro!");
            }

        });
    }


    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.username === "" && !this.state.nombre === "" && !this.state.correo === "" && !this.state.contrasenha === "" && validateForm(this.state.errors)) {
            this.registrar(this.state.username, this.state.contrasenha, this.state.nombre, this.state.correo);
        }
        else{
            this.setState({
                username: this.state.username,
                nombre: this.state.nombre,
                correo: this.state.correo,
                contrasenha: this.state.contrasenha,
                error: true
            });
            toast.error("¡Hubo un error en el registro!");
        }
    }

    render() {
        const { errors } = this.state;

        let incorrectMessage;

        if (this.state.error) {
            incorrectMessage =
                <Container className="error">
                    Hay campos vacíos
                </Container>
        }

        return (
            <div className="content-body host">
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="0" md="3" large="3" xl="3"></Col>
                        <Col xs="12" sm="12" md="6" large="6" xl="6">
                            <h2 className="title font-weight-bold">
                                Registrarse
                            </h2>
                        </Col>
                        <Col xs="0" sm="0" md="3" large="3" xl="3"></Col>
                    </Row>
                    {incorrectMessage}
                    <Row className="justify-content-lg-center">
                        <Col xs="1" sm="1" md="3" large="4" xl="4"></Col>
                        <Col xs="10" sm="10" md="6" large="4" xl="4">
                            <div className="border-container">
                                <Container className="registrar-container">
                                    <Form className="text-left">
                                        <Form.Group>
                                            <Form.Label>Nombre de usuario *</Form.Label>
                                            <Form.Control type="text" autoComplete="new-password" name="username" onChange={this.handleUsername}></Form.Control>
                                            {errors.username.length > 0 &&
                                                <span className='error'>{errors.username}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Nombre completo *</Form.Label>
                                            <Form.Control type="name" name="nombre" onChange={this.handleNombre}></Form.Control>
                                            {errors.nombre.length > 0 &&
                                                <span className='error'>{errors.nombre}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Correo *</Form.Label>
                                            <Form.Control type="email" name="email" onChange={this.handleCorreo}></Form.Control>
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Contraseña *</Form.Label>
                                            <Form.Control type="password" autoComplete="new-password" name="password" onChange={this.handleContrasenha}></Form.Control>
                                            {errors.contrasenha.length > 0 &&
                                                <span className='error'>{errors.contrasenha}</span>}
                                        </Form.Group>
                                        <Button variant="success" size="md" block onClick={this.handleSubmit}>Registrarse</Button>
                                    </Form>
                                </Container>
                            </div>
                        </Col>
                        <Col xs="1" sm="1" md="3" large="4" xl="4"></Col>
                    </Row>
                    <Container className="cuenta-existente">
                        <Row>
                            <Col>
                                <Link href="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        )
    }
}