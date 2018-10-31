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
import { single } from 'rxjs/operators';
import {Examen} from '../modelos/examen.model'
import {examenes} from '../modelos/examenes.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-insc-examen',
 template: `
 <div class="example-config">
    Inscripción a Examen
  </div>
  <kendo-grid     
  [data]="examenGrid" 
  [pageSize]="5"
  [pageable]="true"
  [sortable]="true"
  [filterable]="true"
  [groupable]="true"
  [selectable]="selectableSettings" 
  (selectionChange) = "change($event)"
  [height]="500"
  >
  <kendo-grid-column field="codigoCarrera" title="Codigo Carrera" width="130" [filterable]="false">
  </kendo-grid-column>
  <kendo-grid-column field="nombreCarrera" title="Carrera">
  </kendo-grid-column>
  <kendo-grid-column field="codigoAsignatura" title="Codigo Examen" width="130" [filterable]="false">
  </kendo-grid-column>
  <kendo-grid-column field="nombreAsignatura" title="Examen">
  </kendo-grid-column>
   <kendo-grid-checkbox-column ></kendo-grid-checkbox-column>

</kendo-grid>
  <div class="example-wrapper">
  <div class="example-col">
    <button kendoButton (click)="inscExamen()">Aceptar</button>
  </div>
  `,
  styleUrls: ['./insc-examen.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class InscExamenComponent implements OnInit {
    public codigo;
    public  examenes:  Array<examenes> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];
    public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
    public idExamen;
    public cedula;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
        this.setSelectableSettings();
     }

  ngOnInit() {
        this.examenes;
        this.getExamenes();      
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

    public gridData: GridDataResult = process(this.examenes, this.state);

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.examenGrid, this.state);
    }
      
      public  getExamenes(){
        this.apiService.getAllExamen().subscribe((data : examenes[]) => {
            this.examenes  =  data;
            this.getExamenGrid;
        });
    }
    
    public examenGrid = new Array<Examen>();
    public getExamenGrid(){
      var examen= new Examen();
      console.log(this.examenes);
      this.examenes.forEach(element => {
        console.log(JSON.stringify(element.asignatura_Carrera.asignatura.codigo));
        examen.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo ; 
        examen.codigoCarrera= element.asignatura_Carrera.carrera.codigo;
        examen.idCurso= element.id;
        examen.nombreAsignatura= element.asignatura_Carrera.asignatura.nombre;
        examen.nombreCarrera=element.asignatura_Carrera.carrera.nombre;
        this.examenGrid.push(examen);
      });

      console.log(this.examenGrid);
 }


  
    change(e){

        this.idExamen  = this.examenGrid[e.index].idCurso;
        console.log(this.idExamen);
      }
     
        public inscExamen(){
            this.cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;
            this.apiService.inscripcionCurso(this.cedula, this.idExamen).subscribe(
             data=>{this.router.navigate(['/inscCursos']);},err=>{
               alert(err);
               this.router.navigate(['/inscCursos']);}
            );
          }
        
      

}
