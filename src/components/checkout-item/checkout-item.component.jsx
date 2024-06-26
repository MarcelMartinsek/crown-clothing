import {
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  CheckoutItemImage,
  CheckoutItemText,
  CheckoutItemQuantity,
  CheckoutItemArrow,
  CheckoutItemValue,
  CheckoutItemRemoveButton
} from './checkout-item.styles'
import { deleteItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action'
import { useSelector } from "react-redux";
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { id, name, imageUrl, price, quantity } = cartItem

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem, cartItems));
  const addItemHandler = () => dispatch(addItemToCart(cartItem, cartItems));
  const deleteItemHandler = () => dispatch(deleteItemFromCart(id, cartItems));



  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <CheckoutItemImage src={imageUrl} alt={`${name}`} />
      </CheckoutItemImageContainer>

      <CheckoutItemText >{name}</CheckoutItemText>

      <CheckoutItemQuantity>
        <CheckoutItemArrow onClick={removeItemHandler}>&#10094;</CheckoutItemArrow>
        <CheckoutItemValue>
          {quantity}
        </CheckoutItemValue>
        <CheckoutItemArrow onClick={addItemHandler}>&#10095;</CheckoutItemArrow>
      </CheckoutItemQuantity>

      <CheckoutItemText >{price}€</CheckoutItemText>

      <CheckoutItemRemoveButton onClick={deleteItemHandler}>&#10005;</CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem