import {Action} from "@ngrx/store";
import {Brand} from "../_models/brand";

export const SET_SELECTED_BRAND = 'set-selected-brand';


export function selectedBrandReducer(state: Brand=new Brand, action: Action ): Brand {
    if(action.type === SET_SELECTED_BRAND){
        // set new category

        console.log( action.payload, "set selected brand");
        return action.payload;
    }

    return state;
}