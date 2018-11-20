import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { State, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import { SelectableSettings} from '@progress/kendo-angular-grid';
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
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
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
      },
      err=>{
        //this.loading=false;
        console.log(err.status+err.message);
        if(err.status==403)
        {
          alert('Su sesión ha expirado.');
          this.router.navigate(['/login']);
        }
        else
          alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
          this.router.navigate(['/setingsAsignatura']);
      });
    this.dialogOpened = false;
    }
    


}
