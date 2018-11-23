import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { carrera } from '../modelos/carrera.model';

@Component({
  selector: 'app-modificar-carrera',
  templateUrl: './modificar-carrera.component.html',
  styleUrls: ['./modificar-carrera.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ModificarCarreraComponent implements OnInit {

  public codigo;
  public carrera = new carrera();
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }

  }

  ngOnInit() {
    this.codigo = localStorage.getItem('codigoABM');
    console.log(this.codigo);
    this.getCarrera();
    this.carrera;
  }


  getCarrera() {
    console.log(this.codigo);
    this.apiService.getCarrera(this.codigo).subscribe((data: carrera) => {
      this.carrera = data;
      console.log(this.carrera);
    },
    err => {
      this.apiService.mensajeConError(err);
      this.router.navigate(['/setingsCarrera']);
    });
  }

  cancelar() {
    this.router.navigate(['/setingsCarrera']);
  }

  modificarCarrera(nombre: string) {
    if (this.carrera != undefined) {
      this.carrera.nombre = nombre;
      this.apiService.modificarCarrera(this.carrera).subscribe(
        data => {
          this.apiService.mensajeSinError(data, 5);
        },
        err => {
          this.apiService.mensajeConError(err);
        });
      this.router.navigate(['/setingsCarrera']);
    }
    else
      alert('Debe seleccionar una carrera para continuar');
    this.router.navigate(['/setingsCarrera']);
  }
}
