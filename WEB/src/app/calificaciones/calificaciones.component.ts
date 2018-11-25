import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { calificacionC } from '../modelos/calificacionC.model';
import {calificacionE} from '../modelos/calificacionE.model';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableMode
} from '@progress/kendo-angular-grid';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import {DtCalificacion} from '../modelos/DtCalificacion.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class CalificacionesComponent implements OnInit {


  public idAsignaturaCarrera;
  public calificaciones : Observable<Array <DtCalificacion>>;
  public Listcalificacion : Array <DtCalificacion>;
  public calificacionesCursos = new Array <calificacionC>();
  public calificacionesExamenes = new Array <calificacionE>();
  public calificacionE :calificacionE;
  public calificacionC : calificacionC;

  constructor(public http: HttpClient , private  apiService:  ApiService, private router: Router) {

     }

  ngOnInit() {
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='4')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.idAsignaturaCarrera = localStorage.getItem("AsigSeleccionadaCalif");
    this.calificaciones = this.apiService.getCalificacionesEstudiante(this.idAsignaturaCarrera);
    this.calificaciones.subscribe(
      (data : Array<DtCalificacion>)=> {
        this.Listcalificacion = data
        console.log(this.Listcalificacion);
      },
      err=>{
          this.apiService.mensajeConError(err)}
    )
    this.getGridMostrar();

  }
 
 /*
getCalificaciones(){
  this.apiService.getCalificacionesEstudiante(this.idAsignaturaCarrera).subscribe((data:  Array<DtCalificacion>) => {
    this.calificaciones  =  data;
}, err => {
  this.apiService.mensajeConError(err);
});
}*/

getGridMostrar(){

this.Listcalificacion.forEach(element => {
    element.dtEstCurso.forEach(element => {
      this.calificacionC.nombreCurso = element.dtcurso.nombreAsignatura;
      this.calificacionC.notaCurso = element.calificacion;
      this.calificacionC.tipoC = "Curso";
      this.calificacionesCursos.push(this.calificacionC);
    });
    element.dtEstExamen.forEach(element => {
      this.calificacionE.nombreExamen = element.dtExamen.nombreAsignatura;
      this.calificacionE.notaExamen = element.calificacion;
      this.calificacionE.tipoE = "Examen";

      this.calificacionesExamenes.push(this.calificacionE);
    });
   
});


}

salir(){
  this.router.navigate['/'];
}

}
