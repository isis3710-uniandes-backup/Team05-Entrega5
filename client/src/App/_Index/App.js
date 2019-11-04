import React from "react";

import "./normalize.css";
import "./App.css";
/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../404/NotFound";
import Espacios from "../Espacios/Espacios";
import PostEspacios from "../Espacios/PostEspacios";
import Login from "../Login/Login.js";
import Registrar from '../Registrar/Registrar.js';
import Reservas from '../Reservas/Reservas.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/inicio" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Registrar" component={Registrar} />
        <Route exact path="/espacios" component={Espacios} />
        <Route exact path="/espacios/post" component={PostEspacios} />
        <Route exact path="/reservas" component={Reservas} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
