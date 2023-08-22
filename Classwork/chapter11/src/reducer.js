//-- we initialize our state to an empty productCart array and totalCost being zero --//
function cartReducer(state, action) {
    if (state === undefined) {
        return {
            totalCost: 0,
            productCart: []
        };
    }

    //-- We use a switch statement to handle the two action types our reducer will receive --//

    //-- when we increment or decrement from totalCost, 
    //   we have to use the parseInt method to convert string to numeric
    //   else we will get a string with the numbers concatenated instead of added/subtracted --//
    switch (action.type) {
        case "addProduct":
            return {
                ...state,
                totalCost: state.totalCost + parseInt(action.productData.productPrice),
                productCart: state.productCart.concat({
                    productName: action.productData.productName,
                    productPrice: action.productData.productPrice
                })
            }

        case "deleteProduct":
            const updatedArray = state.productCart.filter(product =>
                product.productName !== action.productData.productName);
            return {
                ...state,
                totalCost: state.totalCost - parseInt(action.productData.productPrice),
                productCart: updatedArray
            }

        default:
            return state;
    }
}
export default cartReducer;