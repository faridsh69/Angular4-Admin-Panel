import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoryMainComponent} from "./category/category-main.component";
import {BrandMainComponent} from "./brand/brand-main.component";
import {BrandFormComponent} from "./brand/brand-form.component";
import {ProductMainComponent} from "./product/product-main.component";
import {ProductFormComponent} from "./product/product-form.component";
import {DiscountMainComponent} from "./discount/discount-main.component";
import {PriceTableComponent} from "./price/price-table.component";


const appRoutes: Routes = [
    // { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },

    /* Category components */
    { path: 'category', component: CategoryMainComponent },
    { path: 'category/update/:id', component: CategoryMainComponent},

    { path: 'brand', component: BrandMainComponent },
    { path: 'brand/page/:page', component: BrandMainComponent },
    { path: 'brand/new', component: BrandFormComponent },
    { path: 'brand/update/:id', component: BrandFormComponent },

    { path: 'product', component: ProductMainComponent },
    { path: 'product/new', component: ProductFormComponent },
    { path: 'product/update/:id', component: ProductFormComponent },

    { path: 'price', component: PriceTableComponent },
    { path: 'discount', component: DiscountMainComponent },

    { path: '', redirectTo: '/', pathMatch: 'full'},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);