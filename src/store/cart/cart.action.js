import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


function addCartItem(cartItems, productToAdd) {
    const existingCartItem = cartItems.find(
        (item) => (item.id === productToAdd.id)
    )
    if (existingCartItem) {
        return cartItems.map((item) =>
            (item.id === productToAdd.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

function removeCartItem(cartItems, productToRemove) {
    return cartItems.map((item) =>
        (item.id === productToRemove.id)
            ? { ...item, quantity: (item.quantity > 1 ? item.quantity - 1 : item.quantity) }
            : item
    )
}

function deleteCartItem(cartItems, productIdToDelete) {
    return cartItems.filter(
        (item) => (item.id !== productIdToDelete)
    )
}



const setCartItems = (cartItems) =>
    createAction(CART_ACTION_TYPES.SET_ITEMS, cartItems)

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPES.SET_OPEN, bool)



export function addItemToCart(productToAdd, cartItems) {
    const newItems = addCartItem(cartItems, productToAdd)
    console.log(newItems)
    return setCartItems(newItems)
}

export function removeItemFromCart(itemToRemove, cartItems) {
    const newItems = removeCartItem(cartItems, itemToRemove)
    return setCartItems(newItems)
}

export function deleteItemFromCart(itemIdToDelete, cartItems) {
    const newItems = deleteCartItem(cartItems, itemIdToDelete)
    return setCartItems(newItems)
}

// function setIsCartOpen(bool) {
//     dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool))
// }
