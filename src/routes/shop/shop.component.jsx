import { Route, Routes } from 'react-router-dom';
// import {ProductsContainer} from './shop.styles';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = (props) => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop;