import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { Brand } from '../_models/brand';
import { BrandService } from '../_services/brand.service';
import {AppSettings} from "../AppSettings";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {setBrands, setSelectedBrand, updateOneBrand} from "./brand.actions";
import {pageData} from "../layout/main.action";
import {fakeAsync} from "@angular/core/testing";
import {window} from "rxjs/operator/window";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "brand-form",
    templateUrl: "brand-form.component.html",
    providers: [BrandService,Brand]
})

export class BrandFormComponent implements OnInit, OnDestroy {

    @ViewChild('logo') fileInput: ElementRef;
    @ViewChild('BrandForm') brandForm: HTMLFormElement;
    serverErrorValue = {
        nameEn: {attribute: '', message: ''},
        nameFa: {attribute: '', message: ''},
        description: {attribute: '', message: ''},
        logoId: {attribute: '', message: ''},
        slug: {attribute: '', message: ''},
    };

    public fileList:FileList;
    public ajaxLoading:boolean=false;
    public ajaxDeleteLogo:boolean=false;
    public editSeo:boolean=false;
    public firstLoading:boolean=false;

    public brand: Brand;
    public scenario: string;
    public logoSrc: any;

    private _oldBrand: Brand;
    private _selectedBrandId: string;

     private options = {
        timeOut: 2000,
        animate:"rotate"
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private brandService: BrandService,
        private notificationsService: NotificationsService,
        private store: Store<Brand>){ }

    ngOnInit() {

        this.route.paramMap
            .subscribe( (params: ParamMap) => {
                this._selectedBrandId=params.get('id');
            });

        this.scenario = this._selectedBrandId ? 'update' : 'create';

        this.store.select('selectedBrand').subscribe((selectedBrand: Brand) => {

            this.brand=selectedBrand;
            if(this.brand.logoId){
                this.logoSrc = this.brand.logoId;
            }

            this.setPageTitle();

            if(this.scenario === 'update' && this.brand.nameEn === undefined){
                this.firstLoading=true;
                this.brandService.getOneBrand(this._selectedBrandId).then((brand: Brand)=>{
                    this.store.dispatch(setSelectedBrand(brand));
                    this.firstLoading=false;
                }).catch(()=> this.firstLoading=true);
            }
        });

        if(this._selectedBrandId){
            this._oldBrand = Object.assign({}, this.brand);
        }

    }


    ngOnDestroy(): void {

        if(this._oldBrand){
            this.store.dispatch(updateOneBrand(this.brand.id, this._oldBrand));
        }
        this.scenario = '';
        this.store.dispatch(setSelectedBrand(new Brand));
    }

    fileChange(event:any) {
        this.fileList = event.target.files;
        if(this.fileList.length > 0) {
            this.brand.logoId = this.fileList[0];
        }

        const reader = new FileReader();
        reader.onload = ()=> {
            this.logoSrc = reader.result;
        };
        reader.readAsDataURL(this.fileList[0]);
    }

    deleteLogo(){
        
        if(this._oldBrand && this._oldBrand.logoId){
            if(this.ajaxDeleteLogo){
                return;
            }
            // in update scenario send ajax to server to delete logo from server
            this.ajaxDeleteLogo=true;
            this.brandService.deleteLogo(this.brand.id).then( (res:any) => {
                this.ajaxDeleteLogo=false;
                if(res.success){
                    this.logoSrc=null;
                    this.brand.logoId=null;
                    this.fileInput.nativeElement.value=null;

                    this._oldBrand.logoId=null;
                }

            }).catch(()=>this.ajaxDeleteLogo=false);
        }else{
            // in create scenario, just remove logo from screen
            this.logoSrc=null;
            this.brand.logoId=null;
            this.fileInput.nativeElement.value=null;
        }

    }

    onSubmit() {
        if(this.ajaxLoading){
            return false;
        }
        this.ajaxLoading = true;

        this.brandService.saveBrands(this.brand).then((res: any) => {
            this.ajaxLoading = false;
            if(res.success){
                this.notificationsService.success(
                    'موفقیت آمیز بود!', 'برند جدید ذخیره شد.');
                this._oldBrand=null;
                this.store.dispatch(setBrands(res.brands));
                // go to brand index
                this.router.navigate(['/brand']);
                
            }else if('errors' in res){
                this.notificationsService.error(
                    'خطا!', 'فرم را اصلاح نمایید.');
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
            }
        }).catch( ()=> {this.ajaxLoading = false;} );
    }

    setPageTitle(): void {
        if(this._selectedBrandId){
            const title = this.brand.nameEn === undefined ? 'ویرایش' :  'ویرایش برند '+this.brand.nameEn;
            // set title and breadcrumbs
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'خانه' , to: '/'},
                    { name: 'برندها', to: '/brand'},
                    { name: title}
                ]
            }));
        }else{

            // set title and breadcrumbs
            const title = 'ایجاد برند جدید';
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'برندها' , to: '/brand'},
                    { name: title}
                ]
            }));
        }
    }

    get title(){
        if(this.brand.title){
            return this.brand.title;
        }else if(this.brand.nameEn){
            let string = this.brand.nameEn;
            if(this.brand.nameFa)
                string += ' | '+this.brand.nameFa;

            return string;
        }else {
            return null;
        }
    }

    get url(){

        let string =  AppSettings.STORE_BASE_URL+'/brand/';
        if(this.brand.slug){

            if(!(new RegExp(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]/g)).test(this.brand.slug)){
                string += this.brand.slug;
            }
            return string;
        }else if(this.brand.nameEn){

            let temp = this.brand.nameEn.replace(/^[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '' );
            temp = temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+$/g, '' );
            string += temp.replace(/[ \;\/\?\:\@\=\& \<\>\#\%\{\}\|\\\^\~\[\]\`]+/g, '-' );
            return string;
        }else{
            return null;
        }

    }

    get metaDescriptionString(){
        if(this.brand.metaDescription){
            return this.checkText(this.brand.metaDescription);
        }else if(this.brand.description){
            return this.checkText(this.brand.description);
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