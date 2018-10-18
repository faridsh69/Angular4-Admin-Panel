import {Category} from "./category";
import {Product} from "./product";

export class Discount {
   	id?: string;
   	name?: string;
   	code?: string;
   	type: string;
   	value: number;
   	minimumPrice?: number;
    categoryIds?: Category[] = [];
    productIds?: Product[] = [];
   	count?: number;
  	timeStart: string;
    timeEnd: string;
  	customer?: string;
   	status: boolean;
}