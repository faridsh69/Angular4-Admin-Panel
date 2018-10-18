import {Action} from "@ngrx/store";
import {Brand} from "../_models/brand";
import {Pagination} from "../_models/pagination";


export const SET_BRANDS = 'set-brands';
export const UPDATE_ONE_BRAND = 'update-one-brand';

export interface BrandIndexReducer {
    brands: Brand[],
    pagination: Pagination
}

export function brandIndexReducer(state: BrandIndexReducer=null, action: Action ): BrandIndexReducer {
    if(action.type === SET_BRANDS){
        console.log(action.payload, "set-brands");
        // set new category
        return action.payload;
    }else if(action.type === UPDATE_ONE_BRAND && state !== null){
        console.log("update one brand");
        let old = Object.assign(state, {});
        console.log(old.brands, "brands");
        console.log(action.payload.id, "brand id");
        console.log(action.payload.newVal, "new val");

        old.brands.forEach((brand: Brand, key) => {
            if(brand.id === action.payload.id){
                console.log(key, "key updated");
                old.brands[key] = action.payload.newVal;
            }
        });

        console.log(old, "new state");
        console.log(state, "old state");
        return old;
    }

    return state;
}