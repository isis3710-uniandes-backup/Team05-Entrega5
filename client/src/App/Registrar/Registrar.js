import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import './Registrar.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormattedMessage } from 'react-intl';

const validEmailRegex = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => {
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
                        ? <FormattedMessage id="login.errorNombreUsuario" />
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : <FormattedMessage id="registrarse.errorCorreo"/>;
                break;
            case 'password':
                errors.contrasenha =
                    value.length < 8
                        ? <FormattedMessage id="registrarse.errorContrasenia" />
                        : '';
                break;
            case 'nombre':
                errors.nombre =
                    value.length < 5
                        ? <FormattedMessage id="registrarse.errorNombre" />
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
        await axios.post(
            '/api/usuarios',
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
                toast.success(<FormattedMessage id="toast.exitoRegistro"/>);
            }
            else {
                this.setState({
                    username: this.state.username,
                    nombre: this.state.nombre,
                    correo: this.state.correo,
                    contrasenha: this.state.contrasenha,
                    error: true
                });
                toast.error(response.data.message);
            }

        });
    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username !== "" && !this.state.nombre !== "" && !this.state.correo !== "" && !this.state.contrasenha !== "" && validateForm(this.state.errors)) {
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
            toast.error(<FormattedMessage id="toast.errorRegistro"/>);
        }
    }

    renderRedirect() {
        if (this.props.getUsuario()) {
            return <Redirect to='/perfil' />
        }
    }

    render() {
        const { errors } = this.state;

        let incorrectMessage;

        if (this.state.error) {
            incorrectMessage =
                <Container className="error">
                    <FormattedMessage id="registrarse.errorCamposVacios" />
                </Container>
        }

        return (
            <div className="content-body host">
                <div>{this.renderRedirect()}</div>
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="0" md="3" large="3" xl="3"></Col>
                        <Col xs="12" sm="12" md="6" large="6" xl="6">
                            <h1 className="title font-weight-bold med">
                                <FormattedMessage id="registrarse.tituloRegistrarse" />
                            </h1>
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
                                        <small className="text-muted"><FormattedMessage id="registrarse.info"/></small>
                                        <Form.Group>
                                            <Form.Label htmlFor="username"><FormattedMessage id="registrarse.campoNombreUsuario"/> *</Form.Label>
                                            <Form.Control type="text" id="username" autoComplete="new-password" name="username" placeholder="(e.g: userio)" onChange={this.handleUsername}></Form.Control>
                                            {errors.username.length > 0 &&
                                                <span className='error'>{errors.username}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="nombre"><FormattedMessage id="registrarse.campoNombre"/> *</Form.Label>
                                            <Form.Control type="name" id="nombre" name="nombre" placeholder="(e.g: Pepito Pérez)" onChange={this.handleNombre}></Form.Control>
                                            {errors.nombre.length > 0 &&
                                                <span className='error'>{errors.nombre}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="email"><FormattedMessage id="registrarse.campoCorreo"/> *</Form.Label>
                                            <Form.Control type="email" id="email" name="email" placeholder="(e.g: correo@gmail.com)" onChange={this.handleCorreo}></Form.Control>
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="password"><FormattedMessage id="registrarse.campoContrasenia"/> *</Form.Label>
                                            <Form.Control type="password" id="password" autoComplete="new-password" name="password" placeholder="(e.g: contra$enia)" onChange={this.handleContrasenha}></Form.Control>
                                            {errors.contrasenha.length > 0 &&
                                                <span className='error'>{errors.contrasenha}</span>}
                                        </Form.Group>
                                        <div className="d-flex justify-content-center pt-3">
                                            <button type="submit" className="but-solid" onClick={this.handleSubmit}><FormattedMessage id="registrarse.botonRegistrarse"/></button>
                                        </div>
                                    </Form>
                                </Container>
                            </div>
                        </Col>
                        <Col xs="1" sm="1" md="3" large="4" xl="4"></Col>
                    </Row>
                    <Container className="cuenta-existente pb-4">
                        <Row>
                            <Col>
                                <Link to="/login"><FormattedMessage id="registrarse.mensajeIngresar"/></Link>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        )
    }
}