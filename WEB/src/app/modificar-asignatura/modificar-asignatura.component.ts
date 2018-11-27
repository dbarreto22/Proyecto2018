import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { asignatura } from '../modelos/asignatura.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modificar-asignatura',
  templateUrl: './modificar-asignatura.component.html',
  styleUrls: ['./modificar-asignatura.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ModificarAsignaturaComponent implements OnInit {

  public codigo;
  public asignatura : Observable<asignatura>;
  public asignaturamodificada : asignatura;

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.codigo = localStorage.getItem('codigoAsignaturaABM');
    console.log(this.codigo);

    this.asignatura = this.apiService.getAsignatura(this.codigo);
    this.asignatura.subscribe(
      (data : asignatura)=> {
        this.asignaturamodificada = data
        console.log(this.asignaturamodificada);
      },
      err=>{
          this.apiService.mensajeConError(err)}
    )


  }

  ngOnInit() {
  
  }
  cancelar() {
    this.router.navigate(['/setingsAsignatura']);
  }

  modificarAsignatura(nombre: string) {
    if (this.codigo != undefined) {
      this.asignaturamodificada.nombre = nombre;

      this.apiService.modificarAsignatura(this.asignaturamodificada).subscribe(
        data => {
          this.apiService.mensajeSinError(data,5);
        }, err => {
          this.apiService.mensajeConError(err);
        });
        this.router.navigate(['/setingsAsignatura']);
      }
    else
      alert('Debe seleccionar una asignatura para continuar');
    this.router.navigate(['/setingsAsignatura']);
  }
}
