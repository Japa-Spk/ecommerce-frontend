import { Injectable } from '@angular/core';
import { environment } from './../../enviroments/environment';
//Services
import { LocalStorageService } from './storage/localstorage.service';
@Injectable({
    providedIn: 'root'
})
export class EcommerceService {
    url_api = environment.url_api;
    //Usuario
    user = null;
    categories = {};
    products = {};
    userOrder = {};
    //Ecommerce
    loadEcommerce = false;
    constructor(private _lsService: LocalStorageService) {
        console.log('Ecommerce Service Constructor');
        this.loadUser();
        this.loadEcommerce = true;
    }

    loadUser() {
        var user = this._lsService.get('user');
        if (user != null) {
            this.user = user;
        }
        console.log('load user ->', user);
    }




}
