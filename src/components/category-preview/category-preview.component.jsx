import {
  CategoryPreviewContainer,
  CategoryTitle,
  CategoryProductsPreview
} from './category-preview.styles'
import ProductCard from '../product-card/product-card.component'

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>
          {title.toUpperCase()}
        </CategoryTitle>
      </h2>
      <CategoryProductsPreview>
        {
          products.filter((_, idx) => idx < 4).map((product) =>
            <ProductCard key={product.id} product={product} />
          )
        }
      </CategoryProductsPreview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;