import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Curso } from '../cursos/Curso';
import { cursos } from '../modelos/cursos.model';

@Component({
  selector: 'app-calificaciones-curso',
  template: `  
  
  <div class="example-config">
  Seleccione Curso
  </div>


<kendo-grid     
    [kendoGridBinding]="cursosCarreraSelect" 
    [pageSize]="5"
    [pageable]="true"
    [sortable]="true"
    [filterable]="true"
    [groupable]="true"
    [resizable]="true"
    [selectable]="selectableSettings" 
    (selectionChange) = "changeGrid($event)"
    [height]="500"
    >

  <kendo-grid-column field="codigoAsignatura" title="Codigo" width="80" [filterable]="false">
    </kendo-grid-column>
  <kendo-grid-column field="nombreAsignatura" title="Nombre">
    </kendo-grid-column>
  <kendo-grid-checkbox-column ></kendo-grid-checkbox-column>
</kendo-grid>`,

  styleUrls: ['./calificaciones-curso.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class CalificacionesCursoComponent implements OnInit {
  @Input() public carreraSeleccionada: String;
  public  cursos:  Array<cursos> = [];


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router)  { }

  ngOnInit() {
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
      if(element.codigoCarrera == this.carreraSeleccionada){
        this.cursosCarreraSelect.push(element);
      }
      
    });
 }

}
