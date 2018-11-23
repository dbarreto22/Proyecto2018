import { Component, OnInit, ContentChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Curso } from './Curso';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { cursos } from '../modelos/cursos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})

export class CursosComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
  public idCurso;
  public loading = false;
  public cedula;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public rolElegido;
  public cursos: Array<cursos> = [];
  public cursosGrid = new Array<Curso>();
  public state: State = {
    skip: 0,
    take: 10,
  };
  public gridData: GridDataResult = process(this.cursos, this.state);

  //private  apiService:  ApiService
  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.setSelectableSettings();
    //              this.getCursos();
  }


  ngOnInit() {
    this.getCursos();
    this.getCursosGrid();
    this.rolElegido = localStorage.getItem('rolElegido');
    document.getSelection();
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.cursosGrid, this.state);
  }

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

  }


  public getCursosGrid() {
    this.cursos.forEach(element => {
      var curso = new Curso;
      curso.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo;
      curso.codigoCarrera = element.asignatura_Carrera.carrera.codigo;
      curso.idCurso = element.id;
      curso.idAsigCarrera = element.asignatura_Carrera.id;
      curso.nombreAsignatura = element.asignatura_Carrera.asignatura.nombre;
      curso.nombreCarrera = element.asignatura_Carrera.carrera.nombre;
      this.cursosGrid.push(curso);
    });
    console.log(this.cursosGrid);
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  change(e) {
    if (e.selected != false) {
      this.idCurso = this.cursosGrid[e.index].idCurso;
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
          this.apiService.mensajeSinError(data,3);
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
