import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingr-carreras',
  template: `
<div class="example-config">
  Ingresar Carreras
</div>
<p>Codigo de Carrera</p>
<kendo-textbox-container
  (afterValueChanged)="getCodigoIngresado($event)"
  [style.width]="'400px'"
  floatingLabel="Codigo">
  <input kendoTextBox />
</kendo-textbox-container>
<p>Nombre De Carrera</p>
<kendo-textbox-container
  (afterValueChanged)="getNombreIngresado($event)"
  [style.width]="'400px'"
  floatingLabel="Nombre">
<input kendoTextBox />

</kendo-textbox-container>
<div class="row">
<div class="col-sm-12 example-col">
  <p>Seleccione una Opción</p>
  <kendo-buttongroup [width]="'100%'"  [selection]="'single'">
      <button kendoButton [toggleable]="true"  (click)="insgCarrerra()">Aceptar</button>
      <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
  </kendo-buttongroup>
</div>
</div>
  `,
  styleUrls: ['./ingr-carreras.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class IngrCarrerasComponent implements OnInit {


  public nombreCarrera;
  public codigoCarrera;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
      private storageService: StorageService, private router: Router) {

          
      }
     
  ngOnInit() {
      
    }    


  getCodigoIngresado(value: string){
    
    this.codigoCarrera = value;
    }
  
  
  getNombreIngresado(value: string){
    
    this.nombreCarrera = value;
    }
  
  cancelar(){
    this.router.navigate(['/']);
    }

    insgCarrerra(){
      this.apiService.ingresarCarrera(this.codigoCarrera, this.nombreCarrera).subscribe(
        data=>{this.router.navigate(['/ingCarrera']);},err=>{
        alert(err);
        this.router.navigate(['/inscCarrera']);
    });
    }

}
