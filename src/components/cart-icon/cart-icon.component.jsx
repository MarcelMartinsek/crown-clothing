import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import {
  CartIconContainer,
  CartShoppingIcon,
  CartItemCount
} from './cart-icon.styles'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = (props) => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  function handleClick() {
    dispatch(setIsCartOpen(!isCartOpen))
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