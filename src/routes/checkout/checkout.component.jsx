import { CheckoutContainer, CheckoutHeader, CheckoutHeaderBlock, CheckoutTotal } from './checkout.styles'
// import { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const Checkout = (props) => {
  // const { cartItems, cartTotal } = useContext(CartContext)\
  const cartItems = useSelector(selectCartItems);
  function aggregateTotalCost(sum, item) {
    return sum + item.quantity * item.price
  }
  const cartTotal = cartItems.reduce(aggregateTotalCost, 0)



  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutHeaderBlock>
          <span>Product</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Description</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Quantity</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Price</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Remove</span>
        </CheckoutHeaderBlock>
      </CheckoutHeader>

      {cartItems.map((item) =>
        <CheckoutItem key={item.id} cartItem={item} />
      )}
      <CheckoutTotal>Total: {cartTotal}€</CheckoutTotal>
    </CheckoutContainer >
  )
}

export default Checkout