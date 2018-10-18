import { Component } from '@angular/core';

import {ContentHeaderState} from "../_reducers/content-header";
import {Store} from "@ngrx/store";



@Component({
    selector: "app-content",
    templateUrl: "content.component.html"
})

export class ContentComponent {
    title: string;
    desc: string;
    breadcrumbs: object[];

    constructor(private store: Store<ContentHeaderState>){
        store.select('contentHeader').subscribe(({title, desc, breadcrumbs}) => {
            this.title = title;
            this.desc = desc;
            this.breadcrumbs = breadcrumbs;
         });
    }
}