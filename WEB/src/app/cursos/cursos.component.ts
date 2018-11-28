import { Component, OnInit, ContentChild } from '@angular/core';
import { ApiService } from '../api.service';

import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { cursos } from '../modelos/cursos.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from './Curso';
import { anyChanged } from '@progress/kendo-angular-grid/dist/es2015/utils';
const dateFormat = /^\d{2}-\d{2}-\d{4}Z$/;
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
  public curso: cursos;
  public skip = 0;


  //private  apiService:  ApiService
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
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
      err => {
        this.apiService.mensajeConError(err)
        this.loading = false;
      }
    )
  }

  ngOnInit() {
    this.rolElegido = localStorage.getItem('rolElegido');
  }



 reviver( value) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
    
  }

  return value;
}

public text = '{ "date": "2016-04-26Z" }';
public obj = JSON.parse(this.text, this.reviver);


// "object"

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  cancelar() {
    this.router.navigate(['/']);
  }

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
      (data: Array<cursos>) => {
        data.forEach(asig => {
          if (asig.id = this.mySelection[0]) {
            this.reviver(this.curso.date)
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



  public inscCursos() {
    if (this.idCurso != undefined) {
      this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
      this.apiService.inscripcionCurso(this.idCurso).subscribe(
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
