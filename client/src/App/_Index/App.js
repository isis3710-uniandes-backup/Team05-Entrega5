import React from 'react';
import './normalize.css'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar/NavBar.js';
import Reservar from '../Reservar/Reservar.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="reservar">
        <Reservar />
      </div>
    </div>
  );
}

export default App;
