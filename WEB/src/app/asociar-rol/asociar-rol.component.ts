import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { usuario } from '../modelos/usuario.model';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-asociar-rol',
  template: `
    <div class="example-config">
    Inscripción a Carrera
    </div>

    
<div class="example-config">
    <h4>{{usuario.cedula}}  {{usuario.nombre}}  {{usuario.apellido}}</h4>
</div>

<kendo-grid *ngIf="show" [data]="rolUsuario" [height]="370" style="width: 500px;">
            <kendo-grid-column field="id" title="ID" width="40" [locked]="true">
            </kendo-grid-column>
            <kendo-grid-column field="tipo" title="Tipo" width="250" [locked]="true">
            </kendo-grid-column>
</kendo-grid>

<div class="example-config">
Seleccione Rol a Asignar
</div>

<div class="col-lg-8 col-sm-10 form-group">
    <div class="input-group">
        <kendo-combobox
          [data]="rolMostrar"
          [textField]="'tipo'"
          [(ngModel)]="id"
          (valueChange)="ChangeRol($event)"
          [placeholder]="'Seleccione Rol'">    
        >
        </kendo-combobox>
    </div>
  </div>


<div class="row">
<div class="col-sm-12 example-col">
  <kendo-buttongroup  [selection]="'single'" [width]="'100%'">
      <button kendoButton [toggleable]="true"  (click)="asociarRol()">Aceptar</button>
      <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
  </kendo-buttongroup>
</div>
</div>
    
    
    `,
  styleUrls: ['./asociar-rol.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class AsociarRolComponent implements OnInit {
  public cedula;
  public usuario = new usuario();
  public usuariosConRol = new Array<usuario>();
  public rolSelected;
  public rolMostrar = [{
    "id" : 1, 
    "tipo":"Administrador"
},
{ 
  "id" : 2, 
    "tipo":"Bedelia"
},
{
  "id" : 3, 
    "tipo":"Director"
},
{
  "id" : 4, 
"tipo":"Estudiante"}];

  public show = false;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
      this.cedula = localStorage.getItem('cedulaABM');
      console.log(this.cedula);
      this.getUsuario();
      this.usuario;
      this.getAllRolUsuario();
  }


  getUsuario(){
    console.log(this.cedula);
    this.apiService.getUsuario(this.cedula).subscribe((data: usuario)=> {
      this.usuario  =  data;
      console.log(this.usuario);
     });
  }

getAllRolUsuario(){
  this.apiService.getUserRol().subscribe((data: Array<usuario>)=> {
    this.usuariosConRol  =  data;
    console.log(this.usuario);
   });
}

public rolUsuario : Array<string>;
getRolUsuario(){

  this.usuariosConRol.forEach(element => {
      if(element.cedula == this.usuario.cedula){
        this.usuario.roles = element.roles;
      }
      this.rolUsuario =  this.usuario.roles;
      console.log(this.rolUsuario);
  });
}

setShow(){
  if(this.rolUsuario.length > 0){
    this.show = true;
  }
}
public ChangeRol(value:string) {
  this.rolSelected = value;
}
cancelar(){
  this.router.navigate(['/setingsUser']);
  }

asociarRol(){

  this.apiService.asignarRol(this.cedula,this.rolSelected).subscribe(
    data=>{this.router.navigate(['/setingsUser']);
    alert("Se asigno Correctamente el Rol");
  },err=>{
    alert(err);
    this.router.navigate(['/setingsUser']);
});

}


}
