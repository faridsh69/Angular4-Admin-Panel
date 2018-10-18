import {Action} from "@ngrx/store";
import {Category} from "../_models/category";

export const SET_CATEGORIES = 'set-categories';
export const UPDATE_ONE_CATEGORY = 'update-one-category';

export function categoryIndexReducer(state: Category[]=null, action: Action ): Category[] {
    if(action.type === SET_CATEGORIES){
        // set new category
        return action.payload;
    }else if(action.type === UPDATE_ONE_CATEGORY && state !== null){
        console.log("update one category");
        let old = Object.assign(state, {});
        console.log(old, "categories");
        console.log(action.payload.category, "old category");
        console.log(action.payload.newVal, "new val");
        const index = old.indexOf(action.payload.category);
        console.log(index, "index");
        if(index !== -1){
            console.log("set new val");
            old[index] = action.payload.newVal;
        }
        console.log(old, "new state");
        console.log(state, "old state");
        return old;
    }

    return state;
}