import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-abmusuario',
  template: `
  <div class="example-config">
  Inscripción a Carrera
  </div>
  <kendo-grid     
      [kendoGridBinding]="usuarios" 
      [pageSize]="5"
      [pageable]="true"
      [sortable]="true"
      [filterable]="true"
      [groupable]="true"
      [selectable]="selectableSettings" 
      (selectionChange) = "change($event)"
      [height]="500"
  >
  <kendo-grid-column field="cedula" title="Cedula" width="80" >
      </kendo-grid-column>
  <kendo-grid-column field="nombre" title="Nombre">
      </kendo-grid-column>
  <kendo-grid-column field="apellido" title="Apellido">
      </kendo-grid-column>
  <kendo-grid-checkbox-column ></kendo-grid-checkbox-column>
      </kendo-grid>

<div class="row">
<div class="col-sm-12 example-col">
<kendo-buttongroup  [selection]="'single'" [width]="'100%'">
    <button kendoButton [toggleable]="true"  (click)="crearUsuario()">Crear Usuario</button>
    <button kendoButton [toggleable]="true"  (click)="modificarUsuario()">Modificar Usuario</button>
    <button kendoButton [toggleable]="true"  (click)="eliminarUsuario">Eliminar Usuario</button>
</kendo-buttongroup>
</div>
</div>

<div class="example-wrapper">
<kendo-dialog title="Confirmar" *ngIf="dialogOpened" (close)="close('dialog')" [minWidth]="200" [width]="350">
        <p style="margin: 30px; text-align: center;">Desea eliminar al Usuario seleccionado?</p>
        <kendo-dialog-actions>
            <button kendoButton (click)="confirmarEliminarUsr()" primary="true">Yes</button>
            <button kendoButton (click)="action()" >No</button>  
        </kendo-dialog-actions>
    </kendo-dialog>

`,

  styleUrls: ['./abmusuario.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ABMUsuarioComponent implements OnInit {


  public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
    public usuarios:  Array<usuario> = [];
    public cedula;
    public usuario = new usuario();
    public dialogOpened = false;
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
        this.setSelectableSettings();
 
        
    }

  ngOnInit() {
    this.getusuarios();
    this.usuarios;
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: "single",
    };
}

  public state: State = {
    skip: 0,
    take: 5,
};


public  getusuarios(){
  this.apiService.getAllUser().subscribe((data:  Array<usuario>) => {
      this.usuarios  =  data;
      console.log(this.usuarios);
  });
}

change(e){
  this.usuario =   this.usuarios[e.index];
  this.cedula =  this.usuario.cedula;
  console.log(this.cedula);
}


public crearUsuario(){

    localStorage.setItem('cedulaUsuarioABM' , this.cedula);
    this.router.navigate(['/crearUsr']);

}

public eliminarUsuario(){
  this.dialogOpened = true;
}

public confirmarEliminarUsr(){

  this.apiService.deleteUser(this.usuario).subscribe(
    data=>{this.router.navigate(['/setingsUser']);},err=>{
    alert(err);
    this.router.navigate(['/setingsUser']);
});
this.dialogOpened = false;
}

public action() {
  this.dialogOpened = false;
}

public modificarUsuario(){
  localStorage.setItem('cedulaUsuarioABM' , this.cedula);
    this.router.navigate(['/modificarUsr']);
}




}
