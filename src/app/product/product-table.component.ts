import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../_models/product";
import {AppSettings} from "../AppSettings";

import { ProductService } from '../_services/product.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "product-table",
    templateUrl: "product-table.component.html"
})

export class ProductTableComponent {
    @Input() products:Product[];


    constructor(
        private productService: ProductService,
        private notificationsService: NotificationsService){ }

    private options = {
        timeOut: 3000,
        animate:"rotate"
    };

    changeStatus(product: Product) {
    	console.log(product);
        this.productService.changeProductStatus(product.id).then((res: any) => {
            if(res.success){
                product.status = res.status;
                if(res.status){
                	console.log('success');
                    this.notificationsService.info(
                    'تغییرات ذخیره شد', 'دسته‌بندی فعال شد.');
                }else{
                	console.log('reject');
                    this.notificationsService.info(
                    'تغییرات ذخیره شد', 'دسته‌بندی غیرفعال شد.');
                }
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطای سیستمی', 'خطایی در سیستم رخ داده‌است.');
                // res.errors.forEach((data: any) => {
                //     if('attribute' in data
                //         && data.attribute in this.serverErrorValue
                //         && data.attribute in this.categoryForm.controls){

                //         new Promise(resolve => {
                //              this.serverErrorValue[data.attribute]['attribute'] = this.categoryForm.controls[data.attribute].value;
                //              this.serverErrorValue[data.attribute]['message'] = data.message;
                //             setTimeout(resolve, 50);
                //         }).then(()=>{
                //             this.categoryForm.controls[data.attribute].updateValueAndValidity();
                //         });

                //     }

                // });
            }
        }).catch( ()=> {} );
    }

    getPrice(item: Product){

        if(item.embeddedPrice.length){
            if(item.embeddedPrice.length === 1) {
                return item.embeddedPrice[0].price;
            }else{
                return 'دارای '+item.embeddedPrice.length+' قیمت';
            }
        }else{
            return 'بدون قیمت';
        }

    }
}