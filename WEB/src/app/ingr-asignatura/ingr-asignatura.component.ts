import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingr-asignatura',
  template: `
<div class="example-config">
  Ingresar Asignatura
</div>
<p>Codigo de Asignatura</p>
<kendo-textbox-container
  (afterValueChanged)="getCodigoIngresado($event)"
  [style.width]="'400px'"
  floatingLabel="Codigo">
  <input kendoTextBox />
</kendo-textbox-container>
<p>Nombre De Asignatura</p>
<kendo-textbox-container
  (afterValueChanged)="getNombreIngresado($event)"
  [style.width]="'400px'"
  floatingLabel="Nombre">
<input kendoTextBox />

</kendo-textbox-container>
<div class="row">
<div class="col-sm-12 example-col">
  <p>Seleccione una Opción</p>
  <kendo-buttongroup [width]="'100%'"  [selection]="'single'">
      <button kendoButton [toggleable]="true"  (click)="insgAsignatura()">Aceptar</button>
      <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
  </kendo-buttongroup>
</div>
</div>
  `,
  styleUrls: ['./ingr-asignatura.component.css']
})
export class IngrAsignaturaComponent implements OnInit {

  public nombreAsigantura;
  public codigoAsignatura;

  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {}

  ngOnInit() {
  }
  getCodigoIngresado(value: string){
    
    this.codigoAsignatura = value;
    }
  
  
  getNombreIngresado(value: string){
    
    this.nombreAsigantura = value;
    }
  
  cancelar(){
    this.router.navigate(['/']);
    }

    insgAsignatura(){
      this.apiService.ingresarAsignatura(this.codigoAsignatura, this.nombreAsigantura).subscribe(
        data=>{this.router.navigate(['/ingAsignatura']);},err=>{
        alert(err);
        this.router.navigate(['/inscCarrera']);
    });
    }
}
