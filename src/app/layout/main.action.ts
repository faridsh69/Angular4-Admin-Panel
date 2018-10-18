import {ContentHeaderState} from "../_reducers/content-header";
export const PAGE_DATA = 'page-data';

export function pageData(data: ContentHeaderState){
    return {
        type: PAGE_DATA,
        payload: data
    }
}
