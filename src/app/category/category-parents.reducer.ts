import {Action} from "@ngrx/store";

export const SET_PARENTS = 'set-parents';

export function categoryParentsReducer(state: object[]=null, action: Action ): object[] {
    if(action.type === SET_PARENTS){
        // set new category
        return action.payload;
    }

    return state;
}