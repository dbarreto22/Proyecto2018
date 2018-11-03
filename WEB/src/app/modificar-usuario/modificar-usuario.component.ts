import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario',
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
                            <input #cedula (keyup)=getCedulaIngresado(cedula.value) value ={{usuario.cedula}} class="k-textbox" placeholder="Cedula" />
                        </label>
                        <label class="k-form-field">
                            <span>Nombre<span class="k-required">*</span></span>
                            <input  #nombre (keyup)=getNombreIngresado(nombre.value) value ={{usuario.nombre}} class="k-textbox" placeholder="Nombre" />
                        </label>
                        <label class="k-form-field">
                            <span>Apellido<span class="k-required">*</span></span>
                            <input #apellido (keyup)=getApellidoIngresado(apellido.value) value ={{usuario.apellido}} class="k-textbox" placeholder="Apellido" />
                        </label>
                        <label class="k-form-field">
                        <span>Email <span class="k-required">*</span></span>
                        <input #mail (keyup)=getMailIngresado(mail.value) type="email" value ={{usuario.cedula}} class="k-textbox"  placeholder="Mail" />
                        </label>
                    </fieldset>
                    <div class="text-right">
                      <button type="button" class="k-button k-primary" (click)="modificarUsuario()">Aceptar</button>
                      <button type="button" class="k-button" (click)="cancelar()">Cancelar</button>
                      </div>               
                </form>
            </div>
        </div>
    </div>
</div>
  `,
  styleUrls: ['./modificar-usuario.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ModificarUsuarioComponent implements OnInit {

  public cedula;
  public nombre;
  public apellido;
  public mail;
  public pass; 
  public usuario  = new usuario();
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
      this.getUsuario();
      this.usuario;
  }

getUsuario(){
  this.apiService.getUsuario(localStorage.getItem('')).subscribe((data: usuario)=> {
    this.usuario  =  data;
    console.log(this.usuario);
});
}




modificarUsuario(){
  this.apiService.modificarUser(this.usuario).subscribe(
    data=>{this.router.navigate(['/setingsUser']);},err=>{
    alert(err);
    this.router.navigate(['/setingsUser']);
});

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
  this.usuario.cedula = this.cedula;
  this.usuario.nombre = this.nombre;
  this.usuario.apellido =this.apellido;
  this.usuario.email= this.mail;
  this.usuario.password = this.pass;
  this.apiService.ingresarUsuario(this.usuario).subscribe(
      data=>{this.router.navigate(['/setingsUsr']);},err=>{
      alert(err);
      this.router.navigate(['/setingsUser']);
  });
}

}
