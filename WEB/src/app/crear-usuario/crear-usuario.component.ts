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
  template: `
  <div class="row example-wrapper">
    <div class="col-xs-20 col-sm-6 offset-sm-3 example-col">
        <div class="card">
            <div class="card-block">
                <form class="k-form">
                    <fieldset>
                        <legend>Ingresar Usuario</legend>
                        <label class="k-form-field">
                            <span>Cedula<span class="k-required">*</span></span>
                            <input #cedula (keyup)=getCedulaIngresado(cedula.value) class="k-textbox" placeholder="Cedula" />
                        </label>
                        <label class="k-form-field">
                            <span>Nombre<span class="k-required">*</span></span>
                            <input  #nombre (keyup)=getNombreIngresado(nombre.value) class="k-textbox" placeholder="Nombre" />
                        </label>
                        <label class="k-form-field">
                            <span>Apellido<span class="k-required">*</span></span>
                            <input #apellido (keyup)=getApellidoIngresado(apellido.value) class="k-textbox" placeholder="Apellido" />
                        </label>
                        <label class="k-form-field">
                        <span>Email <span class="k-required">*</span></span>
                        <input #mail (keyup)=getMailIngresado(mail.value) type="email" class="k-textbox"  placeholder="Mail" />
                        </label>
                        <label class="k-form-field">
                            <span>Password</span>
                            <input #password (keyup)=getPasswordIngresado(password.value) type="password" class="k-textbox"  placeholder="password"/>
                        </label>
                    </fieldset>
                    <div class="text-right">
                      <button type="button" class="k-button k-primary" (click)="crearUsuario()">Aceptar</button>
                      <button type="button" class="k-button" (click)="cancelar()">Cancelar</button>
                      </div>               
                </form>
            </div>
        </div>
    </div>
</div>
  `,
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
    this.router.navigate(['/']);
    }


crearUsuario(){

    console.log(this.apellido);
    this.DtUsuario.cedula = this.cedula;
    this.DtUsuario.nombre = this.nombre;
    this.DtUsuario.apellido =this.apellido;
    this.DtUsuario.email= this.mail;
    this.DtUsuario.password = this.pass;
    this.apiService.ingresarUsuario(this.DtUsuario).subscribe(
        data=>{this.router.navigate(['/crearUsr']);},err=>{
        alert(err);
        this.router.navigate(['/crearUsr']);
    });
}

}
