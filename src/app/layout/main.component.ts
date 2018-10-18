import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {InitialLayoutService} from "../_services/initial-layout.service";


interface AppState {
    counter: number;
}

@Component({
    selector: 'timchesara-app',
    templateUrl: 'main.component.html',
    providers: [InitialLayoutService]
})


export class MainComponent implements OnInit{
    counter: Observable<number>;
    constructor(private store: Store<AppState>, private initialService: InitialLayoutService){

    }

    ngOnInit(): void {
    }

}

