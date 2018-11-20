import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { asignatura } from '../modelos/asignatura.model';

@Component({
  selector: 'app-elegir-carrera',
  templateUrl: './abma.component.html',
  styleUrls: ['./abmasignatura.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class abmAsignaturaComponent implements OnInit {

  public codigo;
  public nombreAsignatura;
  public asignatura :asignatura;
  public cedula;
  public asignaturas:  Array<asignatura>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];
  public dialogOpened = false;


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
      private storageService: StorageService, private router: Router) {
          this.setSelectableSettings();

      }
     
  ngOnInit() {
      this.getAsignaturas(); 
      this.asignaturas;
        
    } 
  
    public setSelectableSettings(): void {
      this.selectableSettings = {
          checkboxOnly: this.checkboxOnly,
          mode: "single",
      };
  }

    public state: State = {
      skip: 0,
      take: 5,
  };
    
       
  public  getAsignaturas(){
    this.apiService.getAllAsignatura().subscribe((data:  Array<asignatura>) => {
        this.asignaturas  =  data;
        console.log(this.asignaturas);
    });
    
}

public action() {
  this.dialogOpened = false;
}

eliminarAsignatura(){
  this.dialogOpened = true;
}


public crearAsignatura(){
  this.router.navigate(['/ingAsignatura']);

}

public eliminarCarrera(){
this.dialogOpened = true;
}



  change(e){
      this.asignatura =   this.asignaturas[e.index];
      this.codigo =  this.asignatura.codigo;
      this.nombreAsignatura = this.asignatura.nombre;
      console.log(this.codigo);
    }

    public modificarAsignatura(){
      localStorage.setItem('codigoAsignaturaABM', this.codigo);
      this.router.navigate(['/modificarAsignatura']);
    }
    
    public confirmarEliminarAsignatura(){
    
      this.apiService.deleteAsignatura(this.asignatura.codigo).subscribe(
        data=>{this.router.navigate(['/setingsAsignatura']);
        alert('Asignatura eliminada correctamente.')
      },err=>{
        alert("No se pudo eliminar " + err.message+ err.status);
        this.router.navigate(['/setingsAsignatura']);
    });
    this.dialogOpened = false;
    }
    


}
