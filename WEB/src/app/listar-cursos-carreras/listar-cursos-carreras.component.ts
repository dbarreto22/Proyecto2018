import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { StorageService } from '../storage.service';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';
import { asignatura } from '../modelos/asignatura.model';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-listar-cursos-carreras',
  templateUrl: './listar-cursos-carreras.component.html',
  styleUrls: ['./listar-cursos-carreras.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class ListarCursosCarrerasComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codCarrera;
  public listAsignaturaCarrera = new Array<asignaturaCarrera>();
  public listAsignaturas = new Array<asignatura>();
  public asignatura: asignatura;
  public codigo;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.setSelectableSettings();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.codCarrera = localStorage.getItem('carreraSeleccionada');
    this.getAsignaturaCarrerabyCarrera();
    this.getAsignaturas();
  }


  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  getAsignaturaCarrerabyCarrera() {
    this.apiService.getAsignaturaCarreraByCarrera(this.codCarrera).subscribe((data: asignaturaCarrera[]) => {
      this.listAsignaturaCarrera = data;
    },
      err => {
        this.apiService.mensajeConError(err);
        this.router.navigate(['/listarCursos']);
      });
    console.log(this.listAsignaturaCarrera);
  }

  getAsignaturas() {
    this.listAsignaturaCarrera.forEach(element => {
      this.asignatura.codigo = element.asignatura.codigo;
      this.asignatura.nombre = element.asignatura.nombre;
      this.listAsignaturas.push(this.asignatura);
    });
    console.log(this.listAsignaturas);
  }

  consultar() {
    if (this.codigo != undefined) {
      localStorage.setItem('AsigSeleccionadaCalif', this.codigo);
      this.router.navigate(['/calificaciones']);
    }
    else
      alert('Debe seleccionar un examen para continuar.');
  }

  cancelar() {
    this.router.navigate(['/calificaciones']);
  }
  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.codigo;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.listAsignaturas.forEach(asig => {
      if (asig.codigo == this.mySelection[0]) {
        this.asignatura = asig;
        this.codigo = this.asignatura.codigo;
        console.log(this.codigo);
      }
    })


  }
/*
  change(e) {
    if (e.selected != false) {
      this.asignatura = this.listAsignaturas[e.index];
      this.codigo = this.asignatura.codigo;
      console.log(this.codigo);
    }
    else {
      this.codigo = undefined;
    }
  }*/




}
