import {
  ProductCardContainer,
  ProductCardImage,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice,
  ProductCardButton
} from './product-card.styles'

import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)

  function addProductToCart() {
    dispatch(addItemToCart(product, cartItems))
  }

  return (
    <ProductCardContainer>
      <ProductCardImage src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardPrice>{`${price}€`}</ProductCardPrice>
      </ProductCardFooter>
      <ProductCardButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</ProductCardButton>
    </ProductCardContainer>
  )
}

export default ProductCard;