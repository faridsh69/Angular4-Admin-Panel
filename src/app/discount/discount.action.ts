import {DiscountService} from "../_services/discount.service";
export const GET_DISCOUNTS = 'get-discounts';

export function getDiscounts(){


    return {
        type: GET_DISCOUNTS
    }
}

