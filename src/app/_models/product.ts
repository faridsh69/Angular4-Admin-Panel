import {Attribute} from "./attribute";
import {EmbeddedPrice} from "./embeddedPrice";
import {Gallery} from "./gallery";
export class Product {
    id: string;
    nameEn: string;
    nameFa: string;
    description: string;
    storeId: string;
    userId: number;
    brandId: string;
    newBrand: string;
    categoryId: string;
    newCategory: string;
    attribute: any[];
    gallery: Gallery[] = [];
    options: any;
    embeddedPrice:EmbeddedPrice[];
    title:string;
    metaDescription:string;
    slug: string;
    status: number;
    intId: number;
}
