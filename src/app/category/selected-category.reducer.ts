import {Action} from "@ngrx/store";
import {Category} from "../_models/category";

export const SET_SELECTED_CATEGORY = 'set-selected-category';

export function selectedCategoryReducer(state: Category=new Category, action: Action ): Category {
    if(action.type === SET_SELECTED_CATEGORY){
        // set new category
        return action.payload;
    }

    return state;
}