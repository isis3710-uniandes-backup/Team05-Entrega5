import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

import './Reservar.css'

export default class Reservar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: null,
            fechaFin: null,
            motivo: null,
            estado: null
        }
    }

    render() {
        return (
            <div>
                <div className="card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title className="card-title">
                                Reserva parqueaderos de acuerdo con tus necesidades.
                            </Card.Title>
                            <Form className="card-label">
                                <Form.Group controlId="sectorForm">
                                    <Form.Label>¿En qué sector te gustaría?</Form.Label>
                                    <Form.Control type="text" placeholder="Empieza a escribir algún sector"></Form.Control>
                                </Form.Group>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <Form.Label>¿Para qué fecha?</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Label>¿Para qué hora?</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <SingleDatePicker
                                                showClearDate={true}
                                                // customInputIcon={
                                                //     <svg className="icon icon-small">
                                                //         <Icon
                                                //             icon="ICON_CALENDER"
                                                //             className="icon icon-large"
                                                //         />
                                                //     </svg>
                                                // }
                                                inputIconPosition="after"
                                                small={true}
                                                block={false}
                                                numberOfMonths={1}
                                                date={this.state.date}
                                                onDateChange={date => this.handleDateChange.bind(date)}
                                                focused={this.state.focused}
                                                onFocusChange={({ focused }) =>
                                                    this.setState({ focused })
                                                }
                                                openDirection="up"
                                                hideKeyboardShortcutsPanel={true}
                                            />
                                        </Col>
                                        <Col>
                                            <div className="time-picker">
                                                <TimePicker
                                                    required={true}
                                                    disableClock={true}
                                                    clearIcon={null}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <div className="search-button">
                                    <Button variant="danger" onSubmit={this.handle_post}>Buscar</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }

    handleDateChange(data) {
        this.setState({ fechaInicio: data });
    }


    handle_onPost(event) {
        event.preventDefault();
        const reserva = {
            fechaInicio: this.state.fechaInicio,
            fechaFin: null,
            motivo: event.target.motivo.value,
            estado: event.target.estado.value,
        };
        this.post_reserva(reserva);
    }

    post_reserva(reserva) {
        fetch('/api/reservas', {
            method: "post",
            body: JSON.stringify(reserva),
            headers: {
                "Content-Type": "application/json",
                "authorization" : cookies.get('token')
            }
        })
            .then(_ => {
                this.props.history.push('/reservas')
            })
            .catch(err => {
                console.log(err.message);
            });
    }

}