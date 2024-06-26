import { createSelector } from "reselect";

function aggregateTotalCost(sum, item) {
    return sum + item.quantity * item.price
}
function aggregateItemCount(sum, item) {
    return sum + item.quantity
}



function selectCartReducer(state) {
    return state.cart
}

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);


export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);


export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(aggregateItemCount, 0)
);


export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(aggregateTotalCost, 0)
);
