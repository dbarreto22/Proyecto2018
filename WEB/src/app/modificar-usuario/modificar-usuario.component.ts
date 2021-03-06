import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ModificarUsuarioComponent implements OnInit {

  public cedula;
  public usuario : Observable<usuario>;
  public usuarioModificado : usuario;


  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }

    this.cedula = localStorage.getItem('cedulaABM');
    console.log(this.cedula);
    this.usuario = this.apiService.getUsuario(this.cedula);

    this.usuario.subscribe(
      (data : usuario)=> {
        this.usuarioModificado = data
        console.log(this.usuarioModificado);
      },
      err=>{
          this.apiService.mensajeConError(err)}
    )



  }

  ngOnInit() {
    
    
  }

  cancelar() {
    this.router.navigate(['/setingsUser']);
  }

  modificarUsuario(nombre: string, apellido: string, mail: string, password: string) {
    if (this.usuarioModificado != undefined) {
      this.usuarioModificado.nombre = nombre;
      this.usuarioModificado.apellido = apellido;
      this.usuarioModificado.email = mail;
      this.usuarioModificado.password = password;
      this.apiService.modificarUser(this.usuarioModificado).subscribe(
        data => {
          this.apiService.mensajeSinError(data,5);
        }, err => {
          this.apiService.mensajeConError(err);
        });
    }
    else
      alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
    this.router.navigate(['/setingsUser']);
  }
}
