import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { asignatura } from '../modelos/asignatura.model';

@Component({
  selector: 'app-asignar-asig-carrera',
  template: `
  <div class="example-config">
  Ingresar Asignatura para {{ nombreCarrera }}
  </div>
  
  <kendo-grid     
  [kendoGridBinding]="asignaturas" 
  [pageSize]="5"
  [pageable]="true"
  [sortable]="true"
  [filterable]="true"
  [groupable]="true"
  [selectable]="selectableSettings" 
  (selectionChange) = "change($event)"
  [height]="500"
>
<kendo-grid-column field="codigo" title="Codigo" width="80" [filterable]="false">
  </kendo-grid-column>
<kendo-grid-column field="nombre" title="Nombre">
  </kendo-grid-column>
<kendo-grid-checkbox-column ></kendo-grid-checkbox-column>
  </kendo-grid>

<div class="row">
<div class="col-sm-12 example-col">
<kendo-buttongroup  [selection]="'single'" [width]="'70%'">
  <button kendoButton [toggleable]="true"  (click)="asignarACarrera()">Aceptar</button>
  <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
</kendo-buttongroup>
</div>
</div>`,
  styleUrls: ['./asignar-asig-carrera.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class AsignarAsigCarreraComponent implements OnInit {
public nombreCarrera;
public codigoCarrera;
public codigoAsignatura;
public asignatura = new asignatura();
public asignaturas : Array<asignatura>;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    
    this.nombreCarrera= localStorage.getItem('nombreABM');
    this.codigoCarrera= localStorage.getItem('codigoABM');
    this.getAsignaturas();
  }


  public  getAsignaturas(){
    this.apiService.getAsignaturaByCarrera().subscribe((data:  Array<asignatura>) => {
        this.asignaturas  =  data;
    });
   
  }

  change(e){
    this.asignatura =   this.asignaturas[e.index];
    this.codigoAsignatura =  this.asignatura.codigo;
    console.log(this.codigoAsignatura);
  }


  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

  asignarACarrera(){
    this.apiService.asignarAsigCarrera( this.codigoAsignatura, this.codigoCarrera).subscribe(
      data=>{this.router.navigate(['/setingsCarrera']);},err=>{
      alert(err);
      this.router.navigate(['/setingsCarrera']);
    });
  }

}





