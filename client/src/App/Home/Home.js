import React from "react";

/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */
import Reservar from '../Reservar/Reservar.js';
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <div className="reservar">
          <Reservar />
        </div>
      </div>
    );
  }
}

export default Home;
