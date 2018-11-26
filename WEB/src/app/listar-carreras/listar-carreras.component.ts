import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { carrera } from '../modelos/carrera.model';
import { usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-listar-carreras',
  templateUrl: './listar-carreras.component.html',
  styleUrls: ['./listar-carreras.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ListarCarrerasComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carreras: Observable<Array<Object>>;
  public usuarios: Observable<Array<usuario>>
  public carrera;
  public codigo;
  public loading;
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
   this.loading= true;
    this.setSelectableSettings();

    this.carreras=this.apiService.getAllCarrera()

    this.carreras.subscribe(
      ()=> {
        this.loading=false
      },
      err=>{
        this.loading=false;
        this.apiService.mensajeConError(err);
        this.router.navigate(['/listarCarreras']);
      }
    )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido == '3' || rolElegido == '1' || rolElegido == '2') {
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


/*  getCarreras() {
    this.apiService.getAllCarrera().subscribe((data: Array<object>) => {
      this.carreras = data;
      console.log(this.carreras);
    },
      err => {
        this.apiService.mensajeConError(err);
        this.router.navigate(['/listarCarreras']);
      });
  }*/

  cancelar() {
    this.router.navigate(['/']);
  }

  change({index}){
    if (!!index || index == 0) {
      this.carreras.subscribe(
        (data: Array<carrera>)=> {
          this.carrera = data[index];
          this.codigo = this.carrera.codigo;
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

  irACurso() {
    if (this.codigo != undefined) {
      localStorage.setItem('carreraSeleccionada', this.codigo);
      this.router.navigate(['/calificacionesCurso']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }



}
