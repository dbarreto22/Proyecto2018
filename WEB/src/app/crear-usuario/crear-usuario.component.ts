import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { usuario } from '../modelos/usuario.model';
import { StorageService } from '../storage.service';
import 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class CrearUsuarioComponent implements OnInit {

  public DtUsuario = new usuario();



  constructor(public http: HttpClient, private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }


  cancelar() {
    this.router.navigate(['/setingsUser']);
  }

  crearUsuario(cedula, nombre, apellido, mail, password) {
    console.log(apellido);
    this.DtUsuario.cedula = cedula;
    this.DtUsuario.nombre = nombre;
    this.DtUsuario.apellido = apellido;
    this.DtUsuario.email = mail;
    this.DtUsuario.password = password;
    this.apiService.ingresarUsuario(this.DtUsuario).subscribe(
      data => {
        this.apiService.mensajeSinError(data, 1);
      },
      err => {
        this.apiService.mensajeConError(err);
      }
    );
    this.router.navigate(['/setingsUser']);
  }

}
