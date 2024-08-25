import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component'
export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'login', component: LoginComponent }
];
