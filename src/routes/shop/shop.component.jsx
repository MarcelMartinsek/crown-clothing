import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategoriesMap } from '../../store/category/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Shop = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    }
    getCategoriesMap();
  }, []);



  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop;