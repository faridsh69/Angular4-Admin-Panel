import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {EmbeddedPrice} from "../_models/embeddedPrice";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "@angular/http/http";
import {Observable} from "rxjs/Rx";
import {variable} from "@angular/compiler/src/output/output_ast";

@Injectable()
export class PriceService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    getInitials(): Promise<any> {
        let url = AppSettings.API_URL + "price/initial";
        return this.http.get(url)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    searchCategoryAndBrand(data: any) {
        return this.http.post(AppSettings.API_URL+ 'price/search', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
    
    savePrices(data: EmbeddedPrice) {
        let formData:FormData = new FormData();
        for(let x in data){
            console.log("key:"+data[x].id+", "+JSON.stringify(data[x]), "data");
            formData.append(data[x].id, data[x] ? JSON.stringify(data[x]) : '');
        }

        return this.http.post(AppSettings.API_URL+ 'price/save', formData)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }
}
