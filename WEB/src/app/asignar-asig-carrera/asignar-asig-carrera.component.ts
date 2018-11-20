import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { asignatura } from '../modelos/asignatura.model';

@Component({
  selector: 'app-asignar-asig-carrera',
  templateUrl: './asignar-asig-carrera.component.html',
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
    private storageService: StorageService, private router: Router) { 
      this.getAsignaturas();
      this.asignaturas;
    }

  ngOnInit() {
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.nombreCarrera= localStorage.getItem('nombreCarreraAsignaturaABM');
    this.codigoCarrera= localStorage.getItem('codigoCarreraAsignaturaABM');
    this.getAsignaturas();
    this.asignaturas;
  }


  public  getAsignaturas(){
    this.apiService.getAllAsignatura().subscribe((data:  Array<asignatura>) => {
        this.asignaturas  =  data;
        console.log(this.asignaturas);
    });

    console.log(this.asignaturas);
   
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
      data=>{this.router.navigate(['/setingsCarrera']);
      alert("Asignado Correctamente");
    },err=>{
      alert("No se pudo asignar" + err.message+ err.status);
      this.router.navigate(['/setingsCarrera']);
    });
  }

}





