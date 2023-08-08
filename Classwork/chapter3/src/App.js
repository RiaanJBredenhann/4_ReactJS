import React, { Component } from "react";
import Products from "./Products";
import { Button } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
        <h1>My First React App!</h1>
        <Products />
        <Button variant="primary" disabled>Default</Button>
      </div>
    );
  }
}
export default App;
