import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-toolbar-administrador',
  templateUrl: './toolbar-administrador.component.html',
  styleUrls: ['./toolbar-administrador.component.css']
})
export class ToolbarAdministradorComponent implements OnInit {
  rolElegido:number;
  constructor(private authentication:AuthenticationService) { }

  ngOnInit() {
      this.rolElegido=Number(localStorage.getItem('rolElegido'));
  }
  
  logOut(){
    console.log('click en logout');
    this.authentication.logout();

  }

}
