import {Product} from "../_models/product";
import {SET_PRODUCTS} from "./product-index.reducer";

export function setProducts(products: Product[]){
    return {
        type: SET_PRODUCTS,
        payload: products
    };
}