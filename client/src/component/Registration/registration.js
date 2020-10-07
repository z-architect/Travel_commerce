import React, { Component } from 'react';
import {Row,Col} from 'react-bootstrap';
class Register extends Component {
    render() {
        return (
            <div>
                    
                    <Row> 
                        <Col >
                       1 of 2 columnt
                        </Col>
                        <Col >
                        2 of 2 columnt
                        </Col>
                    </Row>

                    <Row> 
                        <Col >
                       1 of 3 columnt
                        </Col>
                        <Col >
                        2 of 3 columnt
                        </Col>
                        <Col >
                        3 of 3 columnt
                        </Col>
                    </Row>
                   
            </div>
        );
    }
}

export default Register;