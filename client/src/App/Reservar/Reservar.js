import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import Row from 'react-bootstrap/Row'

import './Reservar.css'

export default class Reservar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            focused: null
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
                                    <Form.Control type="email" placeholder="Empieza a escribir algún sector"></Form.Control>
                                </Form.Group>
                                <FormGroup>
                                    <Form.Label>¿Para qué fecha?</Form.Label>
                                    <Row>

                                    </Row>
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
                                        onDateChange={date => this.handleDateChange(date)}
                                        focused={this.state.focused}
                                        onFocusChange={({ focused }) =>
                                            this.setState({ focused })
                                        }
                                        openDirection="up"
                                        hideKeyboardShortcutsPanel={true}
                                    />
                                </FormGroup>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}