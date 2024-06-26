import { CartDropdownContainer, CartDropdownItems, CartDropdownEmpty } from './cart-dropdown.styles'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const CartDropdown = (props) => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()
  function goToCheckoutHandler() {
    navigate('checkout')
  }
  return (
    <CartDropdownContainer>
      {
        (cartItems.length === 0) ?
          (<CartDropdownEmpty>Your cart is empty.</CartDropdownEmpty>)
          :
          (<CartDropdownItems>
            {cartItems.map(item => <CartItem cartItem={item} key={item.id}></CartItem>)}
          </CartDropdownItems>)
      }
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer >
  )
}

export default CartDropdown