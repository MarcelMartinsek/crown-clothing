import './directory.styles.scss'
import CategoryItem from '../category-item/category-item.component'

const Directory = ({ categoryList }) => {
    return (
        <div className="directory-container">
            {categoryList.map((category) => (<CategoryItem key={category.id} category={category} />))}
        </div>
    )
}

export default Directory