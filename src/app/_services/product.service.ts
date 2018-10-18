import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {AppSettings} from "../AppSettings";
import {Product} from "../_models/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestOptions} from "@angular/http/http";
import {Observable} from "rxjs/Rx";
import {variable} from "@angular/compiler/src/output/output_ast";

@Injectable()
export class ProductService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(
        private http: HttpClient) {
    }

    changeProductStatus(id: string) {
        console.log(1);
        return this.http.post(AppSettings.API_URL+ 'product/change-status', JSON.stringify(id), {headers: this.headers})
            .toPromise()
            .catch(error => console.log(error, "error"));
    }

    getInitials(id: string = null): Promise<any> {
        let url = AppSettings.API_URL + "product/initial";
        if(id){
            url += "?id="+id;
        }
        return this.http.get(url)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    getProducts(): Promise<any> {
        return this.http.get(AppSettings.API_URL + "product")
        .toPromise()
        .catch(err => console.log(err, "err"));
    }

    getOneProduct(id: string){
        return this.http.get(AppSettings.API_URL + "product/get?id="+id)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    saveProducts(data: Product) {
        let formData:FormData = new FormData();



        for(let x in data){
            if(x === 'gallery')
                continue;
            console.log("key:"+x+", "+JSON.stringify(data[x]), "data");
            formData.append(x, data[x] ? JSON.stringify(data[x]) : '');
        }

        if(data.gallery.length){
            let i=1;
            data.gallery.forEach(item => {
                console.log(item.file, "file Id");
                if(item.file){
                    if(item.fileId)
                        formData.append('gallery-'+item.fileId, item.file, item.file.name);
                    else
                        formData.append('gallery-new-'+i++, item.file, item.file.name);
                }
            });
        }


        return this.http.post(AppSettings.API_URL+ 'product/save', formData)
            .toPromise()
            .catch(err => console.log(err, "err"));
    }

    deleteImage(productId:string, fileId: string){
        return this.http.get(AppSettings.API_URL+ 'product/delete-image?fileId='+fileId+'&productId='+productId)
            .toPromise()
            .catch(error => console.log(error, "error"));
    }
}
