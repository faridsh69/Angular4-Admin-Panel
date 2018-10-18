import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../_services/product.service";
import {Product} from "../_models/product";
import {Store} from "@ngrx/store";

import {setProducts} from "./product.actions";
import {pageData} from "../layout/main.action";

@Component({
    selector: "product-main",
    templateUrl: "product-main.component.html"
})

export class ProductMainComponent implements OnInit{

    selectedProduct: Product = new Product;
    products:Product[];
    scenario: string;

    constructor(
        private productService: ProductService,
        private store: Store<Product[]>){ }

    ngOnInit(): void {
        console.log(this.products,'this-products');
        const title = 'کالاها';
        document.title = title;
        this.store.dispatch(pageData({
            title: title,
            desc : '',
            breadcrumbs: [
                { name: title},
            ]
        }));


        this.store.select('productIndex')
            .subscribe((products: Product[]) => {
                this.products = products;
                console.log(products, "state products");
                if(!products){ // if categories has not been set, get new one from server

                    this.productService.getProducts().then(({success, products}) =>{
                        console.log(success, "success");
                        console.log(products, "ajax products");
                        if(success){
                            this.store.dispatch(setProducts(products));
                        }
                    });
                }

            });
    }
}