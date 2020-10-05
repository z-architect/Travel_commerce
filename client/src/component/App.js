import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import {Route,Switch} from 'react-router-dom';
import Home from './Home/home';
import Register from './Registration/registration';
import Login from './Login/login';
import About from './About/about';

function App() {
  return (
    <div className="App">
  
  <Switch>
    
    <Route path="/login" component={Login}/> 
    <Route path="/register"> <Register/> </Route>
    <Route path="/about"> <About/> </Route>
    <Route path="/"><Home/></Route>
  </Switch>
    </div>
  );
}

export default App;
