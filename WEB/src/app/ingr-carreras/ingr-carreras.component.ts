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
  templateUrl: './ingr-carreras.component.html',
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
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
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
        data=>{
            this.apiService.mensajeSinError(data,1);    
        },
        err=>{
          this.apiService.mensajeConError(err);
      });
      this.router.navigate(['/setingsCarrera']);
    }

}
