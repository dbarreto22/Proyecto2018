import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { cursos } from '../modelos/cursos.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from '../cursos/Curso';

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
  public cursosGrid: Observable<Array<cursos>>;
  public cursosMostrar: Array<Curso>;
  public curso:cursos;


  //private  apiService:  ApiService
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
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

      this.cursosGrid.subscribe(
        (data: Array<cursos>)=> {
          this.curso = data[index];
          this.idCurso = this.curso.id;
          console.log(this.idCurso);
        },
        err=>{
          this.apiService.mensajeConError(err);
        }
      )}}


  public verPrevias() {
    if (this.idCurso != undefined) {
      localStorage.setItem('idCurso', this.idCurso);
      this.router.navigate(['/grafo']);
    }
    else alert('Debe seleccionar un curso');
  }
}
