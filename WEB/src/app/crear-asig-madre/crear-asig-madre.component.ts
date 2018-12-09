import { Component, OnInit } from '@angular/core';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';
import { Observable } from 'rxjs';
import { SelectAllCheckboxState, SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-crear-asig-madre',
  templateUrl: './crear-asig-madre.component.html',
  styleUrls: ['./crear-asig-madre.component.css']
})
export class CrearAsigMadreComponent implements OnInit {

  public titulo;
  public contexto;
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
    this.skip = event.skip;

  }


  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }


  public definirContexto(){

    this.titulo='Seleccione una Asignatura a la cual se asigna previa, luego siguiente';

}

change() {

  if (this.mySelection.length > 0) {
    this.asignaturas.subscribe(
      (data: Array<asignaturaCarrera>)=> {
        data.forEach(asig=>{
          if(asig.id == this.mySelection[0]){
            this.idMadre = this.mySelection[0];
            console.log(this.idMadre);
          } 
      })
    },
      err=>{
        this.apiService.mensajeConError(err);
      }
    )
  }
  else {
    this.idMadre = undefined;
  }
}

cancelar() {
  this.router.navigate(['/setingsCarrera']);
}

asignarACarrera() {
  if (this.idMadre == undefined) {
     console.log('Segundo elemento ',this.codigoAsignatura);

        alert('Algo salio mal, debe comenzar de nuevo');
        this.router.navigate(['/setingsCarrera']);
      }      
      localStorage.setItem('idMadre', this.idMadre);
      this.router.navigate(['/crearPrevias']);
}


}
