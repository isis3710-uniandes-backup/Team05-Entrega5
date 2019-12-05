import React, { Component } from 'react';
import './Footer.css';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {

    render() { 
        return ( 
            <footer className="d-flex text-center justify-content-center align-items-center">
                <FormattedMessage id="footer.inicio"/> <span role="img" aria-label="Blue Heart">💙</span> <FormattedMessage id="footer.fin"/>
            </footer>
        );
    }
}
 
export default Footer;