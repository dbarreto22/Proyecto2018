import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { usuario } from '../modelos/usuario.model';
import { StorageService } from '../storage.service';
import 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class CrearUsuarioComponent implements OnInit {

   public cedula;
   public nombre;
   public apellido;
   public mail;
   public pass; 
   public DtUsuario  = new usuario();


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
  }

  getCedulaIngresado(value:string){
    this.cedula = value;
  }

  getNombreIngresado(value:string){
    this.nombre = value;
  }

  getApellidoIngresado(value:string){
    this.apellido = value;
  }

  getMailIngresado(value:string){
    this.mail = value;
  }

  getPasswordIngresado(value:string){
    this.pass = value;
  }

  cancelar(){
    this.router.navigate(['/setingsUser']);
    }

    crearUsuario(){

    console.log(this.apellido);
    this.DtUsuario.cedula = this.cedula;
    this.DtUsuario.nombre = this.nombre;
    this.DtUsuario.apellido =this.apellido;
    this.DtUsuario.email= this.mail;
    this.DtUsuario.password = this.pass;
    this.apiService.ingresarUsuario(this.DtUsuario).subscribe(
        data=>{this.router.navigate(['/setingsUser']);
            alert("Se creo Usuario correctamente");
        },err=>{
            alert("No se ha podido crear Usuario");
            this.router.navigate(['/setingsUser']);
        });
    }

}
