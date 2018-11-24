import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { carrera } from '../modelos/carrera.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-abmcarrera',
  templateUrl: './abmcarrera.component.html',
  styleUrls: ['./abmcarrera.component.css'],
  providers: [NgbPaginationConfig, StorageService, ApiService],
})
export class ABMCarreraComponent implements OnInit {

  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carrera: carrera;
  public carreras: Observable<Array<Object>>;
  public codigo;
  public nombreCarrera;
  public loading;


  constructor(public http: HttpClient, private router: Router, private apiService:ApiService) {
    this.setSelectableSettings();
    this.carreras=this.apiService.getAllCarrera()
    this.carreras.subscribe(
      ()=> {
        this.loading=false
      },
      err=>{
        this.loading=false;
        this.apiService.mensajeConError(err);
      }
    )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
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

  change ({index}){
    if (!!index || index == 0) {
      this.carreras.subscribe(
        (data: Array<carrera>)=> {
          this.carrera = data[index];
          this.codigo = this.carrera.codigo;
          this.nombreCarrera = this.carrera.nombre;
          console.log(this.codigo);
        },
        err=>{
          this.apiService.mensajeConError(err);
        }
      )
      
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
     if (this.codigo != undefined) {
       console.log(this.carrera.codigo);
       this.apiService.deleteCarrera(this.carrera.codigo).subscribe(
         data => {
           this.apiService.mensajeSinError(data,4);
         },
         err => {
           this.apiService.mensajeConError(err);
         });
         this.router.navigate(['/']);
         this.dialogOpened = false;
     }
     else
       alert('Debe seleccionar una carrera para continuar.');
  }


}
