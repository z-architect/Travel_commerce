import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
//import InputGroup from 'react-bootstrap/InputGroup';
//import FormControl from 'react-bootstrap/FormControl';
import {Link} from 'react-router-dom'
import loginUser from '../../actions/user_axtions';
import {connect} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            errors:[],
            form:"not submitted"
        }
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    

    
isFormValid = ({email,password})=> email && password ;

displayErrors = (errors) =>
    errors.map((error,i)=>
    <p key={i}>{error}</p>)
    


    handleSubmit = (event)=>{
        event.preventDefault();
        // alert("eshi ahungs");
        let valid = false;
        console.log("you have submitted your form!");
        this.setState({form:"submitted"});
        // console.log(this.state.email )
        // console.log(this.state.password)
        let dataToBeSent = {
            email : this.state.email,
            password : this.state.password
        }
        if(this.isFormValid(this.state))
        {
            console.log("form is in perfect condition");
            valid = true;
            this.setState({errors:[]})
            this.props.dispatch(loginUser(dataToBeSent))
            .then(response=>{
                console.log(response);
                if(response.payload.loginSuccess)
                {
                alert("logged in succesesfully");
                this.props.history.push('/');
                }
                else{
                    this.setState(state=>{
                        const errors = this.state.errors.concat("abate no email and password in database")
                        return {
                            errors,
                        }
                    })
                }
            
            })
        }else{
            this.setState(state=>{
                const errors = this.state.errors.concat("Email or Pass Empty!");
                return {
                    errors,
                }
            })
            console.log("your trying to submit either and empty  pass or email")
            valid = false;
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
                            {
                                this.state.errors.length > 0 && (
                                <div>
                                    {this.displayErrors(this.state.errors)}
                                </div>
                                )
                            }
                            <Row>
                            <Button type="submit" varient="blue"> Submit </Button> &nbsp; &nbsp;
                            <Link to="/register">
                            <Button >SIGN UP</Button>
                            </Link>
                            </Row>
                            
                        </Form>
                    </Col>
                </Row>
           </Container> 
            </>
        );
    }
}
function mapStateToProps(state){
    return {
        user:state.user
    }

}
export default connect(mapStateToProps)(Login); 


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