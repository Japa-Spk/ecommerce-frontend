import { Component, OnInit, Input } from '@angular/core';
//Services
import { EcommerceService } from '../../../shared/services/ecommerce.service';
@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  standalone: true
})
export class FeaturedProductsComponent implements OnInit {


  constructor(
    public _ecommerceService: EcommerceService
  ) {

  }


  ngOnInit() {

  }


}
