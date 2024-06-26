import { createSelector } from 'reselect'

function selectCategoryReducer(state) {
    return state.categories;
}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((accumulator, category) => {
            const { title, items } = category;
            accumulator[title.toLowerCase()] = items
            return accumulator
        }, {}));


export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
