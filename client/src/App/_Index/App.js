import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { PrivateRoute } from './SpecialRoutes.js';

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
import Pagar from "../Pagos/Pagar.js";
import Cookies from 'universal-cookie';

toast.configure()

let jwt = require('jsonwebtoken');
const cookies = new Cookies();

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: jwt.decode(cookies.get('token'))
    }

    this.setUsuario = this.setUsuario.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
    this.removeUsuario = this.removeUsuario.bind(this);
  }

  setUsuario(token){
    cookies.set('token', token);
    this.setState({user: jwt.decode(cookies.get('token'))});
  }

  getUsuario() {
    return this.state.user;
  }

  removeUsuario() {
    this.setState({user: undefined});
    cookies.remove('token');
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <Menu getUsuario={this.getUsuario} removeUsuario={this.removeUsuario}  />
          <Switch>
            <Route exact path="/" component={(props) => <Home {...props} getUsuario={this.getUsuario}/>} />
            <Route exact path="/login" component={(props) => <Login {...props} setUsuario={this.setUsuario} />} />
            <Route exact path="/registrar" component={Registrar} />
            <Route exact path="/pagar" component={Pagar}/>
            <Route exact path="/espacios" component={ (props) => <Espacios {...props} getUsuario={this.getUsuario} />} getUsuario={this.getUsuario} />
            <Route exact path="/espacios/post" component={(props) => <PostEspacios {...props} getUsuario={this.getUsuario} />} getUsuario={this.getUsuario} />
            <PrivateRoute exact path="/reservas" component={(props) => <Reservas {...props} getUsuario={this.getUsuario} />} getUsuario={this.getUsuario} />
            <PrivateRoute exact path="/perfil" component={(props) => <Perfil {...props} getUsuario={this.getUsuario} removeUsuario={this.removeUsuario} />} getUsuario={this.getUsuario} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_RIGHT} bodyClassName="customBody" />
        <Footer />
      </div>
    );
  }
}
