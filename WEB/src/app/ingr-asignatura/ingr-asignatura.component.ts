import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { asignatura } from '../modelos/asignatura.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingr-asignatura',
  templateUrl: './ingr-asignatura.component.html',
  styleUrls: ['./ingr-asignatura.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})

export class IngrAsignaturaComponent implements OnInit {

  public nombreAsignatura;
  public codigoAsignatura;

  public DtAsignatura = new asignatura();

  constructor(public http: HttpClient , private  apiService:  ApiService, private router: Router) {}

  ngOnInit() {
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }

  getCodigoIngresado(value:String){
  
    this.codigoAsignatura = value;
   
    }
  
  
  getNombreIngresado(value:String){
    
    this.nombreAsignatura = value;
    }
  
  cancelar(){
    this.router.navigate(['/setingsAsignatura']);
    }

    insgAsignatura(){
      this.DtAsignatura.codigo = this.codigoAsignatura;
      this.DtAsignatura.nombre = this.nombreAsignatura;

      this.apiService.ingresarAsignatura(this.DtAsignatura).subscribe(
        data=>{
          this.apiService.mensajeSinError(data,1);
        },
        err=>{
            this.apiService.mensajeConError(err);
    });
    this.router.navigate(['/setingsAsignatura']);
  }
}
