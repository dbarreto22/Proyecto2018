import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { asignatura } from '../modelos/asignatura.model';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asignar-asig-carrera',
  templateUrl: './asignar-asig-carrera.component.html',
  styleUrls: ['./asignar-asig-carrera.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class AsignarAsigCarreraComponent implements OnInit {
  public nombreCarrera;
  public codigoCarrera;
  public codigoAsignatura;
  public asignatura = new asignatura();
  public asignaturas: Observable<Array<Object>>;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public loading;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.setSelectableSettings();
    this.loading = true;
    this.asignaturas = this.apiService.getAllAsignatura();
    
    this.asignaturas.subscribe(
        () => this.loading = false,
        ee => {
            apiService.mensajeConError(ee);
            this.loading = false
        }
    )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.nombreCarrera = localStorage.getItem('nombreCarreraAsignaturaABM');
    this.codigoCarrera = localStorage.getItem('codigoCarreraAsignaturaABM');
  
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }


  change({index}) {
   
    if (!!index || index == 0) {
      this.asignaturas.subscribe(
        (data: Array<asignatura>)=> {
          this.asignatura = data[index];
          this.codigoAsignatura = this.asignatura.codigo;
        },
        err=>{
          this.apiService.mensajeConError(err);
        }
      )
    }
    else {
      this.codigoAsignatura = undefined;
    }
  }


  cancelar() {
    this.router.navigate(['/setingsCarrera']);
  }

  asignarACarrera() {
    if (this.codigoAsignatura != undefined) {
      this.apiService.asignarAsigCarrera(this.codigoAsignatura, this.codigoCarrera).subscribe(
        data => {
          this.apiService.mensajeSinError(data,2);
          this.router.navigate(['/setingsCarrera']);
        }, err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/asignarAsigCarrera']);
        });
    }
    else
      alert('Debe seleccionar una asignatura para continuar.');
  }

}





