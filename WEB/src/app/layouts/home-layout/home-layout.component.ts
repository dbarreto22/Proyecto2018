import { Component, OnInit, Input } from '@angular/core';
import { Rol } from '../../modelos/rol.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-toolbar-administrador [rolElegido]="rolElegido">loading...</app-toolbar-administrador>
  <app-toolbar-director [rolElegido]="rolElegido">loading...</app-toolbar-director>
  <app-toolbar [rolElegido]="rolElegido">loading...</app-toolbar>
  
<div>
    <label>Roles: </label>
    <select (change)="selectRol($event.target.value)">
        <option value="0">{{rolElegido}}</option>
        <option *ngFor="let rol of roles" value={{rol.id}}>
        {{rol.tipo}}
        </option>
    </select>
</div>

  <div class="mat-sidenav-container" style="text-align:center">
    Bienvenido a MiUdelar
    <router-outlet></router-outlet>
  </div>
  
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {
  roles: Array<Rol>;
  @Input() public rolElegido:string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('session')).usr.roles;
    this.rolElegido = localStorage.getItem('rolElegido'); 
  }

  selectRol(value){
    if(value=='2')
      alert('El usuario de bedelias no tiene acceso a la web')
    localStorage.setItem('rolElegido',value);
    //this.router.navigate(['']);
    this.rolElegido=value;


  }

}
