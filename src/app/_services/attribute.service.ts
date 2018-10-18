import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {Attribute} from "../_models/attribute";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AttributeService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    removeAttributes(data: Attribute) {
        return this.http.post(AppSettings.API_URL+ 'attribute/remove', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    getCategoryAttributes(id: string): Promise<any> {
        return this.http.get(AppSettings.API_URL + "attribute/get-category?id="+id)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    getAttributes(): Promise<any> {
        return this.http.get(AppSettings.API_URL + "attribute")
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    saveAttributes(data: Attribute) {
        return this.http.post(AppSettings.API_URL+ 'attribute/save', JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .catch(err => console.log(err, "err"));
    }
}
