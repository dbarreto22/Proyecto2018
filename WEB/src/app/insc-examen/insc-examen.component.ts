import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { examenes } from '../modelos/examenes.model';
import { Examen } from '../modelos/examen.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insc-examen',
  templateUrl: './insc-examen.component.html',
  styleUrls: ['./insc-examen.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})


export class InscExamenComponent implements OnInit {
  public codigo;
  public examenes:  Observable<Array<examenes>>;
  public examenGrid : Array<examenes>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public idExamen;
  public cedula;
  public loading;

  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();
    this.examenes = this.apiService.getExamenByCedula();

    this.examenes.subscribe(
      (data : Array<examenes>) => {
      this.examenGrid = data,
      this.loading = false;
      console.log(this.examenGrid[0].id)

    },
      ee => {
          apiService.mensajeConError(ee);
          this.loading = false
      }
  )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.loading = true;
    

  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

/*
  public getExamenes() {
    this.apiService.getAllExamen().subscribe((data: examenes[]) => {
      this.examenes = data;
    },
      err => {
        this.apiService.mensajeConError(err);
        this.router.navigate(['/inscExamen']);
      });
  }

  public examenGrid = new Array<Examen>();
  public getExamenGrid() {
    var examen = new Examen();
    console.log(this.examenes);
    this.examenes.forEach(element => {
      examen.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo;
      examen.codigoCarrera = element.asignatura_Carrera.carrera.codigo;
      examen.idCurso = element.id;
      examen.nombreAsignatura = element.asignatura_Carrera.asignatura.nombre;
      examen.nombreCarrera = element.asignatura_Carrera.carrera.nombre;
      this.examenGrid.push(examen);
    });

    console.log(this.examenGrid);
  }
*/

  cancelar() {
    this.router.navigate(['/']);
  }

  change({index}) {
    if (!!index || index == 0) {
      this.idExamen = this.examenGrid[index].id;
      console.log(this.idExamen);
    }
    else {
      this.idExamen = undefined;
    }
  }

  public inscExamen() {
    if (this.idExamen != undefined) {
      this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
      this.apiService.inscripcionCurso(this.cedula, this.idExamen).subscribe(
        data => {
          this.apiService.mensajeSinError(data,3);
          this.router.navigate(['/']);
        },
        err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/inscExamen']);
        });
    }
    else
      alert('Debe seleccionar un examen para continuar.');
  }
}
