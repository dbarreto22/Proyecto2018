import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { usuario } from '../modelos/usuario.model';

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
  public usuarios: Array<usuario> = [];
  public cedulaSelect: string;
  public usuario = new usuario();
  public dialogOpened = false;
  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private router: Router) {
    this.setSelectableSettings();


  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.getusuarios();
    this.usuarios;
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  public state: State = {
    skip: 0,
    take: 5,
  };


  public getusuarios() {
    this.apiService.getAllUser().subscribe((data: Array<usuario>) => {
      this.usuarios = data;
      console.log(this.usuarios);
    }, err => {
      if (err.status == 403) {
        alert('Su sesión ha expirado.');
        this.router.navigate(['/login']);
      }
      else {
        alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde' + err);
      }
    });
  }

  change(e) {
    if (e.selected != false) {
      this.usuario = this.usuarios[e.index];
      this.cedulaSelect = this.usuario.cedula;
    }
    else {
      this.cedulaSelect = undefined;
    }
    console.log(this.cedulaSelect);
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
          this.router.navigate(['/setingsUser']);
          alert("Se Elimino Correctamente")
        },
        err => {
          //this.loading=false;
          console.log(err.status + err.message);
          if (err.status == 403) {
            alert('Su sesión ha expirado.');
            this.router.navigate(['/login']);
          }
          else
            alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
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
