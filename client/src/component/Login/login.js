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
            email:"",
            password:"",
            error:[],
            form:"not submitted"
        }
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    

    
validateForm = (item)=>{
if(item.email === "" || item.password === "")
return false;

return true;
}

    handleSubmit = (event)=>{
        event.preventDefault();
        // alert("eshi ahungs");
        let valid = false;
        console.log("you have submitted your form!");
        this.setState({form:"submitted"});
        // console.log(this.state.email )
        // console.log(this.state.password)
        if(this.validateForm(this.state))
        {
            console.log("form is in perfect condition");
            valid = true;
        }else{
            console.log("your trying to submit either and empty  pass or email")
            valid = false;
        }
        let dataToBeSent = {
            email : this.state.email,
            password : this.state.password
        }

    }
    handleChange = (event)=>{
        //console.log(event.target.value)
        this.setState({ [event.target.name] : event.target.value})
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
                                <Form.Control
                                id="email"
                                name="email"
                                placeholder="enter name here"
                                onChange={this.handleChange}/>
                            </Row>
                            <Row>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                id="password"
                                name="password"
                                type="password" placeholder="PassWord Ova Er  govna"
                                onChange={this.handleChange}/>
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