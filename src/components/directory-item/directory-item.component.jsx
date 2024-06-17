import {
    DirectoryItemContainer,
    DirectoryItemBackgroundImage,
    DirectoryItemBody,
    DirectoryItemTitle,
    DirectoryItemText
} from './directory-item.styles'
import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category
    const navigate = useNavigate();
    function onNavigateHandler() {
        navigate(route);
    }
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <DirectoryItemBackgroundImage imageurl={imageUrl} />
            <DirectoryItemBody>
                <DirectoryItemTitle>{title}</DirectoryItemTitle>
                <DirectoryItemText>Shop Now</DirectoryItemText>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem