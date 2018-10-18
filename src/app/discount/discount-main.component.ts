import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DiscountService} from "../_services/discount.service";
import {Discount} from "../_models/discount";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {SET_DISCOUNTS, UPDATE_ONE_DISCOUNT} from "./discount-index.reducer";
import {SET_SELECTED_DISCOUNT} from "./selected-discount.reducer";
import 'rxjs/add/operator/switchMap';
import {pageData} from "../layout/main.action";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "discount-main",
    templateUrl: "discount-main.component.html"
})

export class DiscountMainComponent implements OnInit, OnDestroy {

    selectedDiscount: Discount;
    discounts:Discount[];
    scenario: string;

    private _oldDiscount: Discount;
    private _selectedDiscountId: string;
    private options = {
        timeOut: 2000,
        animate:"rotate"
    }
    constructor(
        private notificationsService: NotificationsService,
        private route: ActivatedRoute,
        private router: Router,
        private discountService: DiscountService,
        private store: Store<Discount[]>){ }

    ngOnInit(): void {

        this.route.paramMap
            .subscribe( (params: ParamMap) => {
                this._selectedDiscountId = params.get('id');
            });

        this.store.select('selectedDiscount').subscribe((selectedDiscount: Discount) => {
            this.selectedDiscount = selectedDiscount;
            console.log(this.selectedDiscount, "selected Discount from server");
            this.setPageTitle();
        });

        this.store.select('discountIndex')
            .subscribe((discounts: Discount[]) => {
                this.discounts = discounts;     
                if(!discounts){ 
                    this.discountService.getDiscounts(this._selectedDiscountId).then(({success, discounts, selectedDiscount}) =>{
                        if(success){
                            console.log(selectedDiscount, "selectedDiscount in ajax");
                            this.setSelectedDiscount(selectedDiscount);
                            this.setDiscounts(discounts);
                        }else{
                            this.notificationsService.error(
                                'خطا!', 'دسته مورد نظر یافت نشد.');
                        }
                    });
                }
            });

        if(this._selectedDiscountId){
            console.log("set old Discount");
            this._oldDiscount = Object.assign({}, this.selectedDiscount);
        }

        this.setPageTitle();

    }

    ngOnDestroy(): void {
        console.log(this._oldDiscount, "old Discount go back");
        if(this._oldDiscount){
            console.log("go back");
            this.updateOneDiscount(this.selectedDiscount, this._oldDiscount);
            this.setSelectedDiscount(new Discount);
        }
    }

    updateDiscounts(discounts:Discount[]):void {
        this.setSelectedDiscount(new Discount);
        this.setDiscounts(discounts);

        if(this._selectedDiscountId){
            // go back to /Discount route after updating
            this.router.navigate(['/discount']);
        }

    }

    updateSelectedDiscount(discount: Discount):void{
        this.setSelectedDiscount(discount);
    }

    setDiscounts(discounts: Discount[]){
        console.log(discounts,'set discount function');
        this.store.dispatch({
            type: SET_DISCOUNTS,
            payload: discounts
        });
    }

    setSelectedDiscount(selectedDiscount: Discount){
        this.store.dispatch({
            type: SET_SELECTED_DISCOUNT,
            payload: selectedDiscount
        });
    }

    updateOneDiscount(discount: Discount, newVal: Discount){
        this.store.dispatch({
            type: UPDATE_ONE_DISCOUNT,
            payload: { discount, newVal }
        });
    }

    setPageTitle(): void {
        if(this._selectedDiscountId){
            this.scenario = 'update';
            const title = this.selectedDiscount.name === undefined ? 'ویرایش' :  'ویرایش کوپن '+this.selectedDiscount.name;
            // set title and breadcrumbs
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'کوپن تخفیف', to: '/discount'},
                    { name: title}
                ]
            }));
        }else{
            this.scenario = 'index';
            // set title and breadcrumbs
            document.title = 'کوپن تخفیف';
            this.store.dispatch(pageData({
                title: 'کوپن تخفیف',
                desc : '',
                breadcrumbs: [
                    { name: 'کوپن تخفیف'}
                ]
            }));
        }
    }

}