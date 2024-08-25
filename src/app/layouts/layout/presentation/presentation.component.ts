import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  standalone: true
})
export class PresentationComponent implements OnInit {
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    
  }

}
