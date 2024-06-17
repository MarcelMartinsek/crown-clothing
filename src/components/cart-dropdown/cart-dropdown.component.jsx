import { CartDropdownContainer, CartDropdownItems, CartDropdownEmpty, CheckoutButton } from './cart-dropdown.styles'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom'

const CartDropdown = (props) => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()
  function goToCheckoutHandler() {
    navigate('checkout')
  }
  return (
    <CartDropdownContainer>
      {(cartItems.length === 0) && (<CartDropdownEmpty>Your cart is empty.</CartDropdownEmpty>)}
      <CartDropdownItems>
        {cartItems.map(item => <CartItem cartItem={item} key={item.id}></CartItem>)}
      </CartDropdownItems>
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer >
  )
}

export default CartDropdown