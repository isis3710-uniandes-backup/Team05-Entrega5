import React from "react";

import Container from "react-bootstrap/Container";

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
    fetch("http://localhost:5000/api/espacios", {
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
        <div className="row">
          {this.state.espacios.map((x, i) => {
            return (
              <div key={i} className="col-md-4" style={{ marginTop: "2em" }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{x.parqueadero}</h5>
                    <p className="card-text">{x.descripcion}</p>
                    <a href="#" className="btn btn-primary">
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
