import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/category/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Shop = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesArray = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoryArray));
    }
    getCategoriesArray();
  }, []);



  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop;