import {ElementRef, Component, OnInit, ViewChild} from '@angular/core';


import {AppSettings} from "../AppSettings";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {pageData} from "../layout/main.action";

import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

import { Brand } from '../_models/brand';
import { BrandService } from '../_services/brand.service';

import { Attribute } from '../_models/attribute';
import { AttributeService } from '../_services/attribute.service';
import { EmbeddedPrice } from '../_models/embeddedPrice';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {setProducts} from "./product.actions";
import {Gallery} from "../_models/gallery";

declare var jQuery: any;

@Component({
    selector: "brand-form",
    templateUrl: "product-form.component.html",
    providers: [Product,AttributeService]
    // providers: [Product,Attribute,Brand,Category,CategoryService,BrandService]
})

export class ProductFormComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('ProductForm') productForm: HTMLFormElement;
    @ViewChild('AttributeForm') attributeForm: HTMLFormElement;
    @ViewChild('CategoryForm') categoryForm: HTMLFormElement;
    @ViewChild('BrandForm') brandForm: HTMLFormElement;

    private product: Product;
    public scenario: string;
    private _selectedProductId: string;

    public ajaxLoading:boolean=false;
    public initLoading:boolean=true;

    private newCategoryModal:boolean;
    public category:Category;
    public categories:Category[];

    private newBrandModal:boolean;
    public brand:Brand;
    public brands:Brand[];

    private newAttributeModal:boolean;
    private selectOldAttr:boolean;    
    public attributes:Attribute[];
    public oldAttributes:Attribute[];    
    public attribute: Attribute;
    public oldAttributeId: string;
    private isPriceAffected:boolean;
    
    public embeddedPrices:EmbeddedPrice[];

    serverErrorValue = {
        name: {attribute: '', message: ''}, // attribute name
        nameEn: {attribute: '', message: ''}, // product name
        brandNameEn: {attribute: '', message: ''},
        categoryName: {attribute: '', message: ''},
        // categoryId: {attribute: '', message: ''},
        slug: {attribute: '', message: ''},
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private brandService: BrandService,
        private productService: ProductService,
        private attributeService: AttributeService,
        private notificationsService: NotificationsService,
        private store: Store<Product>){ }

    private options = {
        timeOut: 2000,
        animate:"rotate"
    };
    ngOnInit() {
        this.route.paramMap
            .subscribe( (params: ParamMap) => {
                this._selectedProductId=params.get('id');
            });

        this.scenario = this._selectedProductId ? 'update' : 'create';

        this.category = new Category;
        this.brand = new Brand;
        this.attribute = new Attribute;
        this.attribute.type = '';

        this.product = new Product;
        this.embeddedPrices = this.getInitialPrice();
        this.attributes = [];

        this.setPageTitle();

        this.productService.getInitials(this.scenario === 'update' ? this._selectedProductId : null).then(({success, categories, brands, product}) =>{

            if(success){
                this.categories = categories;
                this.brands = brands;
                this.product.brandId = "";
                this.product.categoryId = "";

                if(this.scenario === 'update'){
                    console.log(product, "update product initial vals");
                    this.product = product;
                    this.product.gallery = product.gallery ? product.gallery : [];
                    console.log(this.attributes, "attributes");
                    this.attributes = this.product.attribute;
                    this.embeddedPrices = this.product.embeddedPrice.length === 0 ? this.getInitialPrice() : this.product.embeddedPrice;
                    console.log(this.embeddedPrices, "embedded-price");
                    console.log(this.product, "product");
                    this.setPageTitle();
                }

                this.initLoading=false;
            }
        });
    }

    private getInitialPrice():any{
        return [ {'attribute':[],'price':null,'inventory':null} ];
    }

    deleteImage(gallery: Gallery){
        console.log(gallery, "gallery");
        if(gallery.fileId){
            // remove image from server via ajx
            if(gallery.isDeleteLoading){
                return;
            }
            gallery.isDeleteLoading=true;
            this.productService.deleteImage(this.product.id, gallery.fileId).then((res:any)=>{
                if(res.success){
                    gallery.isDeleteLoading=false;
                    const index = this.product.gallery.indexOf(gallery);
                    console.log(index, "index of gallery");
                    if(index > -1){
                        this.product.gallery.splice(index, 1);
                        console.log(this.product.gallery);
                    }
                }
            });
        }else{
            const index = this.product.gallery.indexOf(gallery);
            console.log(index, "index of gallery");
            if(index > -1){
                this.product.gallery.splice(index, 1);
                console.log(this.product.gallery);
            }
        }
    }

    changeCategory(): void {
        this.attributes = [];
        this.embeddedPrices = this.getInitialPrice();
        this.attributeService.getCategoryAttributes(this.product.categoryId).then(({success, attributes}) => {
            if (success) {
                attributes.forEach((item: Attribute) => {
                    if(item.isPriceAffected){
                        this.embeddedPrices[0].attribute.push(item);
                    }else{
                        this.attributes.push(item);
                    }
                });
            }
        });
    }



    removeAttribute(attribute:Attribute):void {
        // remove attribute from page
        this.attributes.splice(this.attributes.indexOf(attribute),1);
        // remove attribute from category with category Id
        let $removeAttribute = new Attribute();
        $removeAttribute.id = attribute.id;
        $removeAttribute.categoryId = this.product.categoryId;
        console.log($removeAttribute);
        this.attributeService.removeAttributes($removeAttribute).then((res: any) => {
            if(res.success){
                console.log('attribute removed');
            }
        });
    }
    selectOldAttributes():void {
        this.selectOldAttr = true;
        this.ajaxLoading = true;
        this.attributeService.getAttributes().then(({success, attributes}) => {
            this.ajaxLoading = false;
            if (success) {
                this.oldAttributes = attributes;
                this.oldAttributeId = '';
                console.log(this.oldAttributes,'attributes');
            }
        });
    }
    
    addPrice(): void{
        let item = new EmbeddedPrice;
        item.attribute = [];
        this.embeddedPrices[0].attribute.forEach((attr:Attribute) => {
            let temp = Object.assign({},attr);
            temp.data = null;
            item.attribute.push(temp);
        });
        this.embeddedPrices.push(item);
        console.log(this.embeddedPrices);
    }

    onFileBtnClick(){
        jQuery(this.fileInput.nativeElement).click();
    }

    fileChange(event:any) {

        const fileList:FileList = event.target.files;
        if(fileList.length > 0) {
            const gallery = new Gallery;
            gallery.file = fileList[0];

            const reader = new FileReader();
            reader.onload = ()=> {
                gallery.src = reader.result;
            };
            reader.readAsDataURL(fileList[0]);
            this.product.gallery.push(gallery);
        }
        event.target.value = '';

    }



    onSubmitCategory() {
        console.log(this.category);
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        this.categoryService.saveCategoryQuick(this.category).then((res: any) => {
            this.ajaxLoading = false;
            console.log(res);
            if(res.success){

                this.categoryForm.reset();
                this.newCategoryModal = false;
                this.categories.push(res.category);
                this.product.categoryId = res.category.id;
                this.attributes = [];
                this.embeddedPrices = this.getInitialPrice();
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'دسته‌بندی جدید ذخیره شد.');
            }else if('errors' in res){
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
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }

    onSubmitBrand() {
        console.log(this.brand);
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        this.brandService.saveBrandQuick(this.brand).then((res: any) => {
            this.ajaxLoading = false;
            console.log(res);
            if(res.success){
                this.brandForm.reset();
                this.newBrandModal = false;
                this.brands.push(res.brand);
                this.product.brandId = res.brand.id;
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'برند جدید ذخیره شد.');
            }else if('errors' in res){
                res.errors.forEach((data: any) => {
                    if('attribute' in data
                        && data.attribute in this.serverErrorValue
                        && data.attribute in this.brandForm.controls){
                        new Promise(resolve => {
                            this.serverErrorValue[data.attribute]['attribute'] = this.brandForm.controls[data.attribute].value;
                            this.serverErrorValue[data.attribute]['message'] = data.message;
                            setTimeout(resolve, 50);
                        }).then(()=>{
                            this.brandForm.controls[data.attribute].updateValueAndValidity();
                        });
                    }
                });
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }

    onSubmitAttribute() {
        console.log(this.attribute);
        console.log(this.oldAttributeId);
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;
        this.attribute.categoryId = this.product.categoryId;
        this.attribute.isPriceAffected = this.isPriceAffected;
        this.attribute.id = this.oldAttributeId;
        console.log(this.attribute);
        this.attributeService.saveAttributes(this.attribute).then((res: any) => {
            this.ajaxLoading = false;
            console.log(res);
            if(res.success){
                this.attributeForm.reset();
                this.attribute.type = '';
                this.newAttributeModal = false;
                console.log(this.attributes);
                if(res.attribute.isPriceAffected){
                    this.embeddedPrices.forEach((embeddedPrice) => {
                        const newAttribute = Object.assign({}, res.attribute);
                        embeddedPrice.attribute.push(newAttribute);
                    });
                }else{
                    this.attributes.push(res.attribute);
                }
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'ویژگی جدید اضافه شد.');
            }else if('errors' in res){
                res.errors.forEach((data: any) => {
                    if('attribute' in data
                        && data.attribute in this.serverErrorValue
                        && data.attribute in this.attributeForm.controls){
                        new Promise(resolve => {
                            this.serverErrorValue[data.attribute]['attribute'] = this.attributeForm.controls[data.attribute].value;
                            this.serverErrorValue[data.attribute]['message'] = data.message;
                            setTimeout(resolve, 50);
                        }).then(()=>{
                            this.attributeForm.controls[data.attribute].updateValueAndValidity();
                        });
                    }
                });
                this.notificationsService.error(
                    'موفقیت آمیز بود!', 'دسته‌بندی جدید ذخیره شد.');
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }

    onSubmit() {
        if(this.ajaxLoading){
            return false;
        }
        this.product.attribute = this.attributes;
        this.product.embeddedPrice = this.embeddedPrices;
        this.ajaxLoading = true;
        //console.log(this.product);
        this.productService.saveProducts(this.product).then((res: any) => {
            this.ajaxLoading = false;
            console.log(res);
            if(res.success){
                this.store.dispatch(setProducts(res.products));

                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'کالای جدید ذخیره شد.');
                // go to brand index
                this.router.navigate(['/product']);

                // this.productForm.reset();
                // this.attributes = [];
                // this.embeddedPrices = [ {'attributes':[],'price':0,'inventory':0} ];
                // this.product.attribute = [];
                // this.product.embeddedPrices = [];

            }else if('errors' in res){
                res.errors.forEach((data: any) => {
                    if('attribute' in data
                        && data.attribute in this.serverErrorValue
                        && data.attribute in this.productForm.controls){

                        new Promise(resolve => {
                            this.serverErrorValue[data.attribute]['attribute'] = this.productForm.controls[data.attribute].value;
                            this.serverErrorValue[data.attribute]['message'] = data.message;
                            setTimeout(resolve, 50);
                        }).then(()=>{
                            this.productForm.controls[data.attribute].updateValueAndValidity();
                        });
                    }
                });
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }


    setPageTitle(): void {
        if(this._selectedProductId){
            const title = this.product.nameEn === undefined ? 'ویرایش' :  'ویرایش کالا '+this.product.nameEn;
            // set title and breadcrumbs
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'کالاها', to: '/product'},
                    { name: title}
                ]
            }));
        }else{

            // set title and breadcrumbs
            const title = 'ایجاد کالا جدید';
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'کالاها' , to: '/product'},
                    { name: title}
                ]
            }));
        }
    }

    get storeUrl(){
        return AppSettings.STORE_BASE_URL+'/products/';
    }

    get diagnostic() { return JSON.stringify(this.product); }

    get diagnosticCategory() { return JSON.stringify(this.category); }

    get diagnosticBrand() { return JSON.stringify(this.brand); }

    get diagnosticAttribute() { return JSON.stringify(this.attribute); }


    get title(){
        if(this.product.title){
            return this.product.title;
        }else if(this.product.nameEn){
            let string = this.product.nameEn;
            if(this.product.nameFa)
                string += ' | '+this.product.nameFa;

            return string;
        }else {
            return null;
        }
    }

    get url(){

        let string =  AppSettings.STORE_BASE_URL+'/product/';
        if(this.product.slug){

            if(!(new RegExp(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]/g)).test(this.product.slug)){
                string += this.product.slug;
            }
            return string;
        }else if(this.product.nameEn){

            let temp = this.product.nameEn.replace(/^[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '' );
            temp = temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+$/g, '' );
            string += temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '-' );
            return string;
        }else{
            return null;
        }

    }

    get metaDescriptionString(){
        if(this.product.metaDescription){
            return this.checkText(this.product.metaDescription);
        }else if(this.product.description){
            return this.checkText(this.product.description);
        }else{
            return null;
        }
    }
    checkText(str: string){
        let res = str.slice(0, 160);
        if(str.length > 160)
            res += ' ...';

        return res;
    }
}