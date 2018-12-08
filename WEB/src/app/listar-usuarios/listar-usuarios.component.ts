import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Rol } from '../modelos/rol.model';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

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
  public roles: Array<Rol>;
  public skip = 0;




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

  public state: State = {
    skip: 0,
    take: 5
  };

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.cedula;
  }

  public setSelectableSettings(): void {

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.usuarios.subscribe((data: Array<usuario>) => {
      data.forEach(usr => {
        if (usr.cedula == this.mySelection[0]) {
          this.usuario = usr;
          this.roles = usr.roles;
          console.log(this.usuario.roles);
        }
      })

    },
      err => {
        this.apiService.mensajeConError(err);
      }
    )

  }

  aceptar() {
    if (this.mySelection.length > 0) {
      this.dialogOpened = true;
    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }

  public MostrarUsuario() {
    console.log(this.mySelection);
    if (this.mySelection.length > 0) {

    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }

  public action() {
    this.dialogOpened = false;
  }

}
