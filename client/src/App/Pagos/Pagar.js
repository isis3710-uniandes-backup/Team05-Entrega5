import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import "./Pagar.css";
import axios from 'axios';

const cookies = new Cookies();

const headers = {
    'Content-Type' : 'application/json',
    'authorization' : cookies.get('token')
  }

export default class Pagar extends Component {

    constructor(props){
        super(props);
        this.state = {
            idReserva :cookies.get('_idReserva'),
            idEspacio : cookies.get('_idEspacio'),
            costo : 0,
            metodo: "Tarjeta de Credito",
        };


    }

    componentDidMount(){
        axios.get(`/api/espacios/${this.state.idEspacio}`,{headers:headers})
        .then(x =>{
            this.setState({costo : x.data[0].costo})
        })
        .catch(err => toast.error(`Hubo un error obteniendo el costo :( -> ${err}`));
    }

    handleSubmit(){
        const pago = {
            cantidad : this.state.costo,
            metodoPago : this.state.metodo,
            _idReserva : this.state.idReserva
        };
        this.postPago(pago);
    }
    async postPago(pago) {
        await axios.post('/api/pagos', pago, {headers:headers}).then((p) => {
          this.props.history.push('perfil');
          toast.success(`Pagaste correctamente con : ${this.state.metodo}`)
        });
    }

    render(){
        return(
            <div className="content-body host">
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="4" large="4" xl="4">
                            <h1 className="title font-weight-bold med">
                                Pagar
                            </h1>
                        </Col>
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                    </Row>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="3" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="6" large="4" xl="4">
                            <div className="pago-container">
                                <Form className="text-left">
                                    <Form.Group>
                                        <Form.Label><h2 className="mt-3">Resumen</h2></Form.Label>
                                        <strong className="mt-3">Costo: {this.state.costo}</strong>
                                        <Form.Label><h3 className="mt-3">Escoje el método de pago:</h3></Form.Label>
                                        <ButtonToolbar aria-label="Opciones de Método de Pago">
                                            <ButtonGroup vertical className="d-flex justify-content-center" size="lg">
                                                <button variant="success" className="justify-content-between align-items-center" onClick={() => {this.setState({metodo: "Tarjeta de Credito" })}}>
                                                    <img className="float-left" src="https://i.ibb.co/k55F3Hq/credit-card.png" alt="Icono tarjeta" width="55" height="55"/>
                                                    <strong> Tarjeta de Crédito</strong>
                                                </button>
                                                <button variant="success" className="justify-content-between align-items-center" onClick={() => {this.setState({metodo: "Efectivo" })}}>
                                                    <img className="float-left" src="https://i.ibb.co/DpfD4wP/money-1.png" alt="Icono efectivo" width="55" height="55"/>
                                                    <strong> Efectivo</strong>
                                                </button>
                                                <button variant="success" className=" justify-content-between align-items-center" onClick={() => {this.setState({metodo: "Transacción Bancaria" })}}>
                                                    <img className="float-left" src="https://i.ibb.co/YkCHJmV/leather-wallet.png" alt="Icono transacción bancaria" width="55" height="55"/>
                                                    <strong> Cuenta</strong>
                                                </button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Form.Group>
                                    <Button variant="success" size="md" block onClick={() => {this.setState(this.handleSubmit)}}>Pagar</Button>
                                </Form>
                            </div>
                        </Col>
                        <Col xs="0" sm="1" md="3" large="4" xl="4"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}