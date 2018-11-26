import { Component, OnInit, ContentChild } from '@angular/core';
import { ApiService } from '../api.service';

import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { cursos } from '../modelos/cursos.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from './Curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})

export class CursosComponent implements OnInit {

  public idCurso;
  public loading;
  public cedula;
  public checked = false;

  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public rolElegido;
  public cursos: Observable<Array<cursos>>;
  public cursosGrid: Observable<Array<cursos>>;
  public cursosMostrar: Array<Curso>;


  //private  apiService:  ApiService
  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService, private router: Router) {
    let cedula = localStorage.getItem('');
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.loading = true;
    this.setSelectableSettings();
    this.cursosGrid = this.apiService.getCursosByCedula();

    this.cursosGrid.subscribe(
      () =>
       this.loading = false,
 /*   this.cursos = this.apiService.getCursosByCedula();

    this.cursos.subscribe(
      (data: Array<cursos>) => {
        this.cursosGrid = data
        this.loading = false,
          console.log(this.cursosGrid)
      },*/
      err => {
        this.apiService.mensajeConError(err)
        this.loading = false;
      }
    )
  }

  ngOnInit() {
    this.rolElegido = localStorage.getItem('rolElegido');
    alert('Que putada');
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }
  
  cancelar() {
    this.router.navigate(['/']);
  }

  change({ index }) {
    if (!!index || index == 0) {
      this.idCurso = this.cursosGrid[index].id;
      console.log(this.idCurso);
    }
    else {
      this.idCurso = undefined;
    }
  }



  public inscCursos() {
    if (this.idCurso != undefined) {
      this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
      this.apiService.inscripcionCurso(this.cedula, this.idCurso).subscribe(
        data => {
          this.apiService.mensajeSinError(data, 3);
          this.router.navigate(['/inscCursos']);
        },
        err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/inscCursos']);
        });
    }
    else
      alert('Debe seleccionar una carrera para continuar.');

  }

}
