import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {Brand} from "../_models/brand";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "@angular/http/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class BrandService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    getBrands(page: number= 0): Promise<any> {
        let url = AppSettings.API_URL + "brand";
        if(page!==0){
            url += '?page='+page;
        }
        return this.http.get(url)
        .toPromise()
        .catch(error => console.log(error, "error"));
    }

    getOneBrand(id: string){
        return this.http.get(AppSettings.API_URL + "brand/get?id="+id)
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    saveBrandQuick(data: Brand) {
        return this.http.post(AppSettings.API_URL+ 'brand/quick-save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    saveBrands(data: Brand) {
        let formData:FormData = new FormData();

        let url = AppSettings.API_URL+ 'brand/save';
        if(data.id)
            url += '?id='+data.id;


        if(data.logoId)
            formData.append('logoId', data.logoId, data.logoId.name);

        formData.append('nameEn', data.nameEn ? data.nameEn : '');
        formData.append('nameFa', data.nameFa ? data.nameFa : '');
        formData.append('description', data.description ? data.description : '');
        formData.append('metaDescription', data.metaDescription ? data.metaDescription : '');
        formData.append('slug', data.slug ? data.slug : '');
        formData.append('title', data.title ? data.title : '');


       return this.http.post(url, formData)
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    deleteLogo(brandId: string){
        return this.http.get(AppSettings.API_URL+ 'brand/delete-logo?id='+brandId)
        .toPromise()
        .catch(error => console.log(error, "error"));
    }
}
