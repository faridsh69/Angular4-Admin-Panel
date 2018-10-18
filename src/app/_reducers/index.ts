import { combineReducers } from 'redux';
import {sidebarItems} from './sidebar-items';
import {contentHeader} from './content-header';
import {categoryIndexReducer} from "../category/category-index.reducer";
import {categoryParentsReducer} from "../category/category-parents.reducer";
import {selectedCategoryReducer} from "../category/selected-category.reducer";

import {brandIndexReducer} from "../brand/brand-index.reducer";
import {selectedBrandReducer} from "../brand/selected-brand.reducer";

import {productIndexReducer} from "../product/product-index.reducer";

import {discountIndexReducer} from "../discount/discount-index.reducer";
import {selectedDiscountReducer} from "../discount/selected-discount.reducer";


const rootReducer = combineReducers({
    sidebarItems: sidebarItems,
    contentHeader: contentHeader,

    // category reducers
    categoryIndex: categoryIndexReducer,
    categoryParents: categoryParentsReducer,
    selectedCategory: selectedCategoryReducer,

    // brand reducers
    brandIndex: brandIndexReducer,
    selectedBrand: selectedBrandReducer,

    // product reducers
    productIndex: productIndexReducer,

     // discount reducers
    discountIndex: discountIndexReducer,
    selectedDiscount: selectedDiscountReducer,
});

export default rootReducer;