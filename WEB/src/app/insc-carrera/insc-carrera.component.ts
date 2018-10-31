import { Component, OnInit ,ContentChild, Type} from '@angular/core';
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
import { Router } from '@angular/router';



@Component({
    selector: 'app-insc-carrera',
    template: `
    <div class="example-config">
    Inscripción a Carrera
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
    public carrera;
    public cedula;
    public carreras:  Array<object> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];
    public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
    public mySelection: any[];


    constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
        private storageService: StorageService, private router: Router) {
            this.setSelectableSettings();
            
        }
       
    ngOnInit() {
        this.carreras;
        this.getCarreras();   
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

    change(e){
        this.carrera =   this.carreras[e.index];
        this.codigo =  this.carrera.codigo;
        console.log(this.codigo);
      }
     
        public inscCarrerra(){
            this.cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;
            console.log(JSON.parse(localStorage.getItem('session')).usr.cedula);
            this.apiService.inscripcionCarrera( this.cedula, this.codigo).subscribe(
                data=>{this.router.navigate(['/inscCarrera']);},err=>{
                alert(err);
                this.router.navigate(['/inscCarrera']);
            });
        }


  }