import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { usuario } from '../modelos/usuario.model';
import { StorageService } from '../storage.service';
import { Rol } from '../modelos/rol.model';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-asociar-rol',
  templateUrl: './asociar-rol.component.html',
  styleUrls: ['./asociar-rol.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class AsociarRolComponent implements OnInit {
  public cedula;
  public usuario: Observable<usuario>;
  public usuarioM: usuario;
  public Allusers: Observable<Array<usuario>>;
  public usuariosConRol = new Array<usuario>();
  public usuarioRol: usuario;
  public roles = new Array<Rol>();
  public rolSelected;
  public show = false;
  public loading;
  public cantidad: number;
  public rolMandar;
  public rolMostrar = [{
    "id": "1",
    "tipo": "Administrador"
  },
  {
    "id": "2",
    "tipo": "Bedelia"
  },
  {
    "id": "3",
    "tipo": "Director"
  },
  {
    "id": "4",
    "tipo": "Estudiante"
  }];

  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {

  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.cedula = localStorage.getItem('cedulaABM');
    ////this.getUsuario();
    this.usuario = this.apiService.getUsuarioRol(this.cedula);

    this.usuario.subscribe(
      (data: usuario) => {
        this.usuarioM = data;
        this.roles = this.usuarioM.roles;
        console.log(this.usuarioM);

      },
      err => {
        this.apiService.mensajeConError(err)

      }
    )
  }


  setShow() {

    this.cantidad = 0;
    console.log(this.roles);

    if (this.roles.length > 0) {
      this.show = true;
    }

  }

  public ChangeRol(value: string) {
    console.log(value);
    this.rolSelected = value;
    this.rolMandar = this.rolSelected.id;
    console.log(this.rolMandar);
  }

  cancelar() {
    this.router.navigate(['/setingsUser']);
  }

  asociarRol() {

    this.apiService.asignarRol(this.cedula, this.rolMandar).subscribe(
      data => {
        this.apiService.mensajeSinError(data, 2);
      }, err => {
        this.apiService.mensajeConError(err);
      });
    this.router.navigate(['/setingsUser']);

  }
}
