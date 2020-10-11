import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row,Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {registerUser} from '../../actions/user_axtions';
import {connect} from 'react-redux';
class About extends Component {
  constructor(props){
    super(props);
    this.state={
      lastname:"",
      name:"",
      email:"",
      password:"",
      passwordConfirmation:"",
      errors:[],
      form:"not submitted"
    }
  }
 
displayErrors = (errors) =>
    errors.map((error,i)=>
    <p key={i}>{error}</p>)
    
isFormEmpty = ({lastname,name,email,password,passwordConfirmation})=> 
(!email.length || !password.length || !name.length || !lastname.length || !passwordConfirmation.length);

isPassWordValid = ({password,passwordConfirmation})=>{
  if(password.length < 6 || passwordConfirmation < 6)
  return false;
  else if(password!==passwordConfirmation)
  return false;
  else
  return true;
}
    isFormValid=()=>{
      let errors = [];
      let error;

  if(this.isFormEmpty(this.state)){
    
    //error = {message:"fill in all fields!!!"};
    error = "fill in all fields!!!";
    this.setState({errors:this.state.errors.concat(error)})
  }
  else if(!this.isPassWordValid(this.state)){
    //error = {message:"password not valid or not equal with confirmation"};
    error = "password < 6 or not equal to confimration"
    this.setState({errors:this.state.errors.concat(error)})
  }else{return true}
}

    handleSubmit = (event)=>{
        event.preventDefault();
        let dataToBeSent = {
          name:this.state.name,
          lastname:this.state.lastname,
          email:this.state.email,
          password:this.state.password,
          pasconfirm:this.state.passwordConfirmation
        }
        if(this.isFormValid()){         
          this.setState({errors:[]});
          this.props.dispatch(registerUser(dataToBeSent))
          .then(response=>{
            alert("Yehone Response");
            if(response.payload.success){
              console.log(response)
              this.props.history.push('/login');
            }
            else{
              console.log(response);
              this.setState({errors:this.state.errors.concat("Your attempts to DB has failed")})
            }
          }).catch(err=>{
            this.setState({errors:this.state.errors.concat(err)})
          })
       console.log(dataToBeSent);}
       else{
         //console.log("erre baba formuan yoneneger");
         alert("ate")
         console.log(dataToBeSent);
        //  this.setState(state=>{
        //    const errors = this.state.errors.concat("The form is not Properly filled!!!");
        //    return {
        //      errors,
        //    }
        //  })
       }
    }
    handleChange = (event)=>{
        //console.log(event.target.value)
        this.setState({ [event.target.name] : event.target.value})
    }
  render(){
    return (
       <>
       <Container>
       <Row>
         <Col>
         <Form onSubmit={this.handleSubmit}>
       <Form.Group >
       <h2>Personal Infromation</h2>
          <Row>
              
              <Form.Text className="text-muted">
              LastName
            </Form.Text>
              <Form.Control
              id="lastname"
              name="lastname"
              placeholder="lastnamee"
              onChange={this.handleChange}/>
          </Row>
          <Row>
          <Form.Text className="text-muted">
              Name
            </Form.Text>
              <Form.Control
              id="name"
              name="name"
              placeholder="name"
              onChange={this.handleChange}/>
          </Row>

      <Row>
      <Form.Text className="text-muted">
              Email
            </Form.Text>
            <Form.Control type="email" id="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
      </Row>
            
      </Form.Group>

      <Form.Group >
      <h2>Password Confirmation </h2>
          <Row>
              
              <Form.Text className="text-muted">
              password
            </Form.Text>
              <Form.Control
              id="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}/>
          </Row>
          <Row>
          <Form.Text className="text-muted">
              Confirm password
            </Form.Text>
              <Form.Control
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="verify Password"
              onChange={this.handleChange}/>
          </Row>
            
      </Form.Group>

      {
        this.state.errors.length > 0 && (
          <div>
            {this.displayErrors(this.state.errors)}
          </div>
        )
      }



      <Button variant="primary" type="submit">
        Submit
      </Button>
</Form>

         </Col>
       </Row>
       </Container>
       </>
    );
  }
}
// function mapStateToProps(state){
//   return {state : }
// }
export default connect()(About);

/*
<Form>
      <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
</Form>*/