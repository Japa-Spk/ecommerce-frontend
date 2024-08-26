import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component'
//Service Init
import { EcommerceService } from './shared/services/ecommerce.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-frontend';

  constructor(private _ecommerceService: EcommerceService) { }
}
