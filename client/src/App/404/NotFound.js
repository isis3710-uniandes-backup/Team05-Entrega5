import React, { Component } from 'react';
import './NotFound.css';
import notfound from '../../assets/notfound.png';
import { FormattedMessage } from 'react-intl';

class NotFound extends Component {

    render() { 
        return ( 
            <div className="host d-flex flex-column align-items-center justify-content-center">
                <img id="notfound" src={notfound} alt="Interrogación página no encontrada" />
                <h1 className="blue font-weight-bold">404</h1>
                <h1 className="font-weight-bold med"><FormattedMessage id="notFound.titulo" /></h1>
                <div className="text-center my-2">
                    <p>
                        <FormattedMessage id="notFound.descripcionInicial"/>
                        <br/>
                        <FormattedMessage id="notFound.descripcionFinal"/>
                        
                    </p>
                </div>
            </div>
        );
    }
}
 
export default NotFound;