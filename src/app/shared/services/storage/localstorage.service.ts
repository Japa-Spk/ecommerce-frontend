import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    // Método para obtener un valor del LocalStorage
    get(key: string): any {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    // Método para guardar un valor en el LocalStorage
    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Método para eliminar un valor del LocalStorage
    remove(key: string): void {
        localStorage.removeItem(key);
    }

    // Método para limpiar todo el LocalStorage
    clear(): void {
        localStorage.clear();
    }
}
