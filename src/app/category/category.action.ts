import {CategoryService} from "../_services/category.service";
export const GET_CATEGORIES = 'get-categories';

export function getCategories(){


    return {
        type: GET_CATEGORIES
    }
}

