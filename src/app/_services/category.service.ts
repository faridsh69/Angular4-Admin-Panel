import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {Category} from "../_models/category";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CategoryService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    changeCategoryStatus(id: string) {
        return this.http.post(AppSettings.API_URL+ 'category/change-status', JSON.stringify(id), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
    

    getCategories(selectedCategoryId: string = ''): Promise<any> {
        let url = AppSettings.API_URL + "category";
        if(selectedCategoryId){
            url += "?selected-category="+selectedCategoryId.toString();
        }

        return this.http.get(url)
        .toPromise()
        .catch(error => console.log(error, "error"));
    }

    saveCategories(data: Category) {
        return this.http.post(AppSettings.API_URL+ 'category/save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    saveCategoryQuick(data: Category) {
        return this.http.post(AppSettings.API_URL+ 'category/quick-save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
}
