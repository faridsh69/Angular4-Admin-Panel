import { Attribute } from '../_models/attribute';

export class EmbeddedPrice {
    attribute?: Attribute[];
    id?: number;
    price?: number;
    discountPrice?: number;
    inventory?: number;
    bon?: number;
    bonUsed?: number;
    status?: number;
    timeStart?: any;
    timeEnd?: any;
    discountText?: string;
}