import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Brand} from "../_models/brand";
import {Pagination} from "../_models/pagination";
import {AppSettings} from "../AppSettings";

@Component({
    selector: "brand-table",
    templateUrl: "brand-table.component.html"
})

export class BrandTableComponent {
    @Input() brands:Brand[];
    @Input() pagination:Pagination;
    @Output() onUpdateSelectedBrand = new EventEmitter<Brand>();

    private brandUrl =  AppSettings.STORE_BASE_URL+'/brand/';
    public ajaxLoading:boolean=false;

    onClick(item: Brand){
        this.onUpdateSelectedBrand.emit(item);
    }

}