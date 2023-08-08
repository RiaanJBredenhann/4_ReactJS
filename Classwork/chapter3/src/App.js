import React, { Component } from 'react';
import Products from './Products';

class App extends Component {
  render() {
    const products = ["Learning React", "Pro React", "Beginning React"];
    const listProducts = products.map((product) =>
      <li key={product.toString()}>{product}</li>
    );
    return (
      <div>
        <h1>My First React App!</h1>
        <Products />
        <div><ul>{listProducts}</ul></div>
      </div>
    );
  }
}

export default App;
