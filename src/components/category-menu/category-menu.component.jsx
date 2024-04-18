import './category-menu.styles.scss'
import CategoryItem from '../category-item/category-item.component'

const CategoryMenu = ({ categoryList }) => {
    return (
        <div className="categories-container">
            {categoryList.map((category) => (<CategoryItem key={category.id} category={category} />))}
        </div>
    )
}

export default CategoryMenu