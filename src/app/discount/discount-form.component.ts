import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import { Discount } from '../_models/discount';
import { DiscountService } from '../_services/discount.service';
import { AppSettings } from "../AppSettings";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "discount-form",
    templateUrl: "discount-form.component.html",
    providers: [DiscountService,Discount]
})

export class DiscountFormComponent implements OnInit{

    @Output() onUpdateDiscounts = new EventEmitter<Discount[]>();
    // @Output() onUpdateParents = new EventEmitter<any>();
	@Input() discounts:Discount[];
	@Input() discount:Discount;
	@ViewChild('DiscountForm') discountForm: HTMLFormElement;
    serverErrorValue = {
        name: {attribute: '', message: ''},
        code: {attribute: '', message: ''},
        value: {attribute: '', message: ''},
        type: {attribute: '', message: ''}
    };

    public ajaxLoading:boolean=false;
     
    constructor(
        private discountService: DiscountService,
        private notificationsService: NotificationsService){ }

    ngOnInit() {
        this.discount.type = 'amount';
    }

    onSubmit() {
        if(this.ajaxLoading){
            return false;
        }
        console.log(this.discount,'test id discount');
        this.ajaxLoading = true;
        this.discountService.saveDiscounts(this.discount).then((res: any) => {
            this.ajaxLoading = false;
            if(res.success){
                this.onUpdateDiscounts.emit(res.discounts);
                this.discountForm.reset();
                setTimeout(() => {
                  // this.discount.parentId = null;
                });
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'دسته‌بندی جدید ذخیره شد.');
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
                res.errors.forEach((data: any) => {
                    if('attribute' in data
                        && data.attribute in this.serverErrorValue
                        && data.attribute in this.discountForm.controls){

                        new Promise(resolve => {
                             this.serverErrorValue[data.attribute]['attribute'] = this.discountForm.controls[data.attribute].value;
                             this.serverErrorValue[data.attribute]['message'] = data.message;
                            setTimeout(resolve, 50);
                        }).then(()=>{
                            this.discountForm.controls[data.attribute].updateValueAndValidity();
                        });

                    }

                });
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
	}

	get storeUrl(){
	    return AppSettings.STORE_BASE_URL+'/products/';
	}
}