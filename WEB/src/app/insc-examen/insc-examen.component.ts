import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { NgForOf } from '@angular/common';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StorageService } from '../storage.service';
import { HttpClientModule } from '@angular/common/http'; 
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insc-examen',
 // templateUrl: './insc-examen.component.html',
 template: `
 <kendo-grid
     [data]="carreras"
     [pageSize]="state.take"
     [skip]="state.skip"
     [sort]="state.sort"
     [filter]="state.filter"t
     [sortable]="true"
     [pageable]="true"
     filterable="menu"
     (dataStateChange)="dataStateChange($event)"
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
   <button kendoButton (click)="inscCarrerra()">Aceptar</button>
 </div>
 `,
  styleUrls: ['./insc-examen.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class InscExamenComponent implements OnInit {
    public codigo;
    public  examenes:  Array<object> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.examenes;
        this.getCarreras();      
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

    public gridData: GridDataResult = process(this.examenes, this.state);

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.examenes, this.state);
    }
      
      public  getExamenes(){
        this.apiService.getAllExamen().subscribe((data:  Array<object>) => {
            this.examenes  =  data;
        });
    }


  
    change(type){

        console.log(type);
        //if(e.checked){
        //  this.selectedValue.push(type);
            this.codigo = type;
            console.log(this.codigo);
      }/*
    
        else{
         let updateItem = this.selectedValue.find(this.findIndexToUpdate, type);
         this.codigo = updateItem;
         console.log(this.codigo);
         let index = this.selectedValue.indexOf(updateItem);
    
         this.selectedValue.splice(index, 1);
        
    
      }
    }
    
      findIndexToUpdate(type) { 
            return type === this;
        }*/
     
        public inscExamen(){
          this.apiService.inscripcionExamen(this.storageService.getCurrentUser, this.codigo).subscribe();
        }
      

}
