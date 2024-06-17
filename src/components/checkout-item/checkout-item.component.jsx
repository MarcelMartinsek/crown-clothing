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
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext)

  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const deleteItemHandler = () => deleteItemFromCart(id);



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