import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import "./Login.css";

const cookies = new Cookies();

let jwt = require('jsonwebtoken');

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

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            incorrectLogin: false,
            errMsg: '',
            errors: {
                username: '',
                nombre: '',
                email: '',
                contrasenha: ''
            }
        }

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'nombreUsuario':
                errors.nombreUsuario =
                    value.length < 5
                        ? 'El nombre de usuario debe tener por lo menos 5 caracteres'
                        : '';
                break;
            case 'contrasenia':
                errors.contrasenia =
                    value.length < 5
                        ? 'La contraseña debe tener por lo menos 5 caracteres'
                        : '';
                break;
            default:
        }
    }

    async login(username, pass) {
        await axios.post(
            'http://localhost:5000/api/usuarios/login',
            {
                "nombreUsuario": username,
                "contrasenia": pass
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            if(response.data.success){
                cookies.set('token', response.data.token);
                this.props.history.push('/');
                toast.success(`Bienvenido ${jwt.decode(cookies.get('token')).nombre}`);
            }
            else{
                this.setState({ username: this.state.username, password: this.state.password, incorrectLogin: true, errMsg: response.data.message })
                toast.error(response.data.message);
            }


        }).catch(err => {
            this.setState({ username: this.state.username, password: this.state.password, incorrectLogin: true, errMsg: "Campos vacíos o login o contraseña incorrectos" })
            toast.error("¡Hubo un error en el inicio de sesión!");
        })
    }

    handleUserChange(event) {
        this.handleChange(event);
        this.setState({
            username: event.target.value,
            password: this.state.password
        });
    }

    handlePassChange(event) {
        this.handleChange(event);
        this.setState({
            username: this.state.username,
            password: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(validateForm(this.state.errors))
        if (this.state.username !== "" && !this.state.password !== "" && validateForm(this.state.errors)) {
            this.login(this.state.username, this.state.password);
        }
    }

    render() {
        let incorrectMessage;

        if (this.state.incorrectLogin) {
            incorrectMessage =
                <Container className="error">
                    Hay campos vacíos o login o contraseña incorrectos
                </Container>
        }

        return (
            <div className="content-body host">
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="4" large="4" xl="4">
                            <h2 className="title font-weight-bold">
                                Ingresar
                            </h2>
                        </Col>
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                    </Row>
                    {incorrectMessage}
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="3" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="6" large="4" xl="4">
                            <div className="border-container">
                                <div className="login-container">
                                    <Form className="text-left">
                                        <Form.Group>
                                            <Form.Label>Nombre de usuario</Form.Label>
                                            <Form.Control name="nombreUsuario" required type="text" onChange={this.handleUserChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control name="contrasenia" type="password" onChange={this.handlePassChange}></Form.Control>
                                        </Form.Group>
                                        <Button variant="success" size="md" block onClick={this.handleSubmit}>Ingresar</Button>
                                    </Form>
                                </div>
                            </div>

                        </Col>
                        <Col xs="0" sm="1" md="3" large="4" xl="4"></Col>
                    </Row>

                </Container>
                <Container className="cuenta-inexistente">
                    <Row>
                        <Col>
                            <Link href="/registrar">¿No tienes cuenta? Regístrate</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
