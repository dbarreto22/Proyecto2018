import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { asignatura } from '../modelos/asignatura.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-asignatura',
  templateUrl: './modificar-asignatura.component.html',
  styleUrls: ['./modificar-asignatura.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ModificarAsignaturaComponent implements OnInit {

  public codigo;
  public asignatura  = new asignatura();
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.codigo = localStorage.getItem('codigoAsignaturaABM');
    console.log(this.codigo);
    this.getAsignatura();
    this.asignatura;
  }

  getAsignatura(){
    console.log(this.codigo);
    this.apiService.getAsignatura(this.codigo).subscribe((data: asignatura)=> {
      this.asignatura  =  data;
      console.log(this.asignatura);
  },err=>{
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
  }

  cancelar(){
    this.router.navigate(['/setingsAsignatura']);
    }

  modificarAsignatura(nombre:string){
    this.asignatura.nombre = nombre;
    
    this.apiService.modificarAsignatura(this.asignatura).subscribe(
      data=>{this.router.navigate(['/setingsAsignatura']);
      alert("Se ha modificado correctamente");
    },err=>{
      alert("No se ha podido modificar" + err.message+ err.status);
      this.router.navigate(['/setingsAsignatura']);
    });
  }


}
