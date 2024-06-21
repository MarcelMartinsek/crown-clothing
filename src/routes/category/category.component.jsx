import { CategoryContainer, CategoryTitle } from './category.styles'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/category/category.selector';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories)

  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </Fragment>
  )
}

export default Category