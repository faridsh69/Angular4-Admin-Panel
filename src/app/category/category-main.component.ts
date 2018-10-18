import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {SET_CATEGORIES, UPDATE_ONE_CATEGORY} from "./category-index.reducer";
import {SET_PARENTS} from "./category-parents.reducer";
import {SET_SELECTED_CATEGORY} from "./selected-category.reducer";
import 'rxjs/add/operator/switchMap';
import {pageData} from "../layout/main.action";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: "category-main",
    templateUrl: "category-main.component.html"
})

export class CategoryMainComponent implements OnInit, OnDestroy {

    selectedCategory: Category;
    categories:Category[];
    scenario: string;

    private _oldCategory: Category;
    private _selectedCategoryId: string;
    private options = {
        timeOut: 2000,
        animate:"rotate"
    }
    constructor(
        private notificationsService: NotificationsService,
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private store: Store<Category[]>){ }

    ngOnInit(): void {

        this.route.paramMap
            .subscribe( (params: ParamMap) => {
                this._selectedCategoryId = params.get('id');
            });

        this.store.select('selectedCategory').subscribe((selectedCategory: Category) => {
            this.selectedCategory=selectedCategory;
            console.log(this.selectedCategory, "selected category");
            this.setPageTitle();
        });

        this.store.select('categoryIndex')
            .subscribe((categories: Category[]) => {
                this.categories = categories;                
                if(!categories){ 

                    this.categoryService.getCategories(this._selectedCategoryId).then(({success, categories, selectedCategory}) =>{
                        console.log(success, "success in ajax");
                        if(success){
                            console.log(selectedCategory, "selectedCategory in ajax");
                            this.setSelectedCategory(selectedCategory);
                            this.setCategories(categories);
                        }else{
                            this.notificationsService.error(
                                'خطا!', 'دسته مورد نظر یافت نشد.');
                        }
                    });
                }

            });


        if(this._selectedCategoryId){
            console.log("set old category");
            this._oldCategory = Object.assign({}, this.selectedCategory);
        }

        this.setPageTitle();

    }

    ngOnDestroy(): void {
        console.log(this._oldCategory, "old category go back");
        if(this._oldCategory){
            console.log("go back");
            this.updateOneCategory(this.selectedCategory, this._oldCategory);
            this.setSelectedCategory(new Category);
        }
    }

    updateCategories(categories:Category[]):void {
        this.setSelectedCategory(new Category);
        this.setCategories(categories);

        if(this._selectedCategoryId){
            // go back to /category route after updating
            this.router.navigate(['/category']);
        }

    }

    updateSelectedCategory(category: Category):void{
        this.setSelectedCategory(category);
    }

    setCategories(categories: Category[]){
        this.store.dispatch({
            type: SET_CATEGORIES,
            payload: categories
        });
    }

    setSelectedCategory(selectedCategory: Category){
        this.store.dispatch({
            type: SET_SELECTED_CATEGORY,
            payload: selectedCategory
        });
    }

    updateOneCategory(category: Category, newVal: Category){
        this.store.dispatch({
            type: UPDATE_ONE_CATEGORY,
            payload: { category, newVal }
        });
    }

    setPageTitle(): void {
        if(this._selectedCategoryId){
            this.scenario = 'update';
            const title = this.selectedCategory.name === undefined ? 'ویرایش' :  'ویرایش دسته '+this.selectedCategory.name;
            // set title and breadcrumbs
            document.title = title;
            this.store.dispatch(pageData({
                title: title,
                desc : '',
                breadcrumbs: [
                    { name: 'دسته بندی‌ها', to: '/category'},
                    { name: title}
                ]
            }));
        }else{
            this.scenario = 'index';
            // set title and breadcrumbs
            document.title = 'دسته بندی‌ها';
            this.store.dispatch(pageData({
                title: 'دسته بندی‌ها',
                desc : '',
                breadcrumbs: [
                    { name: 'دسته بندی‌‌ها'}
                ]
            }));
        }
    }

}