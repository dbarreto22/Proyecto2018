import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { carrera } from '../modelos/carrera.model';

@Component({
  selector: 'app-abmcarrera',
  template: `
  <div class="example-config">
  Alta Baja y Modificación de Carreras
</div>

<kendo-grid     
    [kendoGridBinding]="carreras" 
    [pageSize]="5"
    [pageable]="true"
    [sortable]="true"
    [filterable]="true"
    [groupable]="true"
    [selectable]="selectableSettings" 
    (selectionChange) = "change($event)"
    [height]="500"
>
<kendo-grid-column field="codigo" title="Codigo" width="80" >
    </kendo-grid-column>
<kendo-grid-column field="nombre" title="Nombre">
    </kendo-grid-column>

<div class="row">
<div class="col-sm-12 example-col">
<kendo-buttongroup  [selection]="'single'" [width]="'100%'">
  <button kendoButton [toggleable]="true"  (click)="crearCarrera()">Crear Carrera</button>
  <button kendoButton [toggleable]="true"  (click)="modificarCarrera()">Modificar Carrera</button>
  <button kendoButton [toggleable]="true"  (click)="eliminarCarrera()">Eliminar Carrera</button>
  <button kendoButton [toggleable]="true"  (click)="carreraAsignatura()">Asignar Asignatura-Carrera</button>
</kendo-buttongroup>
</div>
</div>

<div class="example-wrapper">
<kendo-dialog title="Confirmar" *ngIf="dialogOpened" (close)="close('dialog')" [minWidth]="200" [width]="350">
      <p style="margin: 30px; text-align: center;">Desea eliminar la Carrera seleccionada?</p>
      <kendo-dialog-actions>
          <button kendoButton (click)="confirmarEliminarCarrera()" primary="true">Confirmar</button>
          <button kendoButton (click)="action()" >No</button>  
      </kendo-dialog-actions>
  </kendo-dialog>

`,
  styleUrls: ['./abmcarrera.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ABMCarreraComponent implements OnInit {

  public dialogOpened = false;
  public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
  public carrera : carrera;
  public carreras : Array<carrera>;
  public codigo;
  public nombreCarrera;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
        this.setSelectableSettings(); 
    }

  ngOnInit() {
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: "single",
    };
}

public  getCarreras(){
  this.apiService.getAllCarrera().subscribe((data:  Array<carrera>) => {
      this.carreras  =  data;
      console.log(this.carreras);
  });
 
}


public action() {
  this.dialogOpened = false;
}


public crearCarrera(){
  this.router.navigate(['/ingCarrera']);

}

public eliminarCarrera(){
this.dialogOpened = true;
}

cancelar(){
  this.router.navigate(['/']);
  }

change(e){
  this.carrera =   this.carreras[e.index];
  this.codigo =  this.carrera.codigo;
  this.nombreCarrera = this.carrera.nombre;
  console.log(this.codigo);
}

public modificarCarrera(){
  localStorage.setItem('codigoABM', this.codigo);
  this.router.navigate(['/modificarCarrera']);
}

public carreraAsignatura(){
  localStorage.setItem('codigoABM', this.codigo);
  localStorage.setItem('nombreABM', this.nombreCarrera);
  this.router.navigate(['/asignarAsigCarrera']);
}

public confirmarEliminarCarrera(){

  this.apiService.deleteCarrera(this.carrera).subscribe(
    data=>{this.router.navigate(['/setingsCarrera']);},err=>{
    alert(err);
    this.router.navigate(['/setingsCarrera']);
});
this.dialogOpened = false;
}


}
