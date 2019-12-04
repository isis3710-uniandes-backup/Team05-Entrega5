import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Cookies from 'universal-cookie';

import { FormattedMessage } from "react-intl";


const url_espacios = "/api/espacios";

const cookies = new Cookies();

const headers = {
  'Content-Type' : 'application/json',
  'authorization' : cookies.get('token')
}

export default class PostEspacios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parqueadero: "",
      direccion: "",
      descripcion: "",
      costo: 1
    }

    this.handle_onPost = this.handle_onPost.bind(this);
    this.post_espacio = this.post_espacio.bind(this);

    this.changeCosto = this.changeCosto.bind(this);
    this.changeDescripcion = this.changeDescripcion.bind(this);
    this.changeDireccion = this.changeDireccion.bind(this);
    this.changeParqueadero = this.changeParqueadero.bind(this);
  }

  changeParqueadero(event) {
    let content = event.target.value;
    this.setState({ parqueadero: content });
  }

  changeDireccion(event) {
    let content = event.target.value;
    this.setState({ direccion: content });
  }

  changeDescripcion(event) {
    let content = event.target.value;
    this.setState({ descripcion: content });
  }

  changeCosto(event) {
    let content = event.target.value;
    this.setState({ costo: content });
  }

  handle_onPost(event) {
    event.preventDefault();
    // const espacio = {
    //   parqueadero: event.target.parqueadero.value,
    //   direccion: event.target.direccion.value,
    //   descripcion: event.target.descripcion.value,
    //   costo: event.target.costo.value
    // };
    const espacio = this.state;
    this.post_espacio(espacio);
  }

  async post_espacio(espacio) {
    await axios.post(url_espacios, espacio, {headers:headers})
      .then(() => this.props.history.push("/espacios"))
      .catch((err) => toast.error("Ocurrió un error al crear el espacio. Por favor inténtalo de nuevo."));
  }

  validate() {
    return this.state.parqueadero.length > 0 && this.state.direccion.length > 0 && this.state.descripcion.length > 0;
  }

  render() {
    return (
      <div className="host">
        <Container className="prueba" style={{minWidth: '500px'}}>
          <h1 className="title med font-weight-bold pt-4" >
            <FormattedMessage id="NuevaOferta" />
          </h1>
          <div className="border-container">
            <Container className="registrar-container">
              <small className="text-muted">
                <FormattedMessage id="CamposOferta" />
              </small>
              <Form className="text-left" onSubmit={this.handle_onPost}>
                <Form.Group>
                  <Form.Label htmlFor="parqueadero">
                    <FormattedMessage id="NombreOferta" />
                  </Form.Label>
                  <Form.Control
                    id="parqueadero"
                    type="text"
                    placeholder="Ingrese el Nombre"
                    title="Nombre del parqueadero"
                    name="parqueadero"
                    value={this.state.parqueadero}
                    onChange={this.changeParqueadero}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="direccion">
                    <FormattedMessage id="DirOferta" />
                  </Form.Label>
                  <Form.Control
                    id="direccion"
                    type="text"
                    placeholder="Ingrese la dirección"
                    title="Dirección del parqueadero"
                    name="direccion"
                    value={this.state.direccion}
                    onChange={this.changeDireccion}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="descripcion">
                    <FormattedMessage id="DescOferta" />
                  </Form.Label>
                  <Form.Control
                    id="descripcion"
                    type="text"
                    placeholder="Ingrese la descripción"
                    title="Descripción del parqueadero"
                    name="descripcion"
                    value={this.state.descripcion}
                    onChange={this.changeDescripcion}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="costo">
                    <FormattedMessage id="CostoOferta" />
                  </Form.Label>
                  <Form.Control id="costo" type="number" min="1" name="costo" value={this.state.costo} onChange={this.changeCosto} />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="but-solid" disabled={!this.validate()}>
                    <FormattedMessage id="PublicarOferta" />
                  </button>
                </div>
              </Form>
            </Container>
          </div>
        </Container>
        <div className="d-flex justify-content-center"></div>
      </div>
    );
  }
}
