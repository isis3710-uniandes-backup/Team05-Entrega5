import React from "react";

/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */ 
import Container from "react-bootstrap/Container";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container>
          <h1>ParkIn</h1>
        </Container>
      </div>
    );
  }
}

export default Home;
