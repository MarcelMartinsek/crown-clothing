import { CART_ACTION_TYPES } from "./cart.types";

export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export function cartReducer(state = INITIAL_STATE, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_ITEMS:
            return {
                ...state,
                cartItems: payload
            };
        case CART_ACTION_TYPES.SET_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };

        default:
            return state;
    }
}