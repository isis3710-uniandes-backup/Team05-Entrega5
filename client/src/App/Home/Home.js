import React from "react";

/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */
import Reservar from '../Reservar/Reservar.js';
import NavBar from '../NavBar/NavBar.js';
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <NavBar />
        <div className="reservar">
          <Reservar />
        </div>
      </div>
    );
  }
}

export default Home;
