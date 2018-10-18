import {Action} from "@ngrx/store";
import {Discount} from "../_models/discount";

export const SET_SELECTED_DISCOUNT = 'set-selected-discount';

export function selectedDiscountReducer(state: Discount=new Discount, action: Action ): Discount {
    if(action.type === SET_SELECTED_DISCOUNT){
        // set new Discount
        return action.payload;
    }

    return state;
}