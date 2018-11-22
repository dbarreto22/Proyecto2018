import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ABMUsuarioComponent } from '../abmusuario/abmusuario.component';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ModificarUsuarioComponent implements OnInit {
  //@Input() public cedula: string;

  public cedula;
  public usuario = new usuario();
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {

    this.cedula = localStorage.getItem('cedulaABM');
    console.log(this.cedula);
    this.getUsuario();
    this.usuario;
  }

  getUsuario() {
    console.log(this.cedula);
    this.apiService.getUsuario(this.cedula).subscribe((data: usuario) => {
      this.usuario = data;
      console.log(this.usuario);
    }, err => {
      //this.loading=false;
      console.log(err.status + err.message);
      if (err.status == 403) {
        alert('Su sesión ha expirado.');
        this.router.navigate(['/login']);
      }
      else
        alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
      this.router.navigate(['/setingsUser']);
    });
  }

  cancelar() {
    this.router.navigate(['/setingsUser']);
  }


  modificarUsuario(nombre: string, apellido: string, mail: string, password: string) {
    if (this.usuario != undefined) {
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.email = mail;
    this.usuario.password = password;

    this.apiService.modificarUser(this.usuario).subscribe(
      data => {
        this.router.navigate(['/setingsUser']);
        alert("No se ha modificado correctamente");
      }, err => {
        //this.loading=false;
        console.log(err.status + err.message);
        if (err.status == 403) {
          alert('Su sesión ha expirado.');
          this.router.navigate(['/login']);
        }
        else
          alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
        this.router.navigate(['/setingsCarrera']);
      });
  }
  else
    alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
  this.router.navigate(['/setingsCarrera']);
  }
}
