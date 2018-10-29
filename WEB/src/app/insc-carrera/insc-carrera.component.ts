import { Component, OnInit ,ContentChild} from '@angular/core';
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
    selector: 'app-insc-carrera',
    //templateUrl: './insc-carrera.component.html',
    template: `
    <kendo-grid
        [kendoGridBinding]="carreras"
        [pageSize]="10"
        [pageable]="true"
        [sortable]="true"
        [filterable]="true"
        [groupable]="true"
        [height]="510">
       <!-- (dataStateChange)="dataStateChange($event)"-->
    >
    <kendo-grid-column field="codigo" title="Codigo" width="80">
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
    styleUrls: ['./insc-carrera.component.css'],
    providers: [ApiService,NgbPaginationConfig, StorageService],
    })
    
  export class InscCarreraComponent implements OnInit {

    public codigo;
    public  carreras:  Array<object> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];


    constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
        private storageService: StorageService) {}
   
    ngOnInit() {
        this.carreras;
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

    public gridData: GridDataResult = process(this.carreras, this.state);

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.carreras, this.state);
    }
      
      public  getCarreras(){
        this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
            this.carreras  =  data;
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
     
        public inscCarrerra(){
          this.apiService.inscripcionCarrera(this.storageService.getCurrentUser, this.codigo).subscribe();
        }


  }