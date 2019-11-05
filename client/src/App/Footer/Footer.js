import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() { 
        return ( 
            <footer className="d-flex text-center justify-content-center align-items-center">
                &copy; 2019 - Elaborado con <span role="img" aria-label="Blue Heart">💙</span> por Team5, para la entrega 4 de Web
            </footer>
        );
    }
}
 
export default Footer;