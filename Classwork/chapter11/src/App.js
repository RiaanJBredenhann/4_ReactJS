import { connect } from "react-redux";
import Cart from "./Cart";

//-- this method subscribes to store updates and returns an object that contains 
//   a slice of the store data that we wish to make available as props to our component
//   In our case, we are making available totalCost and productCart --//
function mapStateToProps(state) {
    return {
        totalCost: state.totalCost,
        productCart: state.productCart
    }
}

//-- this method provides our component with access to the action creator functions 
//   that can be called to dispatch an action to the store --//
function mapDispatchToProps(dispatch) {
    return {
        //-- this function dispatches an action with action
        //   type “addProduct” and productData object as payload --//
        onAddProduct: (productName, productPrice) => dispatch({
            type: "addProduct",
            productData: {
                productName: productName,
                productPrice: productPrice
            }
        }),
        //-- this function similarly dispatches an action with 
        //   action type “deleteProduct” and productData as payload --//
        onDeleteProduct: (productData) => dispatch({
            type: "deleteProduct",
            productData: productData
        })
    }
}

//-- we then connect mapStateToProps and mapDispatchToProps to our Cart component so that 
//   it has access to totalCost, onAddProduct and onDeleteProduct as props
//   This is done using the connect() method --//
var connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);

export default connectedComponent;