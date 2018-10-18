import {Action} from "@ngrx/store";
import {Product} from "../_models/product";

export const SET_PRODUCTS = 'set-products';

export function productIndexReducer(state: Product[] = null, action: Action ): Product[] {
    if(action.type === SET_PRODUCTS){
        // set new category
        return action.payload;
    }

    return state;
}