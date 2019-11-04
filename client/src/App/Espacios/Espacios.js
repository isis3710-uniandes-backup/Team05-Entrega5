import React from "react";

import './Espacios.css'

export default class Espacios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      espacios: []
    };

    this.get_espacios = this.get_espacios.bind(this);
  }

  componentDidMount() {
    this.get_espacios();
  }

  get_espacios() {
    fetch("/api/espacios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log(response.status, "The response was not OK");
      })
      .then(data => {
        if (data) {
          this.setState({ espacios: data });
        }
      })
      .catch(err => {
        console.log("Get Espacios Error ::", err.message);
      });
  }

  render() {
    return (
      <div>

        <div style={{height: '10vh'}}>
          &nbsp;
        </div>

        <h1>
          Espacios disponibles
        </h1>

        <div className="row" id="CardsContainer">
          {this.state.espacios.map((x, i) => {
            return (
              <div key={i} className="col-md-4" style={{ marginTop: "2em" }}>
                <div className="card" style={{ textAlign: 'left' }}>
                  <div className="card-body">
                    <h5 className="card-title">{x.parqueadero}</h5>
                    <p className="card-text">{x.descripcion}</p>
                    <a href="#" className="btn btn-primary" style={{ float: 'right' }}>
                      Reservar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
