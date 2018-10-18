import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../_models/category";
import {AppSettings} from "../AppSettings";
import { CategoryService } from '../_services/category.service';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "category-table",
    templateUrl: 'category-table.component.html',
})

export class CategoryTableComponent {
    @Output() onUpdateSelectedCategory = new EventEmitter<Category>();
    @Input() categories:Category[];
    constructor(
        private categoryService: CategoryService,
        private notificationsService: NotificationsService){ }

    private categoryUrl =  AppSettings.STORE_BASE_URL+'/category/';
    public ajaxLoading:boolean=false;

    onClick(item: Category){
        this.onUpdateSelectedCategory.emit(item);
    }

    changeStatus(category: Category) {
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        this.categoryService.changeCategoryStatus(category.id).then((res: any) => {
            this.ajaxLoading = false;
            if(res.success){
                category.status = res.status;
                if(res.status){
                    this.notificationsService.info(
                    'تغییرات ذخیره شد', 'دسته‌بندی فعال شد.');
                }else{
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
        }).catch( ()=> {this.ajaxLoading = false;} );
    }
}