import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ImageModalComponent implements OnInit {
  @Input() id: string = 'exampleModal';
  @Input() title: string = 'Sistema Modal';
  @Input() images: string[] = ['assets/img/portafolio/inventarios1.webp'];
  @Input() rawHtml: string = `<div name="stack">
  <h3 class="card-title text-center text-light">Stack</h5>
  <div class="row pt-2 pb-2">
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/python.svg" alt="python">
      </div>
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/firebase.png" alt="firebase">
      </div>
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/ionic.png" alt="ionic">
      </div>
  </div>
  <div class="row pt-2 pb-2">
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/html.png" alt="html">
      </div>
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/css.png" alt="css">
      </div>
      <div class="col d-flex justify-content-center">
          <img height="60" src="assets/img/stacks/typescript.png" alt="typescript">
      </div>
  </div>
</div>`

  sanitizedHtml: SafeHtml = '';
  constructor(private sanitizer: DomSanitizer) {
    
  }


  ngOnInit() {
    this.updateSanitizedHtml(this.rawHtml);
  }

  updateSanitizedHtml(html: string): void {
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Llamar a este método cuando necesites actualizar el HTML
  changeHtml(newHtml: string): void {
    this.rawHtml = newHtml;
    this.updateSanitizedHtml(newHtml);
  }



}
