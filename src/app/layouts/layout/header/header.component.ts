
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//Modulos
import { RouterModule } from '@angular/router';
//SERVICIOS



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports:[RouterModule],
  standalone:true
})
export class HeaderComponent implements OnInit {



  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  
  constructor(
    private router: Router,

  ) { }

  ngOnInit() {

  }



}
