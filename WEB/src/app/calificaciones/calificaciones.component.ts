import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { carrera } from '../modelos/carrera.model';
import { calificacion } from '../modelos/calificacion.model';
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
import { HttpClient } from '@angular/common/http';
import { User } from '../modelos/user.model';

@Component({
  selector: 'app-calificaciones',
  template:` 
  <div class="example-config">
 Consulta Calificaciones
  </div>

  <div class="container-fluid example-wrapper">
  <div class="row">
      <div class="col-xs-12 col-sm-4 example-col">
          <p>Carrera:</p>
          <kendo-combobox
              [data]="carreras"
              [placeholder]="'Seleccione Carrera...'"
              [value]="carreraSeleccinada"
              [textField]="'nombre'"
              [valueField]="'codigo'"
              (valueChange)="carreraChange($event)"
          >
          </kendo-combobox>
      </div>
      <div class="col-xs-12 col-sm-4 example-col">
          <p>Cursos:</p>
          <kendo-combobox
              [disabled]="isDisabledCurso"
              [placeholder]="'Seleccione Curso...'"
              [data]="cursosUser"
              [value]="cursoSeleccionado"
              [textField]="'nombre'"
              [valueField]="'codigo'"
              (valueChange)="cursoChange($event)"
          >
          </kendo-combobox>
      </div>
    </div>
  </div>


`,
  styleUrls: ['./calificaciones.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class CalificacionesComponent implements OnInit {

  public codigoCarrera;
  public carrera ;
  public cedula;
  public carreras:  Array<carrera> = [];
  public  cursos:  Array<cursos> = [];
  public  cursosUser:  Array<cursos> = [];
  public carreraSeleccionada;
  public cursoSeleccionado;
  public calificacionCurso;
  public isDisabledCurso : boolean = true;
  public isDisabledCalificaciones : boolean = true;
  
  public  calificaciones:  Array<object> = [];
  public calificacionesUsr : Array<calificacion>;
  public calificacion :calificacion;

  public idAsigCarrera;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
      this.setSelectableSettings();
     }

  ngOnInit() {
    this.carreras;
    this.getusuarioCarrera();
    this.getusuarioCursos();
    this.getAllusuarioCalificaciones()
   // this.getCursos();
   // this.getCalificaciones();
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: "single",
    };
}

getusuarioCarrera(){
  this.apiService.getUsuario(JSON.parse(localStorage.getItem('session')).usr.cedula).subscribe((data :User)=> {
    this.carreras = data.carrerasUsuario;
  })
}

getusuarioCursos(){
  this.apiService.getUsuario(JSON.parse(localStorage.getItem('session')).usr.cedula).subscribe((data :User)=> {
    this.cursos = data.cursosUsuario;
  })
}

getAllusuarioCalificaciones(){
  this.apiService.getUsuario(JSON.parse(localStorage.getItem('session')).usr.cedula).subscribe((data :Array<object>)=> {
    this.calificaciones = data;
  })
}




getCursosExamenes(){
  this.cursos.forEach(element => {
    if (element.asignatura_Carrera.carrera.codigo == this.carreraSeleccionada){
      this.cursosUser.push(element);
    }
  });
}

public dataResultCursos: Array<cursos>;

carreraChange(value) {

  this.carreraSeleccionada = value;
  this.cursoSeleccionado = undefined;
  this.calificacionCurso = undefined;

  if(value == undefined){
    this.isDisabledCurso = true;
    this.dataResultCursos = [];
  }
  else{
    this.isDisabledCurso = false;
    this.dataResultCursos = this.cursos.filter((c) => c.asignatura_Carrera.carrera.codigo === value.codigo )
  }

  this.isDisabledCalificaciones= true;
}

cursoChange(value) {
  this.cursoSeleccionado = value;
  this.calificacionCurso = undefined;

  if(value == undefined){
    this.isDisabledCurso = true;
    
  } else {
    //this.isDisabledcalificaciones = false;
   // this.calificacionCurso = this.calificaciones.filter((s) => s.. === value.productId )
  }
}

/*
public  getCarreras(){
    this.apiService.getAllCarrera().subscribe((data:  Array<carrera>) => {
        this.carreras  =  data;
        console.log(this.carreras);
    });
}*/
/*
public  getCursos(){
  this.apiService.getAllCursos().subscribe((data:  Array<cursos>) => {
      this.cursos  =  data;
      console.log(this.cursos);
  });
}

public  getCalificaciones(){
  this.apiService.getAllCalificaciones().subscribe((data:  Array<Object>) => {
      this.calificaciones  =  data;
      console.log(this.calificaciones);
  });
}*/


/*
nombreCarrera : Array<String> = [];
  public getNombreCarrera(){
    var nombre:String;
    this.carreras.forEach(element => {
      nombre = element.nombre;
      this.nombreCarrera.push(nombre);
    });
    console.log(this.nombreCarrera);
  }


  public ChangeCarrera(value:string) {
  //  this.carreraSelecionada = value;
    console.log(this.carreraSelecionada);
    localStorage.setItem('carreraSelecionada', this.carreraSelecionada);
}*/

selecionarCurso(){
  this.router.navigate(['/calificacionesCurso']);
}

cancelar(){
  this.router.navigate(['/']);
  }


/*
  public  getCursos(){
    this.apiService.getAllCursos().subscribe((data:cursos[]) => {
        this.cursos  =  data;
        console.log(data);
        this.getCursosGrid()
    });

}*/



 
/*
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
}*/





}
