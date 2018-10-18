import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Discount} from "../_models/discount";
import {AppSettings} from "../AppSettings";
import { DiscountService } from '../_services/discount.service';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "discount-table",
    templateUrl: 'discount-table.component.html',
})

export class DiscountTableComponent {
    @Output() onUpdateSelectedDiscount = new EventEmitter<Discount>();
    @Input() discounts:Discount[];
    constructor(
        private discountService: DiscountService,
        private notificationsService: NotificationsService){ }

    private discountUrl =  AppSettings.STORE_BASE_URL+'/discount/';
    public ajaxLoading:boolean=false;

    onClick(item: Discount){
        this.onUpdateSelectedDiscount.emit(item);
    }

    changeStatus(discount: Discount) {
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        this.discountService.changeDiscountStatus(discount.id).then((res: any) => {
            this.ajaxLoading = false;
            if(res.success){
                discount.status = res.status;
                if(res.status){
                    this.notificationsService.info(
                    'تغییرات ذخیره شد', 'کد تخفیف فعال شد.');
                }else{
                    this.notificationsService.info(
                    'تغییرات ذخیره شد', 'کد تخفیف غیرفعال شد.');
                }
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطای سیستمی', 'خطایی در سیستم رخ داده‌است.');
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }
}