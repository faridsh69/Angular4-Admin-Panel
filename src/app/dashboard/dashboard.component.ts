import { Component, OnInit } from '@angular/core';
import {pageData} from "../layout/main.action";
import {Store} from "@ngrx/store";
import {ContentHeaderState, INIT_CONTENT_HEADER_STATE} from "../_reducers/content-header";

import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.css'],
})

export class DashboardComponent implements OnInit {

    constructor(
        private categoryService: CategoryService,
        private store: Store<ContentHeaderState>) { }

    ngOnInit() {
        this.store.dispatch(pageData(INIT_CONTENT_HEADER_STATE));
        const title = 'خانه';
        document.title = title;
        this.store.dispatch(pageData({
            title: title,
            desc : '',
            breadcrumbs: [
                { name: title}
            ]
        }));
    }

}