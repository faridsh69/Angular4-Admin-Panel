import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import {AppSettings} from "../AppSettings";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "category-form",
    templateUrl: "category-form.component.html",
    providers: [CategoryService,Category]
})

export class CategoryFormComponent implements OnInit{

    @Output() onUpdateCategories = new EventEmitter<Category[]>();
    // @Output() onUpdateParents = new EventEmitter<any>();
	@Input() categories:Category[];
	@Input() category:Category;
	@ViewChild('CategoryForm') categoryForm: HTMLFormElement;
    serverErrorValue = {
        name: {attribute: '', message: ''},
        parentId: {attribute: '', message: ''},
        description: {attribute: '', message: ''},
        slug: {attribute: '', message: ''}
    };

    public ajaxLoading:boolean=false;
     
    constructor(
        private categoryService: CategoryService,
        private notificationsService: NotificationsService){ }

    ngOnInit() {
        if(!this.category.name){ // if form isn`t in update scenario
            this.category.parentId = null;    
        }
    }

    onSubmit() {
        if(this.ajaxLoading){
            return false;
        }
        console.log(this.category,'test id categiry');
        this.ajaxLoading = true;
        this.categoryService.saveCategories(this.category).then((res: any) => {
            this.ajaxLoading = false;
            if(res.success){
                this.onUpdateCategories.emit(res.categories);
                this.categoryForm.reset();
                setTimeout(() => {
                  this.category.parentId = null;
                });
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'دسته‌بندی جدید ذخیره شد.');
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
                res.errors.forEach((data: any) => {
                    if('attribute' in data
                        && data.attribute in this.serverErrorValue
                        && data.attribute in this.categoryForm.controls){

                        new Promise(resolve => {
                             this.serverErrorValue[data.attribute]['attribute'] = this.categoryForm.controls[data.attribute].value;
                             this.serverErrorValue[data.attribute]['message'] = data.message;
                            setTimeout(resolve, 50);
                        }).then(()=>{
                            this.categoryForm.controls[data.attribute].updateValueAndValidity();
                        });

                    }

                });
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
	}

	get storeUrl(){
	    return AppSettings.STORE_BASE_URL+'/products/';
	}
    get diagnostic() { return JSON.stringify(this.category); 
    }

    get title(){
        if(this.category.title){
            return this.category.title;
        }else if(this.category.name){
            return this.category.name;
        }
    }

    get url(){

        let string =  AppSettings.STORE_BASE_URL+'/category/';
        if(this.category.slug){

            if(!(new RegExp(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]/g)).test(this.category.slug)){
                string += this.category.slug;
            }
            return string;
        }else if(this.category.name){

            let temp = this.category.name.replace(/^[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '' );
            temp = temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+$/g, '' );
            string += temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '-' );
            return string;
        }else{
            return null;
        }
    }

    get metaDescriptionString(){
        if(this.category.metaDescription){
            return this.checkText(this.category.metaDescription);
        }else if(this.category.description){
            return this.checkText(this.category.description);
        }
    }
    checkText(str: string){
        let res = str.slice(0, 160);
        if(str.length > 160)
            res += ' ...';

        return res;
    }

}