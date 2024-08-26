import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url_api = environment.url_api;
    constructor(private http: HttpClient) {

    }


    async getLogin(user:any): Promise<any> {
        var url_point = 'api/auth/login';
        try {
            const consulta$ = this.http.post(this.url_api + url_point, user);
            const resultado = await firstValueFrom(consulta$);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async register(user:any): Promise<any> {
        var url_point = 'api/auth/signup';
        try {
            const consulta$ = this.http.post(this.url_api + url_point, user);
            const resultado = await firstValueFrom(consulta$);
            return resultado;
        } catch (error) {
            throw error;
        }
    }




}
