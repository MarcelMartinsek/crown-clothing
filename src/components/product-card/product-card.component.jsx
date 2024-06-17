import {
  ProductCardContainer,
  ProductCardImage,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice,
  ProductCardButton
} from './product-card.styles'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext)

  function addProductToCart() {
    addItemToCart(product)
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