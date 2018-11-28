import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { calificacionC } from '../modelos/calificacionC.model';
import { calificacionE } from '../modelos/calificacionE.model';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  RowArgs, SelectableMode
} from '@progress/kendo-angular-grid';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { DtCalificacion } from '../modelos/DtCalificacion.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class CalificacionesComponent implements OnInit {


  public idAsignaturaCarrera;
  public calificaciones: Observable<any>;
  public calificacion;
  public calificacionC: calificacionC;
  public loading;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.loading = true;
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.calificaciones = this.apiService.getCalificacionesEstudiante();
    this.calificaciones.subscribe(
      (data) => {
        this.calificacion=data;    
        this.loading = false;
        console.log('dataaaaaa', data);
      },
      err => {
        this.apiService.mensajeConError(err)
        this.loading = false;
      }
    );
  }

      /*{
        if (data == undefined || data.dtEstCurso==undefined && data.dtEstExamen==undefined 
        || (data.dtEstCurso.length==0 && data.dtEstExamen.length==0)) {
          alert('El estudiante no tiene calificaciones disponibles.');
          this.router.navigate(['/']);
        }
        else */

  salir() {
    this.router.navigate['/'];
  }

}
