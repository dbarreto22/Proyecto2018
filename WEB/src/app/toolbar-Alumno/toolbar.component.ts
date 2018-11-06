import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StorageService } from '../storage.service';
import {Sesion} from '../modelos/sesion.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})


export class ToolbarComponent implements OnInit{
  private roles:Array<any>=[
    {"id":"1","nombre":"Director"},
    {"id":"2","nombre":"Administrador"},
    {"id":"4","nombre":"Alumno"}];
  rolElegido:number;
  Titulo:string;    
  constructor(private authentication:AuthenticationService) 
  {
    this.Titulo="Seleccionar Curso";
    var sesion:Sesion=JSON.parse(localStorage.getItem('session'));
    //var roles: Array<any>=sesion.usr.roles;
  }

  ngOnInit(){
    this.rolElegido=Number(localStorage.getItem('rolElegido'));
    }
  onChange(event){
    //this.storageService.setRolElegido(event.target.value);
  }
  logOut(){
    console.log('click en logout');
    this.authentication.logout();

  }
}
