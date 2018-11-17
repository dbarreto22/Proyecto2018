import { Component, OnInit, Input } from '@angular/core';
import { Rol } from '../../modelos/rol.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home.layout.component.css']
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
