import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./Home.css";
import parking from '../../assets/parking.png';
import { FormattedMessage } from "react-intl";

class Home extends Component {

  /**
   * Revisa si el usuario está registrado para llevarlo a calcular la huella o a loguearse
   */
  revisarUsuario() {
    // La dirección a donde lo manda dependiendo de si está logueado o no 
    // Se mira si está logueado y se cambia la dirección a donde lo manda
    let direccion = this.props.getUsuario() ? '/espacios' : '/login';

    return (
        <Link to={direccion}>
            <button className="but-outline"><FormattedMessage id="home.iniciaAhora"/></button>
        </Link>
    );
  }

  render() {
    return (
      <div className="container host d-flex align-items-center">
        <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-left my-5 my-md-0">
              <h1 className="font-weight-bold display-4"><FormattedMessage id="home.titulo"/></h1>
              <p className="py-4 text-muted">
                <FormattedMessage id="home.descripcion" />
              </p>
              <div className="d-flex justify-content-end">
                {this.revisarUsuario()}
              </div>                        
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <img className="banner my-5 my-md-0" src={parking} alt="Imagen de auto parqueado" />
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
