import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-elegir-carrera',
  template: `
  <div class="example-config">
  Selecciones Carrera para Ingresar Asignatura
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
<kendo-grid-column field="codigo" title="Codigo" width="80" [filterable]="false">
  </kendo-grid-column>
<kendo-grid-column field="nombre" title="Nombre">
  </kendo-grid-column>
<kendo-grid-checkbox-column ></kendo-grid-checkbox-column>
  </kendo-grid>


  <div class="row">
  <div class="col-sm-12 example-col">
  <kendo-buttongroup  [selection]="'single'" [width]="'100%'">
    <button kendoButton [toggleable]="true"  (click)="crearAsignatura()">Crear Asignatura</button>
    <button kendoButton [toggleable]="true"  (click)="modificarAsignatura()">Modificar Asignatura</button>
    <button kendoButton [toggleable]="true"  (click)="eliminarAsignatura()">Eliminar Asignatura</button>
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
    </kendo-dialog>`,

  styleUrls: ['./elegir-carrera.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class ElegirCarreraComponent implements OnInit {

  public codigo;
  public nombreCarrera;
  public carrera;
  public cedula;
  public carreras:  Array<object> = [];
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];
  public dialogOpened = false;


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
      private storageService: StorageService, private router: Router) {
          this.setSelectableSettings();
          this.carreras;
          this.getCarreras();  
          
      }
     
  ngOnInit() {
      this.getCarreras(); 
      this.carreras;
        
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
    
       
  public  getCarreras(){
    this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
        this.carreras  =  data;
        console.log(this.carreras);
    });
    
}

public action() {
  this.dialogOpened = false;
}


public crearAsignatura(){
  this.router.navigate(['/ingAsignatura']);

}

public eliminarCarrera(){
this.dialogOpened = true;
}



  change(e){
      this.carrera =   this.carreras[e.index];
      this.codigo =  this.carrera.codigo;
      this.nombreCarrera = this.carrera.nombre;
      console.log(this.codigo);
    }

    public modificarCarrera(){
      localStorage.setItem('codigoAsignaturaABM', this.codigo);
      this.router.navigate(['/modificarCarrera']);
    }
    
    public confirmarEliminarCarrera(){
    
      this.apiService.deleteCarrera(this.carrera).subscribe(
        data=>{this.router.navigate(['/setingsCarrera']);
        alert('Carrera eliminada correctamente.')
      },err=>{
        alert(err);
        this.router.navigate(['/setingsCarrera']);
    });
    this.dialogOpened = false;
    }
    


}
