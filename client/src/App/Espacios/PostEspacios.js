import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        costo: event.target.costo.value,
    };
    this.post_espacio(espacio);
  }

  post_espacio(espacio) {
    fetch('http://localhost:5000/api/espacios', {
        method: "post",
        body: JSON.stringify(espacio),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then( _ => {
        this.props.history.push('/espacios')
      })
      .catch(err => {
        console.log(err.message);
      });
    }


  render() {
    return (
      <div className="d-flex justify-content-center">
        <div>
          <h1>Nueva oferta</h1>
          <Form onSubmit={this.handle_onPost}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre del parqueadero</Form.Label>
              <Form.Control type="text" placeholder="Parqueadero" name="parqueadero" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Dirección del parqueadero</Form.Label>
              <Form.Control type="text" placeholder="Dirección" name="direccion" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Descripción de la oferta</Form.Label>
              <Form.Control type="text" placeholder="Descripción" name="descripcion" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Costo por minuto</Form.Label>
              <Form.Control type="number" min="0" name="costo" />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
