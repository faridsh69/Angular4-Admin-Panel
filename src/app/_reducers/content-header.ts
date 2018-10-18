import {PAGE_DATA} from "../layout/main.action";
import {Action} from "@ngrx/store";
export interface ContentHeaderState {
    title: string;
    desc: string;
    breadcrumbs: object[]
}

export const INIT_CONTENT_HEADER_STATE: ContentHeaderState = {
    title: 'پنل مدیریت',
    desc : '',
    breadcrumbs: [
        { name: 'خانه' }
    ]
};

export function contentHeader(state: ContentHeaderState = INIT_CONTENT_HEADER_STATE, action: Action ){
    if(action.type === PAGE_DATA){
        return action.payload;
    }
    return state;
}