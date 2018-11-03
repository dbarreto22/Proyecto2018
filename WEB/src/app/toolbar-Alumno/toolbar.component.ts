import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import {Sesion} from '../modelos/sesion.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})


export class ToolbarComponent implements OnInit{
  private roles:Array<number>=[1,2,4];
  rolElegido:number;
  rolSucriber:Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    Titulo:string;    
  constructor(private breakpointObserver: BreakpointObserver, private storageService:StorageService) 
  {
    this.Titulo="Seleccionar Curso";
    this.rolSucriber=this.storageService.rolElegido.subscribe({next:(v)=>{this.rolElegido=v;
      console.log('El valor elegido en el componente es: '+v);  
    }})
    var sesion:Sesion=JSON.parse(localStorage.getItem('session'));
    //var roles: Array<any>=sesion.usr.roles;
  }

  ngOnInit(){
    this.rolElegido=Number(localStorage.getItem('rolElegido'));
    }
  onChange(event){
    //this.storageService.setRolElegido(event.target.value);
  }
}
