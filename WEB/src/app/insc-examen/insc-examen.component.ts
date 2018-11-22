import { Component, OnInit, ContentChild, Type } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State, filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent,
  PageChangeEvent,
  RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { examenes } from '../modelos/examenes.model';
import { Examen } from '../modelos/examen.model';

@Component({
  selector: 'app-insc-examen',
  templateUrl: './insc-examen.component.html',
  styleUrls: ['./insc-examen.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class InscExamenComponent implements OnInit {
  public codigo;
  public examenes: Array<examenes> = [];
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public idExamen;
  public cedula;

  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.examenes;
    this.getExamenes();
    this.getExamenGrid();
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }
  public state: State = {
    skip: 0,
    take: 5,
  };

  public gridData: GridDataResult = process(this.examenes, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.examenGrid, this.state);
  }

  public getExamenes() {
    this.apiService.getAllExamen().subscribe((data: examenes[]) => {
      this.examenes = data;
    },
      err => {
        //this.loading=false;
        console.log(err.status + err.message);
        if (err.status == 403) {
          alert('Su sesión ha expirado.');
          this.router.navigate(['/login']);
        }
        else
          alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
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


  cancelar() {
    this.router.navigate(['/']);
  }

  change(e) {
    if (e.selected != false) {
      this.idExamen = this.examenGrid[e.index].idCurso;
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
          this.router.navigate(['/']);
          alert("Inscripción Realizada correctamente");
        },
        err => {
          //this.loading=false;
          console.log(err.status + err.message);
          if (err.status == 403) {
            alert('Su sesión ha expirado.');
            this.router.navigate(['/login']);
          }
          else
            alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
          this.router.navigate(['/inscCarrera']);
        });
    }
    else
      alert('Debe seleccionar un examen para continuar.');
  }
}
