import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings, SelectAllCheckboxState, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';
import { State } from '@progress/kendo-data-query';

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
  public skip = 0;
  public idMadre;
  public idPrevia;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.setSelectableSettings();
    this.nombreCarrera = localStorage.getItem('nombreCarreraAsignaturaABM');
    this.codigoCarrera = localStorage.getItem('codigoCarreraAsignaturaABM');
    this.asignaturas = this.apiService.getAsignaturaCarreraByCarrera(this.codigoCarrera);
    this.idMadre =  localStorage.getItem('idMadre');
    console.log(this.idMadre);
    this.asignaturas.subscribe(
        () =>this.loading = false,
        ee => {
          this.loading = false
          apiService.mensajeConError(ee);
        }
    )
   // this.contexto=localStorage.getItem('variable1');
    this.definirContexto();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      this.router.navigate(['/'])
    }  
  }
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  public definirContexto(){

      this.titulo='Seleccione una Asignatura previa';
 
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }


  change() {
   
    if (this.idMadre!= undefined) {
      this.asignaturas.subscribe(
        (data: Array<asignaturaCarrera>)=> {
          data.forEach(asig=>{
            if(asig.id == this.mySelection[0]){
              this.idPrevia = this.mySelection[0];
            }
        })
      },
        err=>{
          this.apiService.mensajeConError(err);
        }
      )
    }
    else {
      this.idPrevia = undefined;
    }
  }


  cancelar() {
    this.router.navigate(['/setingsCarrera']);
  }

  asignarACarrera() {
    if ( this.idPrevia == undefined) {
          alert('Algo salio mal, debe comenzar de nuevo');
          this.router.navigate(['/setingsCarrera']);
        }
        this.apiService.agregarPrevia(this.idMadre, this.idPrevia).subscribe(
        data => {
          this.apiService.mensajeSinError(data,2);
          this.router.navigate(['/setingsCarrera']);
        }, err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/setingsCarrera']);
        });
      }

}





