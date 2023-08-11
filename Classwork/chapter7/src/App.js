import './App.css';
import React, { Component } from 'react';
import JumboTronComponent from './JumboTronComponent';
import UserForm from './UserForm';
import Products from './Products';
import GitHub from './GitHub';

class App extends Component {
  formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }

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