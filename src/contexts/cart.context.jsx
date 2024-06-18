import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

function aggregateTotalCost(sum, item) {
    return sum + item.quantity * item.price
}
function aggregateItemCount(sum, item) {
    return sum + item.quantity
}


export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
    setIsCartOpen: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
});



export const CART_ACTION_TYPES = {
    'TOGGLE_OPEN': 'TOGGLE_OPEN',
    'SET_ITEMS': 'SET_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}



const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled action type ${type} in userReducer`);
    }
}




export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal, }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCount = newCartItems.reduce(aggregateItemCount, 0);
        const newTotal = newCartItems.reduce(aggregateTotalCost, 0);
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_ITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: newCount,
                    cartTotal: newTotal
                }
            )
        );
    }

    function addItemToCart(productToAdd) {
        const newItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newItems)
    }
    function removeItemFromCart(itemToRemove) {
        const newItems = removeCartItem(cartItems, itemToRemove)
        updateCartItemsReducer(newItems)
    }
    function deleteItemFromCart(itemIdToDelete) {
        const newItems = deleteCartItem(cartItems, itemIdToDelete)
        updateCartItemsReducer(newItems)
    }
    function setIsCartOpen(bool) {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool))
    }

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}