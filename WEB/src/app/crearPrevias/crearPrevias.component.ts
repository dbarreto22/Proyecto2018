import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';

@Component({
  selector: 'app-crearPrevias',
  templateUrl: './crearPrevias.component.html',
  styleUrls: ['./crearPrevias.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class CrearPreviasComponent implements OnInit {
  public contexto;
  public titulo;
  public nombreCarrera;
  public codigoCarrera;
  public codigoAsignatura;
  public asignatura : asignaturaCarrera;
  public asignaturas: Observable<Array<Object>>;
  public selectAllState: SelectAllCheckboxState = 'unchecked';
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public loading=true;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.setSelectableSettings();
    this.nombreCarrera = localStorage.getItem('nombreCarreraAsignaturaABM');
    this.codigoCarrera = localStorage.getItem('codigoCarreraAsignaturaABM');
    this.asignaturas = this.apiService.getAsignaturaCarreraByCarrera(this.codigoCarrera);
    
    this.asignaturas.subscribe(
        () =>this.loading = false,
        ee => {
          this.loading = false
          apiService.mensajeConError(ee);
        }
    )
    this.contexto=localStorage.getItem('variable1');
    this.definirContexto();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      this.router.navigate(['/'])
    }  
  }

  public definirContexto(){
    if(this.contexto=='1')
    {
      this.titulo='Seleccionar curso madre para ';
    }
    else
      this.titulo='Seleccionar previa ';      
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
        (data: Array<asignaturaCarrera>)=> {
          this.asignatura = data[index];
          this.codigoAsignatura = this.asignatura.id;
      //    alert('putoooos'+JSON.stringify(this.codigoAsignatura));
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
      if(this.contexto=='1'){
        localStorage.setItem('idMadre',this.codigoAsignatura);
        this.selectAllState = 'unchecked';
        this.codigoAsignatura = undefined
        localStorage.setItem('variable1','2');
        this.contexto=2;
        alert('Seleccioné un primer elemento');
      }
      else
      {
        alert('En la seleccion del segundo');
        let idMadre=localStorage.getItem('idMadre');
        let idPrevia=this.codigoAsignatura;
        if(idMadre==undefined || idPrevia==undefined)
        {
          alert('Algo salio mal, debe comenzar de nuevo');
          this.router.navigate(['/setingsCarrera']);
        }
        this.apiService.agregarPrevia(idMadre, idPrevia).subscribe(
        data => {
          this.apiService.mensajeSinError(data,2);
          this.router.navigate(['/setingsCarrera']);
        }, err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/setingsCarrera']);
        });
      }
    }
    else
      alert('Debe seleccionar una asignatura para continuar.');
  }

}





