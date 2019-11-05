import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import "./Pagar.css";

const cookies = new Cookies();

export default class Pagar extends Component {

    constructor(props){
        super(props);
        this.state = {
            idReserva :cookies.get('_idReserva'),
            idEspacio : cookies.get('_idEspacio'),
        };
    }

    render(){
        return(
            <div className="content-body host">
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="4" large="4" xl="4">
                            <h2 className="title font-weight-bold">
                                Pagar {this.state.idReserva} {this.state.idEspacio}
                            </h2>
                        </Col>
                        <Col xs="0" sm="1" md="4" large="4" xl="4"></Col>
                    </Row>
                    <Row className="justify-content-lg-center">
                        <Col xs="0" sm="1" md="3" large="4" xl="4"></Col>
                        <Col xs="12" sm="10" md="6" large="4" xl="4">
                            <div className="pago-container">
                                <Form className="text-left">
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}