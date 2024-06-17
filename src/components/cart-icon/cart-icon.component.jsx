import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import {
  CartIconContainer,
  CartShoppingIcon,
  CartItemCount
} from './cart-icon.styles'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = (props) => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  function handleClick() {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <CartIconContainer onClick={handleClick}>
      <CartShoppingIcon />
      <CartItemCount>
        {cartCount}
      </CartItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;