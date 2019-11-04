import React from "react";
import Cookies from 'universal-cookie';
/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */
import Reservar from '../Reservar/Reservar.js';
import NavBar from '../NavBar/NavBar.js';
import "./Home.css";
let jwt = require('jsonwebtoken');
const cookies = new Cookies();


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: jwt.decode(cookies.get('token'))
    };
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
