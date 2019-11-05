import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import axios from "axios";
const url_espacios = "/api/espacios";

export default class PostEspacios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handle_onPost = this.handle_onPost.bind(this);
    this.post_espacio = this.post_espacio.bind(this);
  }

  handle_onPost(event) {
    event.preventDefault();
    const espacio = {
      parqueadero: event.target.parqueadero.value,
      direccion: event.target.direccion.value,
      descripcion: event.target.descripcion.value,
      costo: event.target.costo.value
    };
    this.post_espacio(espacio);
  }

  async post_espacio(espacio) {
    const prom = await axios.post(url_espacios, espacio)
    this.props.history.push("/espacios");
  }

  render() {
    return (
      <div style={{marginTop: '10vh', minHeight: '85vh'}}>
        <Container className="prueba" style={{minWidth: '500px'}}>
          <h1 className="title" >Nueva oferta</h1>
          <div className="border-container">
            <Container className="registrar-container">
              <Form className="text-left" onSubmit={this.handle_onPost}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nombre del parqueadero</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Parqueadero"
                    name="parqueadero"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Dirección del parqueadero</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dirección"
                    name="direccion"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Descripción de la oferta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Descripción"
                    name="descripcion"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Costo por minuto</Form.Label>
                  <Form.Control type="number" min="0" name="costo" />
                </Form.Group>

                <Button variant="success" size="md" block type="submit">
                  Publicar
                </Button>
              </Form>
            </Container>
          </div>
        </Container>
        <div className="d-flex justify-content-center"></div>
      </div>
    );
  }
}
