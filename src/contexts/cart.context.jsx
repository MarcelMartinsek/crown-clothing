import { createContext, useState, useEffect } from "react";


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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce((sum, item) => (sum + item.quantity), 0)
        setCartCount(newCount)
    }, [cartItems]);

    useEffect(() => {
        const newCount = cartItems.reduce((sum, item) => (sum + item.quantity * item.price), 0)
        setCartTotal(newCount)
    }, [cartItems]);

    function addItemToCart(productToAdd) {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    function removeItemFromCart(itemToRemove) {
        setCartItems(removeCartItem(cartItems, itemToRemove))
    }
    function deleteItemFromCart(itemIdToDelete) {
        setCartItems(deleteCartItem(cartItems, itemIdToDelete))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}