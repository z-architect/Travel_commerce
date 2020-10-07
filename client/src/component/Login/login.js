import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import {Row,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
form:"not submitted"
        }
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        alert("eshi ahungs");
        console.log("you have submitted your form!");
        this.setState({form:"submitted"});
    }
    render() {
        return (<> 
           <Container className="contain">
                <h2>Login</h2>
                <Row>
                    <Col>

                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="enter name here"/>
                            </Row>
                            <Row>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="PassWord Ova Er  govna"/>
                            </Row>
                            <Button type="submit"> Submit </Button>
                        </Form>
                    </Col>
                </Row>
           </Container> 
            </>
        );
    }
}

export default Login; 


{/* <Container>
<InputGroup>
    <InputGroup.Prepend>
        <InputGroup.Text id="textid">@weyo</InputGroup.Text>
    </InputGroup.Prepend>

    <FormControl 
    placeholder="username"
    aria-label="Username"
    aria-describedby="basic-addon1"/>

</InputGroup>
</Container> */}