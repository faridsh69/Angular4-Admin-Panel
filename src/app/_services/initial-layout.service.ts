import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { SidebarItem } from '../_models/index';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../AppSettings";

@Injectable()
export class InitialLayoutService {
    constructor(
        private http: HttpClient) {
    }

    getInitials() {

    }

}
