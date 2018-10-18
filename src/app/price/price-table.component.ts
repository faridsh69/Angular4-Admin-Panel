import {Component, EventEmitter, OnInit,ViewChild} from '@angular/core';
import {EmbeddedPrice} from "../_models/embeddedPrice";
import {AppSettings} from "../AppSettings";
import {Store} from "@ngrx/store";
import {pageData} from "../layout/main.action";

import { PriceService } from '../_services/price.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

import { Discount } from '../_models/discount';
import { Category } from '../_models/category';
import { Brand } from '../_models/brand';

@Component({
    selector: "price-table",
    templateUrl: "price-table.component.html"
})

export class PriceTableComponent implements OnInit{
    @ViewChild('CategoryForm') categoryForm: HTMLFormElement;
    @ViewChild('DiscountForm') discountForm: HTMLFormElement;
    @ViewChild('ChangePriceForm') changePriceForm: HTMLFormElement;

    private options = {
        timeOut: 3000,
        animate:"rotate"
    }
    private startingAlert:boolean = true;
    private newDiscountModal:boolean = false;
    private discount:Discount;
    private newChangePriceModal:boolean = false;
    private changePrice:Discount;
    private ajaxLoading:boolean = false;
    private categories:Category[] = [];
    private categoryId:string = null;
    private brands :Brand[] = [];
    private brandId:string = null;
    private priceUrl =  AppSettings.STORE_BASE_URL+'/price/';
    private prices:EmbeddedPrice[];

    constructor(
        private priceService: PriceService,
        private store: Store<EmbeddedPrice[]>,
        private notificationsService: NotificationsService){ }
    

    ngOnInit(): void {
        this.initialise();
        this.setPageTitle();
        this.priceService.getInitials().then(({success, categories, brands}) =>{
            console.log(categories, "categories");
            console.log(brands, "brands");
            if(success){
                this.categories = categories;
                this.brands = brands;
            }else{
                this.notificationsService.error(
                    'خطا!', 'کالاهای موردنظر یافت نشد.');
            }
        });
    }

    initialise(){
        this.discount = new Discount();
        this.discount.type = 'percent'; 
        this.changePrice = new Discount();
        this.changePrice.type = 'percent';
        this.changePrice.status = true;
        this.newDiscountModal = false;
        this.newChangePriceModal = false;
    }

    setPageTitle(): void {
        const title = 'قیمت‌ها';
        document.title = title;
        this.store.dispatch(pageData({
            title: title,
            desc : '',
            breadcrumbs: [
                { name: title}
            ]
        }));
    }

    onSubmitSearch() {
        this.startingAlert = false;
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        let data = [this.categoryId,this.brandId];
        this.priceService.searchCategoryAndBrand(data).then((res: any) => {
            this.ajaxLoading = false;
            console.log(res);
            if(res.success){
                this.prices = res.prices;
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطا!', 'مشکلی در سیستم رخ داده است.');                
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }

    onSubmitDiscount() {
        if(this.discount.type == 'amount')
            this.prices.forEach( (item) =>{
                item.discountPrice = Math.ceil( item.price - this.discount.value );
                if(item.discountPrice < 0){ item.discountPrice = 0; }
            });
        else{
            this.prices.forEach( (item) =>{
                item.discountPrice = Math.ceil( item.price * ( (100 - this.discount.value) / 100 ) );
                if(item.discountPrice < 0){ item.discountPrice = 0; }
            });
        }
        this.initialise();
        this.notificationsService.info(
            'تخفیف اعمال شد!', 'برای ذخیره دکمه تایید را بزنید.'); 
        return false;
    }

    onSubmitChangePrice() {
        console.log(this.changePrice);
        if(this.changePrice.type == 'amount'){
            if(this.changePrice.status){
                this.prices.forEach( (item) =>{
                    item.price = Math.ceil( item.price + this.changePrice.value );
                    if(item.price < 0){ item.price = 0; }
                });
            }else{
                this.prices.forEach( (item) =>{
                    item.price = Math.ceil(item.price - this.changePrice.value);
                    if(item.price < 0){ item.price = 0; }
                });
            }
        }else{
            if(this.changePrice.status){
                this.prices.forEach( (item) =>{
                    item.price = Math.ceil(item.price * ( (100 + this.changePrice.value) / 100 ) );
                    if(item.price < 0){ item.price = 0; }
                });
            }else{
                this.prices.forEach( (item) =>{
                    item.price = Math.ceil(item.price * ( (100 - this.changePrice.value) / 100 ) );
                    if(item.price < 0){ item.price = 0; }
                });
            }
        }
        this.initialise();
        this.notificationsService.info(
            'تغییرات اعمال شد!', 'برای ذخیره دکمه تایید را بزنید.'); 
        return false;
    }

    savePrices(){
        console.log('save action ');
        this.ajaxLoading = true;
        this.priceService.savePrices(this.prices).then((res: any) => {
            console.log(res);
            this.ajaxLoading = false;
            if(res.success){
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'تغییرات ذخیره شد.');
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطا!', 'در ذخیره کردن مشکلی پیش آمده.');                
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }
}