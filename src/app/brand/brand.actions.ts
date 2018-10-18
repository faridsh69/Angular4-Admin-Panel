import {Brand} from "../_models/brand";
import {SET_SELECTED_BRAND} from "./selected-brand.reducer";
import {BrandIndexReducer, SET_BRANDS, UPDATE_ONE_BRAND} from "./brand-index.reducer";


export function setSelectedBrand(selectedBrand: Brand){
    return {
        type: SET_SELECTED_BRAND,
        payload: selectedBrand
    };
}

export function setBrands(brands: BrandIndexReducer){
    return {
        type: SET_BRANDS,
        payload: brands
    };
}

export function updateOneBrand(id: string, newVal: Brand){
    return {
        type: UPDATE_ONE_BRAND,
        payload: { id, newVal }
    };
}