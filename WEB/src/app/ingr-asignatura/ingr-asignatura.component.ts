import { Component, OnInit } from '@angular/core';

import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { asignatura } from '../modelos/asignatura.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingr-asignatura',
  template: `
  <div class="example-config">
  Crear Asignatura
</div>

<div class="col-xs-12 col-sm-12 example-col">
<kendo-textbox-container floatingLabel="Codigo" >
  <input  #codigo (keyup)=getCodigoIngresado(codigo.value) kendoTextBox />
</kendo-textbox-container>
</div>
<hr/> 

  <div class="col-xs-12 col-md-12 example-col">
  <kendo-textbox-container floatingLabel="Nombre" >
  <input  #nombre (keyup)=getNombreIngresado(nombre.value) kendoTextBox />
</kendo-textbox-container>
</div>
<hr/> 
<hr/> 

<div class="row">
<div class="col-sm-12 example-col">
<kendo-buttongroup  [selection]="'single'"  [width]="'100%'">
    <button kendoButton [toggleable]="true"  (click)="insgCarrerra()">Aceptar</button>
    <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
</kendo-buttongroup>
</div>
</div>
  `,
  styleUrls: ['./ingr-asignatura.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})

export class IngrAsignaturaComponent implements OnInit {

  public nombreAsigantura;
  public codigoAsignatura;

  public DtAsignatura = new asignatura();

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {}

  ngOnInit() {
  }

  getCodigoIngresado(value:String){
  
    this.codigoAsignatura = value;
   
    }
  
  
  getNombreIngresado(value:String){
    
    this.nombreAsigantura = value;
    }
  
  cancelar(){
    this.router.navigate(['/']);
    }

    insgAsignatura(){
      this.DtAsignatura.codigo = this.codigoAsignatura;
      this.DtAsignatura.nombre = this.nombreAsigantura;

      this.apiService.ingresarAsignatura(this.DtAsignatura).subscribe(
        data=>{this.router.navigate(['/ingAsignatura']);},err=>{
        alert(err);
        this.router.navigate(['/ingAsignatura']);
    });
    }
}
