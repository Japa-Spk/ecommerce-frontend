import { Injectable } from '@angular/core';
import { environment } from './../../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class EcommerceService {
    url_api = environment.url_api;
    //Usuario
    user = {};
    categories = {};
    products = {};
    userOrder = {};
    //Ecommerce
    loadEcommerce = false;
    constructor() {
        console.log('Ecommerce Service Constructor');
    
    }




}
