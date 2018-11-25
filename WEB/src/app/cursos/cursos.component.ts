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
  public cursosGrid: Array<cursos>;
  public cursosMostrar: Array<Curso>;


  //private  apiService:  ApiService
  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
   // this.loading = true;
    this.setSelectableSettings();

    this.cursos = this.apiService.getAllCursos();

    this.cursos.subscribe(
      (data: Array<cursos>) => {
        this.cursosGrid = data
      //  this.loading = false,
          console.log(this.cursosGrid)
      },
      err => {
        this.apiService.mensajeConError(err)
     //     this.loading = false;
      }
    )

  }

  ngOnInit() {

    this.rolElegido = localStorage.getItem('rolElegido');

  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  /*
    public getCursos() {
      this.loading = true;
      this.apiService.getAllCursos().subscribe((data: cursos[]) => {
        this.loading = false;
        this.cursos = data;
        console.log(data);
        this.getCursosGrid()
      },
        err => {
          this.apiService.mensajeConError(err);
        });
  
    }*/


  public getCursosGrid() {
    for (let data of this.cursosGrid) {

      var curso = new Curso;
      curso.codigoAsignatura = data.asignatura_Carrera.asignatura.codigo;
      curso.codigoCarrera = data.asignatura_Carrera.carrera.codigo;
      curso.idCurso = data.id;
      curso.idAsigCarrera = data.asignatura_Carrera.id;
      curso.nombreAsignatura = data.asignatura_Carrera.asignatura.nombre;
      curso.nombreCarrera = data.asignatura_Carrera.carrera.nombre;
      this.cursosMostrar.push(curso);
    }

    console.log(this.cursosMostrar);
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  change({ index }) {
    if (!!index || index == 0) {
      this.idCurso = this.cursosMostrar[index];
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

  public verPrevias() {
    if (this.idCurso != undefined) {
      localStorage.setItem('idCurso', this.idCurso);
      this.router.navigate(['/grafo']);
    }
    else alert('Debe seleccionar un curso');
  }
}
