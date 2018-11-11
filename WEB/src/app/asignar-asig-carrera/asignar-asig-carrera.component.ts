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
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    
    this.nombreCarrera= localStorage.getItem('nombreABM');
    this.codigoCarrera= localStorage.getItem('codigoABM');
    this.getAsignaturas();
  }


  public  getAsignaturas(){
    this.apiService.getAsignaturaByCarrera(this.codigoCarrera).subscribe((data:  Array<asignatura>) => {
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
      data=>{this.router.navigate(['/setingsCarrera']);
      alert("Asignado Correctamente");
    },err=>{
      alert("No se pudo asignar" + err.message+ err.status);
      this.router.navigate(['/setingsCarrera']);
    });
  }

}





