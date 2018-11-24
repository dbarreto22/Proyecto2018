import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { carrera } from '../modelos/carrera.model';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';

import { CarrerasService } from '../northwind.service';

@Component({
  selector: 'app-abmcarrera',
  templateUrl: './abmcarrera.component.html',
  styleUrls: ['./abmcarrera.component.css'],
  providers: [NgbPaginationConfig, StorageService, CarrerasService],
})
export class ABMCarreraComponent implements OnInit {

  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carrera: carrera;
  public carreras: Array<carrera>;
  public codigo;
  public nombreCarrera;

  public view: Observable<GridDataResult>;
    public state: State = {
        skip: 0,
        take: 5
    };

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.service.query();
    }

  constructor(public http: HttpClient, config: NgbPaginationConfig, private service: CarrerasService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();

    this.view = service;
    this.service.query();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    // this.getCarreras();
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  // public getCarreras() {
  //   this.apiService.getAllCarrera().subscribe((data: Array<carrera>) => {
  //     this.carreras = data;
  //     this.loading = false;
  //     console.log(this.carreras);
  //   },
  //     err => {
  //       this.apiService.mensajeConError(err);
  //       this.router.navigate(['/setingsCarrera']);
  //     });

  // }


  public action() {
    this.dialogOpened = false;
  }


  public crearCarrera() {
    this.router.navigate(['/ingCarrera']);

  }

  public eliminarCarrera() {
    this.dialogOpened = true;
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  change(e) {
    if (e.selected != false) {
      this.carrera = this.carreras[e.index];
      this.codigo = this.carrera.codigo;
      this.nombreCarrera = this.carrera.nombre;
      console.log(this.codigo);
    }
    else {
      this.codigo = undefined;
    }
  }

  public modificarCarrera() {
    if (this.codigo != undefined) {
      localStorage.setItem('codigoABM', this.codigo);
      this.router.navigate(['/modificarCarrera']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

  public carreraAsignatura() {
    if (this.codigo != undefined) {
      localStorage.setItem('codigoCarreraAsignaturaABM', this.codigo);
      localStorage.setItem('nombreCarreraAsignaturaABM', this.nombreCarrera);
      this.router.navigate(['/asignarAsigCarrera']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

  public confirmarEliminarCarrera() {
    // if (this.codigo != undefined) {
    //   console.log(this.carrera.codigo);
    //   this.apiService.deleteCarrera(this.carrera.codigo).subscribe(
    //     data => {
    //       this.apiService.mensajeSinError(data,4);
    //     },
    //     err => {
    //       this.apiService.mensajeConError(err);
    //     });
    //     this.router.navigate(['/']);
    //     this.dialogOpened = false;
    // }
    // else
    //   alert('Debe seleccionar una carrera para continuar.');
  }


}
