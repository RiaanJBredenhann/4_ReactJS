import React, { Component } from 'react';
import GitHub from './GitHub';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import GitHubUser from './GitHubUser';
//import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {  
  
  constructor() {
    super();
    console.log(firebase);
  }

  render() {        
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;

class Header extends Component {
  render(){
    return (
        <BrowserRouter>
          <div>            
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/github">GitHub</Nav.Link>  
                  <Nav.Link href="/">Contact Us</Nav.Link>                
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch> 
              <Route path="/github/user/:login/:id" component={GitHubUser} />                                                                
              <Route path="/github" component={GitHub} />
              <Route path="/contact" component={Contact} />               
              <Route exact path="/" component={Home} />             
              <Route path="/*" component={NotFound} />                       
            </Switch>   
          </div>  
        </BrowserRouter>              
    )
  }
}

class Home extends Component {
  render(){
    return (
      <div>
        Home        
      </div>
    )
  }
}

class Contact extends Component {
  render(){
    return (
      <div>
        Contact Us        
      </div>
    )
  }
}

class NotFound extends Component {
  render(){
    return <div>Not Found</div>
  }
}
