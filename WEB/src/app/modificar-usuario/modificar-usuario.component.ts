import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ABMUsuarioComponent } from '../abmusuario/abmusuario.component';

@Component({
  selector: 'app-modificar-usuario',
  template: `
  
  <div class="row example-wrapper">
    <div class="col-xs-40 col-sm-6 offset-sm-3 example-col">
        <div class="card">
            <div class="card-block">
                <form class="k-form">
                    <fieldset>
                        <legend>Modificar Usuario</legend>
                        <label class="k-form-field">
                            <span>Cedula</span>
                            <input #cedula   [(ngModel)]="usuario.cedula" [ngModelOptions]="{standalone: true}" class="k-textbox"  />
                        </label>
                        <label class="k-form-field">
                            <span>Nombre</span>
                            <input  #nombre  [(ngModel)]="usuario.nombre" [ngModelOptions]="{standalone: true}" class="k-textbox"  />
                        </label>
                        <label class="k-form-field">
                            <span>Apellido</span>
                            <input #apellido   [(ngModel)]="usuario.apellido" [ngModelOptions]="{standalone: true}" class="k-textbox" />
                        </label>
                        <label class="k-form-field">
                        <span>Email </span>
                        <input #mail  type="email"  [(ngModel)]="usuario.email" [ngModelOptions]="{standalone: true}" class="k-textbox"  />
                        </label>
                    </fieldset>
                    <div class="text-right">
                      <button type="button" class="k-button k-primary" (click)="modificarUsuario(cedula.value, nombre.value,apellido.value,mail.value)">
                      Aceptar</button>
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
  //@Input() public cedula: string;

  public cedula;
  public usuario  = new usuario();
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
      
     }

  ngOnInit() {

      this.cedula = localStorage.getItem('cedulaABM');
      console.log(this.cedula);
      this.getUsuario();
      this.usuario;
  }

getUsuario(){
  console.log(this.cedula);
  this.apiService.getUsuario(this.cedula).subscribe((data: usuario)=> {
    this.usuario  =  data;
    console.log(this.usuario);
});
}

cancelar(){
  this.router.navigate(['/setingsUser']);
  }


modificarUsuario(cedula:string, nombre:string , apellido:string, mail:string){
  this.usuario.cedula = cedula;
  this.usuario.nombre = nombre;
  this.usuario.apellido =apellido;
  this.usuario.email= mail;

  this.apiService.modificarUser(this.usuario).subscribe(
    data=>{this.router.navigate(['/setingsUser']);},err=>{
    alert(err);
    this.router.navigate(['/setingsUser']);
});
}

}
