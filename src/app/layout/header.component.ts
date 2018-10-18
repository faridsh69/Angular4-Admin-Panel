import { Component } from '@angular/core';
import {AppSettings} from "../AppSettings";

@Component({
    selector: "app-header",
    templateUrl: "header.component.html"
})

export class HeaderComponent {

    get username(){
        return AppSettings.USERNAME;
    }
    get storeName(){
        return AppSettings.STORE_NAME
    }
    get storeUrl(){
        return AppSettings.STORE_BASE_URL;
    }
}