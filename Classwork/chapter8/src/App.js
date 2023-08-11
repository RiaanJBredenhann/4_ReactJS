import './App.css';
import React, { Component } from 'react';
import JumboTronComponent from './JumboTronComponent';
import UserForm from './UserForm';
import Products from './Products';
import GitHub from './GitHub';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import GitHubUser from './GitHubUser';

class App extends Component {
  // formatName(user) {
  //   return user.firstName + ' ' + user.lastName;
  // }

  render() {

    return (
      <div className="App">
        <JumboTronComponent>
          This is a long sentence, and I want to insert content into the
          jumbotron component from the outside.
        </JumboTronComponent>
        <Products />
        <UserForm />
        <GitHub />
      </div>
    );
  }
}

export default App;

//-- Our header component contains BrowserRouter, Switch and Route imported from the 
//   ‘react-router-dom library which provide the essential routing functionalities --//
class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/github">GitHub</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/github/user/:login/:id" component={GitHubUser} />
            <Route path="/github" component={GitHub} />
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

class Users extends Component {
  render() {
    return (
      <div>
        Users
      </div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>
        Not Found
      </div>
    )
  }
}