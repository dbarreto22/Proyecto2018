import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { CompositeFilterDescriptor} from '@progress/kendo-data-query';
import { SelectableSettings} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { carrera } from '../modelos/carrera.model';

@Component({
  selector: 'app-ingr-carreras',
  template: `
  <div class="example-config">
    Crear Carrera
  </div>

  <div class="col-xs-12 col-sm-12 example-col">
  <kendo-textbox-container floatingLabel="Codigo" >
    <input  #codigo (keyup)=getCodigoIngresado(codigo.value) kendoTextBox />
  </kendo-textbox-container>
</div>
<hr/> 

    <div class="col-xs-12 col-md-12 example-col">
    <kendo-textbox-container floatingLabel="Nombre" >
    <input  #nombre (keyup)=getNombreIngresado(nombre.value) kendoTextBox />
  </kendo-textbox-container>
</div>
<hr/> 
<hr/> 

<div class="row">
<div class="col-sm-12 example-col">
  <kendo-buttongroup  [selection]="'single'" [width]="'100%'">
      <button kendoButton [toggleable]="true"  (click)="insgCarrerra()">Aceptar</button>
      <button kendoButton [toggleable]="true"  (click)="cancelar()">Cancelar</button>
  </kendo-buttongroup>
</div>
</div>
  `,
  styleUrls: ['./ingr-carreras.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class IngrCarrerasComponent implements  OnInit {

  public codigoCarrera;
  public nombreCarrera;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
      private storageService: StorageService, private router: Router) {

          
      }
     
  ngOnInit() {
      
    }    


  getCodigoIngresado(value:string){
  
    this.codigoCarrera = value;
   
    }
  
  
  getNombreIngresado(value:string){
    
    this.nombreCarrera = value;
    }
  
  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

    public DtCarrera = new carrera();
    insgCarrerra(){

      console.log(this.codigoCarrera);
      console.log(this.nombreCarrera);

      this.DtCarrera.codigo = this.codigoCarrera;
      this.DtCarrera.nombre = this.nombreCarrera;

      console.log(this.DtCarrera);
      this.apiService.ingresarCarrera(this.DtCarrera).subscribe(
        data=>{this.router.navigate(['/ingCarrera']);},err=>{
        alert(err);
        this.router.navigate(['/ingCarrera']);
    });
    }

}
