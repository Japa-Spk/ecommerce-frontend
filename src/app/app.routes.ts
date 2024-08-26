import { Routes } from '@angular/router';
//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layouts/layout/layout.component'
export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
