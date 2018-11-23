import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { asignatura } from '../modelos/asignatura.model';

@Component({
  selector: 'app-elegir-carrera',
  templateUrl: './abma.component.html',
  styleUrls: ['./abmasignatura.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class abmAsignaturaComponent implements OnInit {

  public codigo;
  public nombreAsignatura;
  public asignatura: asignatura;
  public cedula;
  public asignaturas: Array<asignatura>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];
  public dialogOpened = false;


  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();

  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.getAsignaturas();
    this.asignaturas;

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


  public getAsignaturas() {
    this.apiService.getAllAsignatura().subscribe((data: Array<asignatura>) => {
      this.asignaturas = data;
      console.log(this.asignaturas);
      }, err => {
        this.apiService.mensajeConError(err);
        this.router.navigate(['/setingsAsignatura']);
      });

  }

  public action() {
    this.dialogOpened = false;
  }

  eliminarAsignatura() {
    if (this.codigo != undefined) {
      this.dialogOpened = true;
    }
    else
      alert('Debe seleccionar una asignatura para continuar.');
      this.router.navigate(['/setingsAsignatura']);
  }


  public crearAsignatura() {
    this.router.navigate(['/ingAsignatura']);

  }


  change(e) {
    if (e.selected != false) {
      this.asignatura = this.asignaturas[e.index];
      this.codigo = this.asignatura.codigo;
      this.nombreAsignatura = this.asignatura.nombre;
    }
    else{
      this.codigo=undefined;
    }
  }

  public modificarAsignatura() {
    if (this.codigo != undefined) {
      localStorage.setItem('codigoAsignaturaABM', this.codigo);
      this.router.navigate(['/modificarAsignatura']);
    }
    else
      alert('Debe seleccionar una asignatura para continuar.');

  }

  public confirmarEliminarAsignatura() {
    this.apiService.deleteAsignatura(this.asignatura.codigo).subscribe(
      data => {
        this.apiService.mensajeSinError(data,4);
      },
      err => {
        //this.loading=false;
        this.apiService.mensajeConError(err);
      });
      this.dialogOpened = false;
      this.router.navigate(['/setingsAsignatura']);
  }



}
