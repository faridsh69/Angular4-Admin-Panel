import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../_models/pagination";

@Component({
    selector: 'pagination',
    template: ` 
        <div class="row" *ngIf="pagination.pageCount > 1">
            <ul class="pagination">
                <li [ngClass]="{'active': page === pagination.page}" *ngFor="let page of pages"><a [routerLink]="[urlParam, page]" >{{page}}</a></li>
            </ul>
        </div>       
    `
})

export class PaginationComponent implements OnInit{

    @Output() onPageClick = new EventEmitter<number>();
    @Input() pagination: Pagination;
    @Input() urlParam: string;
    pages: number[] = [];

    ngOnInit(): void {
        let pageTotalCount = this.pagination.pageCount;
        let i = 1;
        while(pageTotalCount){
            this.pages.push(i++);
            pageTotalCount--;
        }
        console.log(pageTotalCount, "counter");
        console.log(this.pages, "arr");
        console.log(this.pagination.pageCount, "this.pagination.pageCount");
    }

    onClick(page: number){
        this.onPageClick.emit(page);
    }

}