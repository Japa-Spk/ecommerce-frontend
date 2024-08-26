import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private isBrowser: boolean = false;
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        //Se valida plataforma porque saca error al ejecutar el codigo en node
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    // Método para obtener un valor del LocalStorage
    get(key: string): any {
        const value = this.isBrowser ? localStorage.getItem(key) : null;
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    // Método para guardar un valor en el LocalStorage
    set(key: string, value: any): void {
        this.isBrowser ? localStorage.setItem(key, JSON.stringify(value)) : null;
    }

    // Método para eliminar un valor del LocalStorage
    remove(key: string): void {
        this.isBrowser ? localStorage.removeItem(key) : null;
    }

    // Método para limpiar todo el LocalStorage
    clear(): void {
        this.isBrowser ? localStorage.clear() : null;
    }
}
