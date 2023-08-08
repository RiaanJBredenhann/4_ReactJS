// imports the Component class from react library which we use to extend
import React, { Component } from 'react';

// we are able to use the render() function in the new Products class
// since it extaends the Component class.
class Products extends Component {
    render() {
        return (
            <div>
                <h2>
                    Products
                </h2>
                <h2>
                    Courses
                </h2>
            </div>
        );
    }
}

export default Products;