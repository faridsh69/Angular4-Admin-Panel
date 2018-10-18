import {Inject, NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import {MainComponent} from "./layout/main.component";
import {HeaderComponent} from "./layout/header.component";
import {SidebarComponent} from "./layout/sidebar.component";
import {ContentComponent} from "./layout/content.component";
import { StoreModule } from '@ngrx/store';
import rootReducer from "./_reducers/index";
import {HttpClientModule} from "@angular/common/http";

import { CategoryMainComponent } from "./category/category-main.component";
import { CategoryFormComponent } from "./category/category-form.component";
import { CategoryTableComponent } from "./category/category-table.component";
import { CategoryService } from "./_services/category.service";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { DataTableComponent } from "./widgets/data-table.component";
import { EmailValidator } from "./_shared/ajax-validate.directive";
import { SetMinHeightDirective } from "./_shared/set-min-height.directive";
import { DirectionDetectDirective } from "./_shared/direction-detect.directive";

import { BrandMainComponent } from "./brand/brand-main.component";
import { BrandFormComponent } from "./brand/brand-form.component";
import { BrandTableComponent } from "./brand/brand-table.component";
import { BrandService } from "./_services/brand.service";

import { ProductMainComponent } from "./product/product-main.component";
import { ProductFormComponent } from "./product/product-form.component";
import { ProductTableComponent } from "./product/product-table.component";
import { ProductService } from "./_services/product.service";
import {PaginationComponent} from "./widgets/pagination.component";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriceTableComponent } from "./price/price-table.component";
import { PriceService } from "./_services/price.service";

import { DiscountMainComponent } from "./discount/discount-main.component";
import { DiscountFormComponent } from "./discount/discount-form.component";
import { DiscountTableComponent } from "./discount/discount-table.component";
import { DiscountService } from "./_services/discount.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        routing,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        StoreModule.provideStore(rootReducer)
    ],
    declarations: [
        /* layout components */
        MainComponent,
        HeaderComponent,
        SidebarComponent,
        ContentComponent,
        DashboardComponent,
        LoginComponent,

        /* category components */
        CategoryMainComponent,
        CategoryFormComponent,
        CategoryTableComponent,

        /* brand components */
        BrandMainComponent,
        BrandFormComponent,
        BrandTableComponent,

        /* product components */
        ProductMainComponent,
        ProductFormComponent,
        ProductTableComponent,

        /* price components */
        DiscountMainComponent,
        DiscountFormComponent,
        DiscountTableComponent,

        PriceTableComponent,

        /* widgets */
        DataTableComponent,
        PaginationComponent,

        /* directives */
        EmailValidator,
        SetMinHeightDirective,
        DirectionDetectDirective
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        CategoryService,
        BrandService,
        ProductService,
        PriceService,
        DiscountService,
    ],
    bootstrap: [MainComponent]
})

export class AppModule {
}