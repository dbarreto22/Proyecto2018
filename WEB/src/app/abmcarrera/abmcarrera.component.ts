import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { carrera } from '../modelos/carrera.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-abmcarrera',
  templateUrl: './abmcarrera.component.html',
  styleUrls: ['./abmcarrera.component.css'],
  providers: [NgbPaginationConfig, StorageService, ApiService],
})
export class ABMCarreraComponent implements OnInit {

  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carrera: carrera;
  public carreras: Observable<Array<Object>>;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
 
 


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

  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.codigo;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
   
    this.carreras.subscribe(
    (data: Array<carrera>)=> {
      data.forEach(asig=>{
        if(asig.codigo = this.mySelection[0]){
          this.codigo = asig.codigo;
          this.nombreCarrera = asig.nombre;
          console.log(this.codigo);
          
        }
      })
      
    },
    err=>{
      this.apiService.mensajeConError(err);
    }
  )}


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

  public modificarCarrera() {
    if (this.codigo != undefined) {
      localStorage.setItem('codigoABM', this.codigo);
      this.router.navigate(['/modificarCarrera']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

  public asignarCarreraAsignatura(){
    this.selector=1;
    this.carreraAsignatura();
  }

  public asignarPrevias(){
    this.selector=2;
    localStorage.setItem('variable1','1');
    this.carreraAsignatura()
  }

  public carreraAsignatura() {
    if (this.codigo != undefined) {
      localStorage.setItem('codigoCarreraAsignaturaABM', this.codigo);
      localStorage.setItem('nombreCarreraAsignaturaABM', this.nombreCarrera);
      if(this.selector==1)
        this.router.navigate(['/asignarAsigCarrera']);
      if(this.selector==2)
        this.router.navigate(['/crearPrevias']);  
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

  public confirmarEliminarCarrera() {
     if (this.codigo != undefined) {
       console.log(this.codigo);
       this.apiService.deleteCarrera(this.codigo).subscribe(
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
