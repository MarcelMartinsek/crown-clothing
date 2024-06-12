import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = (props) => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
  function handleClick() {
    setIsCartOpen(!isCartOpen)
  }
  return (<div className='cart-icon-container' onClick={handleClick}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>
      {cartItems.reduce((sum, item) => (sum + item.quantity), 0)}
    </span>
  </div>)
}

export default CartIcon;