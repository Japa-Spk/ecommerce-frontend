import { Injectable } from '@angular/core';
import { environment } from './../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
//Services
import { LocalStorageService } from './storage/localstorage.service';
import { firstValueFrom } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class EcommerceService {
    url_api = environment.url_api;
    //Usuario
    user = null;
    categories = [];
    products:any = [];
    userOrder = {};
    userOrders = [];
    //Ecommerce
    loadEcommerce = false;
    constructor(private _lsService: LocalStorageService, private http: HttpClient) {
        console.log('Ecommerce Service Constructor');
        this.loadUser();
        this.getProducts();
        this.loadEcommerce = true;
    }

    loadUser() {
        var user = this._lsService.get('user');
        if (user != null) {
            this.user = user;
        }
        console.log('load user ->', user);
    }


    getProducts() {
        this.getProductsAPI().then(res => {
            this.products = res;
        })
    }

    async getProductsAPI(): Promise<any> {
        var url_point = 'products';
        try {
            const consulta$ = this.http.get(this.url_api + url_point);
            const resultado = await firstValueFrom(consulta$);
            return resultado;
        } catch (error) {
            throw error;
        }
    }




}
