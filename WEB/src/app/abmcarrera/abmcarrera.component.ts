import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { carrera } from '../modelos/carrera.model';

@Component({
  selector: 'app-abmcarrera',
  templateUrl: './abmcarrera.component.html',
  styleUrls: ['./abmcarrera.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ABMCarreraComponent implements OnInit {

  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carrera: carrera;
  public carreras: Array<carrera>;
  public codigo;
  public nombreCarrera;

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
    this.getCarreras();
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  public getCarreras() {
    this.apiService.getAllCarrera().subscribe((data: Array<carrera>) => {
      this.carreras = data;
      console.log(this.carreras);
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
        this.router.navigate(['/setingsAsignatura']);
      });

  }


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
    this.carrera = this.carreras[e.index];
    this.codigo = this.carrera.codigo;
    this.nombreCarrera = this.carrera.nombre;
    console.log(this.codigo);
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

    if (this.codigo != undefined) {
      console.log(this.carrera.codigo);
      this.apiService.deleteCarrera(this.carrera.codigo).subscribe(
        data => {
          this.router.navigate(['/setingsCarrera']);
          alert("Eliminado Correctamente");
        }, err => {
          alert("No se pudo eliminar " + err.message + err.status);
          this.router.navigate(['/setingsCarrera']);
        });
      this.dialogOpened = false;
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }


}
