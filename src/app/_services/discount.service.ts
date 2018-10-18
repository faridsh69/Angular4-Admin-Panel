import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {Discount} from "../_models/discount";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class DiscountService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    changeDiscountStatus(id: string) {
        return this.http.post(AppSettings.API_URL+ 'discount/change-status', JSON.stringify(id), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
    
    getDiscounts(selectedDiscountId: string = ''): Promise<any> {
        let url = AppSettings.API_URL + "discount";
        if(selectedDiscountId){
            url += "?selected-discount="+selectedDiscountId.toString();
        }

        return this.http.get(url)
        .toPromise()
        .catch(error => console.log(error, "error"));
    }

    saveDiscounts(data: Discount) {
        return this.http.post(AppSettings.API_URL+ 'discount/save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    saveCategoryQuick(data: Discount) {
        return this.http.post(AppSettings.API_URL+ 'category/quick-save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
}
