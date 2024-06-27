import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { fetchCategoriesAsync } from '../../store/category/category.action';
import { fetchCategoriesStart } from '../../store/category/category.action';

const Shop = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);



  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop;