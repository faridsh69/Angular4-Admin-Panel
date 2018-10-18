import {Action} from "@ngrx/store";
import {Discount} from "../_models/discount";

export const SET_DISCOUNTS = 'set-discounts';
export const UPDATE_ONE_DISCOUNT = 'update-one-discount';

export function discountIndexReducer(state: Discount[]=null, action: Action ): Discount[] {
    if(action.type === SET_DISCOUNTS){
        // set new discount
        console.log(action.payload,'debug mode');
        return action.payload;
    }else if(action.type === UPDATE_ONE_DISCOUNT && state !== null){
        console.log("update one Discount");
        let old = Object.assign(state, {});
        console.log(old, "Discounts");
        console.log(action.payload.discount, "old Discount");
        console.log(action.payload.newVal, "new val");
        const index = old.indexOf(action.payload.discount);
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