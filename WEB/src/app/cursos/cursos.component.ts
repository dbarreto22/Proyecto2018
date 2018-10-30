import { Component, OnInit,ContentChild } from '@angular/core';
import {EstudianteService} from '../estudiante.service';
import { ApiService } from  '../api.service';
import {Curso} from './Curso';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-cursos',
  //templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  template: `
  <kendo-grid
  [kendoGridBinding]="cursos"
  [pageSize]="10"
  [pageable]="true"
  [sortable]="true"
  [filterable]="true"
  [groupable]="true"
  [height]="510">
  >
  <kendo-grid-column field="codigo" title="Codigo" width="80" [filterable]="false">
  </kendo-grid-column>
  <kendo-grid-column field="nombre" title="Nombre">
  </kendo-grid-column>
  <kendo-grid-column  width="120" filter="boolean">
      <ng-template kendoGridCellTemplate let-dataItem>
          <input type="checkbox" (change)="change(dataItem.codigo)" />
      </ng-template>
  </kendo-grid-column>
  </kendo-grid>

  <div class="example-wrapper">
  <div class="example-col">
    <button kendoButton (click)="inscCurso()">Aceptar</button>
  </div>
  `,
  providers: [ApiService,NgbPaginationConfig, StorageService],
})

export class CursosComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
 
  public idCurso;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
 
 public  cursos:  Array<object> = [];
 
 //private  apiService:  ApiService
 constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService
            , private storageService : StorageService) {

 }

 ngOnInit() {
   this.cursos;
   this.getCursos();
 }

 public state: State = {
  skip: 0,
  take: 5,

  // Initial filter descriptor
 /* filter: {
    logic: 'and',
    filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
  }*/
};

public gridData: GridDataResult = process(this.cursos, this.state);

public dataStateChange(state: DataStateChangeEvent): void {
  this.state = state;
  this.gridData = process(this.cursos, this.state);
}
 public  getCursos(){
     this.apiService.getAllCursos().subscribe((data:  Array<object>) => {
         this.cursos  =  data;
         console.log(data);
     });
 }


 change(e, type){
   console.log(e.checked);
   console.log(type);
//   if(e.checked){
     this.selectedValue.push(type);
       this.idCurso = type;
       console.log(this.idCurso);
 }
/*
   else{
    let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.carrera);
    this.codigo = updateItem;
    console.log(this.codigo);
    let index = this.selectedValue.indexOf(updateItem);

    this.selectedValue.splice(index, 1);
   }

 }

 findIndexToUpdate(type) { 
       return type.carreras === this;
   }*/

   public inscCursos(){
  // console.log(this.selectedValue[0]);
   //  this.idCurso = this.selectedValue[0];
     this.apiService.inscripcionCurso(this.storageService.getCurrentUser, this.idCurso).subscribe();
   }
}