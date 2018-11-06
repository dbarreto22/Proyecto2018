import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-toolbar-administrador >loading...</app-toolbar-administrador>
  <app-toolbar-director>loading...</app-toolbar-director>
  <app-toolbar>loading...</app-toolbar>
  
  <div class="mat-sidenav-container" style="text-align:center">
    Bienvenido a MiUdelar
    <router-outlet></router-outlet>
  </div>
  
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
