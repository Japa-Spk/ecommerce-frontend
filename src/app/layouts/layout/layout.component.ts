import { Component, OnInit } from '@angular/core';
//Components
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { PresentationComponent } from './presentation/presentation.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PresentationComponent, FeaturedProductsComponent, CategoriesComponent, ImageModalComponent]
})
export class LayoutComponent implements OnInit {
  constructor(
  ) {

  }

  ngOnInit() {

  }
}
