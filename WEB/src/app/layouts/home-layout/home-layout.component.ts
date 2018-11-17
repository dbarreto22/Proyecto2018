import { Component, OnInit, Input } from '@angular/core';
import { Rol } from '../../modelos/rol.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-toolbar-administrador [rolElegido]="rolElegido">loading...</app-toolbar-administrador>
  <app-toolbar-director [rolElegido]="rolElegido">loading...</app-toolbar-director>
  <app-toolbar [rolElegido]="rolElegido">loading...</app-toolbar>
  
<div style="text-align:right">
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
  <div class="jumbotron">
    <h2 class="display-3">Novedades!</h2>
    <p class="lead">Actualmente estamos desarrollando nuevas funcionalidades para el sistema de bedelias, por sugerencias escribe a desarrollo@miudelar.com.</p>
    <hr class="my-4">
    <p>Para solicitar un nuevo rol de acceso se debe comunicar con el administrador de la institución.</p>
    <p class="lead">
  </p>
</div>
  
  `,


  styles: []
})
export class HomeLayoutComponent implements OnInit {
  roles: Array<Rol>;
  @Input() public rolElegido: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('session')).usr.roles;
    this.rolElegido = localStorage.getItem('rolElegido');
  }

  selectRol(value) {
    if (value == '2')
      alert('El usuario de bedelias no tiene acceso a la web')
    localStorage.setItem('rolElegido', value);
    //this.router.navigate(['']);
    this.rolElegido = value;


  }

}
