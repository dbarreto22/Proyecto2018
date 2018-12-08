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

      this.titulo='Seleccione un curso madre y su previa, luego confirmar';
 
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "multiple",
    };
  }


  change() {
   
    if (this.mySelection.length > 0) {
      this.asignaturas.subscribe(
        (data: Array<asignaturaCarrera>)=> {
          data.forEach(asig=>{
            if(asig.id == this.mySelection[0]){
              this.idMadre = asig.id;
            }
            if(asig.id == this.mySelection[1]){
              this.idPrevia = asig.id;
            }
         // this.asignatura = data[index];
        //  this.codigoAsignatura = this.asignatura.id;
      //    alert('putoooos'+JSON.stringify(this.codigoAsignatura));
        
        })
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
    if (this.idMadre == undefined || this.idPrevia == undefined) {
     
        //localStorage.setItem('idMadre',this.codigoAsignatura);
       // this.selectAllState = 'unchecked';
       // console.log('Primer elemento ',this.codigoAsignatura);
       // this.codigoAsignatura = undefined
        //localStorage.setItem('variable1','2');
      //  this.contexto=2;
  
        console.log('Segundo elemento ',this.codigoAsignatura);
        //let idMadre=localStorage.getItem('idMadre');
        //let idPrevia=this.codigoAsignatura;
    //    if(idMadre==undefined || idPrevia==undefined)
     //   {
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
    
   // else
   //   alert('Debe seleccionar una asignatura para continuar.');
 // }

}





