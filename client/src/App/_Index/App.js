import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "./normalize.css";
import "./App.css";
/**
 * React - Boostrap
 * https://react-bootstrap.github.io/getting-started/introduction 
 * */
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
<<<<<<< HEAD
import Menu from "../Menu/Menu";
=======
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';
>>>>>>> 2f80d0fd33e83cf2da2fa1ebea6714ad97dfc4ce

toast.configure()

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <div>
        <Menu />
=======
      <div className="container-fluid">
        <Navbar />
>>>>>>> 2f80d0fd33e83cf2da2fa1ebea6714ad97dfc4ce
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inicio" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={Registrar} />
          <Route exact path="/espacios" component={Espacios} />
          <Route exact path="/espacios/post" component={PostEspacios} />
          <Route exact path="/reservas" component={Reservas} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_RIGHT} bodyClassName="customBody" />
      <Footer />
    </div>
  );
}

export default App;
