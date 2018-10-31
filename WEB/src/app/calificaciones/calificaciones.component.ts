import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { carrera } from '../modelos/carrera.model';
import { cursos } from '../modelos/cursos.model';
import { Curso } from '../cursos/Curso';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableMode
} from '@progress/kendo-angular-grid';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-calificaciones',
  template:` 
  <div class="example-config">
  Consulta de Calificaciones
  </div>
  <div class="example-wrapper">
  <kendo-combobox
      [data]="nombreCarrera"
      [value]="carreraSelecionada"
      [allowCustom]="true"
      (valueChange)="ChangeCarrera($event)"
  >
  </kendo-combobox>
</div>

<kendo-grid     
    [kendoGridBinding]="cursosCarreraSelect" 
    [pageSize]="5"
    [pageable]="true"
    [sortable]="true"
    [filterable]="true"
    [groupable]="true"
    [selectable]="selectableSettings" 
    (selectionChange) = "changeGrid($event)"
    [height]="500"
    >
    <kendo-grid-column field="codigoAsignatura" title="Codigo" width="80" [filterable]="false">
    </kendo-grid-column>
    <kendo-grid-column field="nombreAsignatura" title="Nombre">
    </kendo-grid-column>
<kendo-grid-checkbox-column ></kendo-grid-checkbox-column>
</kendo-grid>

<kendo-grid     
    [kendoGridBinding]="calificaciones" 
    [pageSize]="5"
    [pageable]="true"
    [sortable]="true"
    [filterable]="true"
    [groupable]="true"
    [selectable]="selectableSettings" 
    [height]="500"
    >
    <kendo-grid-column field="codigoAsignatura" title="Calificaciones" width="80" [filterable]="false">
    </kendo-grid-column>
    
</kendo-grid>

</div>
`,
  styleUrls: ['./calificaciones.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class CalificacionesComponent implements OnInit {
  public codigoCarrera;
  public carrera;
  public cedula;
  public carreras:  Array<carrera> = [];
  public carreraSelecionada: string ;
  public  cursos:  Array<cursos> = [];
  public  calificaciones:  Array<object> = [];
  public idAsigCarrera;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;

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

public  getCarreras(){
    this.apiService.getAllCarrera().subscribe((data:  Array<carrera>) => {
        this.carreras  =  data;
        console.log(this.carreras);
    });
}

nombreCarrera : Array<String> = [];
  public getNombreCarrera(){
    var nombre:String;
    this.carreras.forEach(element => {
      nombre = element.nombre;
      this.nombreCarrera.push(nombre);
    });
  }


  public ChangeCarrera(value) {
    this.carreraSelecionada = value;
    localStorage.setItem('carreraSelecionada', this.carreraSelecionada)
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

 public cursosCarreraSelect = new Array<Curso>();
 getCursosCarreraSelect(){
    this.cursosGrid.forEach(element => {
      if(element.nombreCarrera == this.carreraSelecionada){
        this.cursosCarreraSelect.push(element);
      }
      
    });
 }

 changeGrid(e){
  this.idAsigCarrera  = this.cursosGrid[e.index].idAsigCarrera;
  localStorage.setItem('idAsigCarrera', this.idAsigCarrera)
  console.log(this.idAsigCarrera);
 }

 public  getCalificaciones(){
  this.apiService.getCalificaciones().subscribe((data:  Array<Object>) => {
      this.calificaciones  =  data;
      console.log(this.carreras);
  });
}





}
