import {Component, OnInit} from '@angular/core';
import {BrandService} from "../_services/brand.service";
import {Brand} from "../_models/brand";
import {Store} from "@ngrx/store";

import {setBrands, setSelectedBrand} from "./brand.actions";
import {pageData} from "../layout/main.action";
import {Pagination} from "../_models/pagination";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BrandIndexReducer} from "./brand-index.reducer";


@Component({
    selector: "brand-main",
    templateUrl: "brand-main.component.html"
})

export class BrandMainComponent implements OnInit{

    selectedBrand: Brand = new Brand;
    brands:Brand[];
    pagination: Pagination = new Pagination;
    scenario: string;
    pageNumber: number;

    private options = {
        timeOut: 2000,
        animate:"rotate"
    }

    constructor(private brandService: BrandService, private store: Store<Brand[]>,  private route: ActivatedRoute){ }

    ngOnInit(): void {

        const title = 'برندها';
        document.title = title;
        this.store.dispatch(pageData({
            title: title,
            desc : '',
            breadcrumbs: [
                { name: title},
            ]
        }));

        this.route.paramMap
            .subscribe( (params: ParamMap) => {
                this.pageNumber = +params.get('page');
                if(this.pageNumber)
                    this.getBrands(this.pageNumber);
        });

        this.store.select('brandIndex')
            .subscribe((data: BrandIndexReducer) => {
                console.log(data, "state brands");
                if(!data){ // if categories has not been set, get new one from server
                    if(!this.pageNumber)
                        this.getBrands();
                }else{
                    this.brands = data.brands;
                    this.pagination = data.pagination;
                }
            });

    }

    getBrands(page=0): void{
        this.brands = null;
        this.brandService.getBrands(page).then(({success, brands}) =>{
            if(success){
                this.store.dispatch(setBrands(brands));
            }
        });
    }

    updateSelectedBrand(brand: Brand):void{
        console.log(brand,"update selected vrand main");
        this.store.dispatch(setSelectedBrand(brand));
    }
}