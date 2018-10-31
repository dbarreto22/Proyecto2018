import { Component, OnInit,ContentChild } from '@angular/core';
import {EstudianteService} from '../estudiante.service';
import { ApiService } from  '../api.service';
import {Curso} from './Curso';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { cursos} from '../modelos/cursos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  styleUrls: ['./cursos.component.css'],
  template: `
  <h4> Inscripción a Curso </h4>
  <kendo-grid     
  [data]="cursosGrid" 
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
  <kendo-grid-column field="codigoAsignatura" title="Codigo Curso" width="130" [filterable]="false">
  </kendo-grid-column>
  <kendo-grid-column field="nombreAsignatura" title="Curso">
  </kendo-grid-column>
   <kendo-grid-checkbox-column ></kendo-grid-checkbox-column>

</kendo-grid>
  <div class="example-wrapper">
  <div class="example-col">
    <button kendoButton (click)="inscCursos()">Aceptar</button>
  </div>
  `,
  providers: [ApiService,NgbPaginationConfig, StorageService],
})

export class CursosComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
 
  public idCurso;
 
  public cedula;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
 
 public  cursos:  Array<cursos> = [];
 
 //private  apiService:  ApiService
 constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService
            , private storageService : StorageService, private router: Router) {
              this.setSelectableSettings();
 }

 ngOnInit() {
   this.cursos;
   this.getCursos();
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

public gridData: GridDataResult = process(this.cursos, this.state);

public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.cursosGrid, this.state);
}
  
 public  getCursos(){
     this.apiService.getAllCursos().subscribe((data:cursos[]) => {
         this.cursos  =  data;
         console.log(data);
         this.getCursosGrid()
     });

 }

public cursosGrid = new Array<Curso>();
public getCursosGrid(){
      var curso= new Curso();
      console.log(this.cursos);
      this.cursos.forEach(element => {
        console.log(JSON.stringify(element.asignatura_Carrera.asignatura.codigo));
        curso.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo ; 
        curso.codigoCarrera= element.asignatura_Carrera.carrera.codigo;
        curso.idCurso= element.id;
        curso.idAsigCarrera = element.asignatura_Carrera.id;
        curso.nombreAsignatura= element.asignatura_Carrera.asignatura.nombre;
        curso.nombreCarrera=element.asignatura_Carrera.carrera.nombre;
        this.cursosGrid.push(curso);
      });

      console.log(this.cursosGrid);
 }


 change(e){
  this.idCurso  = this.cursosGrid[e.index].idCurso;
  console.log(this.idCurso);
 }

   public inscCursos(){
    this.cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;
     this.apiService.inscripcionCurso(this.cedula, this.idCurso).subscribe(
      data=>{this.router.navigate(['/inscCursos']);},err=>{
        alert(err);
        this.router.navigate(['/inscCursos']);}
     );
   }
}
