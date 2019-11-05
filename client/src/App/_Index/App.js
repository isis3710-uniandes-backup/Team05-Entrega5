import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "./normalize.css";
import "./App.css";

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Home from "../Home/Home";
import NotFound from "../404/NotFound";
import Espacios from "../Espacios/Espacios";
import PostEspacios from "../Espacios/PostEspacios";
import Login from "../Login/Login.js";
import Registrar from '../Registrar/Registrar.js';
import Reservas from '../Reservas/Reservas.js';
import Menu from "../Menu/Menu";
import Footer from '../Footer/Footer';
import Perfil from "../Perfil/Perfil";

toast.configure()

function App() {
  return (
    <div className="App">

      <div className="container-fluid">
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={Registrar} />
          <Route exact path="/espacios" component={Espacios} />
          <Route exact path="/espacios/post" component={PostEspacios} />
          <Route exact path="/reservas" component={Reservas} />
          <Route exact path="/perfil" component={Perfil} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_RIGHT} bodyClassName="customBody" />
      <Footer />
    </div>
  );
}

export default App;
