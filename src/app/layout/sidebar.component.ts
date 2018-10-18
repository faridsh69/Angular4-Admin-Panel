import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import {SidebarItemState} from '../_reducers/sidebar-items';
import {Observable} from "rxjs";

@Component({
    selector: "app-sidebar",
    templateUrl: "sidebar.component.html"
})

export class SidebarComponent{
    items: Observable<SidebarItemState>;

    constructor(private store: Store<SidebarItemState>){
        this.items = store.select('sidebarItems');
    }
}