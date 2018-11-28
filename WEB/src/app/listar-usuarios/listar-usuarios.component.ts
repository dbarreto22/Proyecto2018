import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Rol } from '../modelos/rol.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ListarUsuariosComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public usuarios: Observable<Array<Object>>;
  public cedulaSelect: string;
  public usuario = new usuario();
  public dialogOpened = false;
  public nombre;
  public apellido;
  public mail;
  public loading;
  public roles : Array<Rol>;


  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.loading = true;
    this.setSelectableSettings();
    this.usuarios = this.apiService.getAllUser();

    this.usuarios.subscribe(
      () => {
        this.loading = false
      },
      err => {
        this.loading = false;
        this.apiService.mensajeConError(err);
      }
    )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }


  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  change({ index }) {
    this.dialogOpened = true;
    if (!!index || index == 0) {
      this.usuarios.subscribe(
        (data: Array<usuario>) => {
          this.cedulaSelect = data[index].cedula;
          this.nombre = data[index].nombre;
          this.apellido = data[index].apellido;
          this.mail =  data[index].email;
          this.roles = data[index].roles;
          this.usuario =data[index];
          return this.usuario;
        },
        err => {
          this.apiService.mensajeConError(err);
        }
      )

    }
    else {
      this.cedulaSelect = undefined;
    }

    
  }


  public MostrarUsuario() {
    if (this.cedulaSelect != undefined) {
      this.dialogOpened = true;
      //localStorage.setItem('cedulaABM', this.cedulaSelect);
     // this.router.navigate(['/setingsUsr']);
    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }

  public action() {
    this.dialogOpened = false;
  }

}
