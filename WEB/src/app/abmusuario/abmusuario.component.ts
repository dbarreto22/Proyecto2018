import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { usuario } from '../modelos/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-abmusuario',
  templateUrl: './abmusuario.component.html',
  styleUrls: ['./abmusuario.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ABMUsuarioComponent implements OnInit {

  @Output() public cedula = new EventEmitter<string>();
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public usuarios: Observable<Array<Object>>;
  public cedulaSelect: string;
  public usuario = new usuario();
  public dialogOpened = false;
  public loading;

  constructor(public http: HttpClient, private apiService: ApiService,
    private router: Router) {
      this.loading=true;
    this.setSelectableSettings();
    this.usuarios=this.apiService.getAllUser();
    this.usuarios.subscribe(
      ()=> this.loading=false,
      err=>{this.loading=false;
          this.apiService.mensajeConError(err)}
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


  change({index}) {
    if (!!index || index == 0) {
      this.usuarios.subscribe(
        (data: Array<usuario>)=> {
          this.usuario = data[index];
          this.cedulaSelect = this.usuario.cedula;
        },
        err=>{
          this.apiService.mensajeConError(err);
        }
      )
      
    }
    else {
      this.cedulaSelect = undefined;
    }
  }

  public crearUsuario() {
    this.router.navigate(['/crearUsr']);

  }

  public eliminarUsuario() {
    this.dialogOpened = true;
  }

  public confirmarEliminarUsr() {
    if (this.cedulaSelect != undefined) {
      this.apiService.deleteUser(this.usuario).subscribe(
        data => {
          this.apiService.mensajeSinError(data,4);
          this.router.navigate(['/setingsUser']);
        },
        err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/setingsUsers']);
        });
      this.dialogOpened = false;
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }


  public action() {
    this.dialogOpened = false;
  }

  public modificarUsuario() {
    if (this.cedulaSelect != undefined) {
      localStorage.setItem('cedulaABM', this.cedulaSelect);
      this.router.navigate(['/modificarUsr']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

  public asignarRol() {
    if (this.cedulaSelect != undefined) {
      localStorage.setItem('cedulaABM', this.cedulaSelect);
      this.router.navigate(['/asignarRol']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }




}
