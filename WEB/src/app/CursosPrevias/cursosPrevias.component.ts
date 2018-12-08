import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { cursos } from '../modelos/cursos.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from '../cursos/Curso';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-cursosPrevias',
  templateUrl: './cursosPrevias.component.html',
  //styleUrls: ['./cursos.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})

export class CursosPreviasComponent implements OnInit {

  public idCurso;
  public loading;
  public cedula;
  public checked = false;

  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public rolElegido;
  public cursos: Observable<Array<cursos>>;
  public cursosGrid: Observable<Array<asignaturaCarrera>>;
  public cursosMostrar: Array<Curso>;
  public curso:asignaturaCarrera;


  //private  apiService:  ApiService
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.loading = true;
    this.setSelectableSettings();
    this.cursosGrid = this.apiService.getAllAsignaturaCarrera();
    this.cursosGrid.subscribe(
      () =>
       this.loading = false,
      err => {
        this.apiService.mensajeConError(err)
        this.loading = false;
      }
    )

  }
  ngOnInit() {
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }
  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.cursosGrid.subscribe(
      (data: Array<asignaturaCarrera>) => {
        data.forEach(asig => {
          if (asig.id == this.mySelection[0]) {
            this.curso = asig;
            this.idCurso = this.curso.id;
            console.log(this.idCurso);
          }
        })

      },
      err => {
        this.apiService.mensajeConError(err);
      }
    )
  }


  cancelar() {
    this.router.navigate(['/']);
  }

  

  public verPrevias() {
    if (this.idCurso != undefined) {
      localStorage.setItem('idCurso', this.idCurso);
      this.router.navigate(['/grafo']);
    }
    else alert('Debe seleccionar una Asignatura');
  }
}
