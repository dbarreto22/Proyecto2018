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
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class CrearUsuarioComponent implements OnInit {

   public DtUsuario  = new usuario();


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
  }


  cancelar(){
    this.router.navigate(['/setingsUser']);
    }

    crearUsuario(cedula, nombre, apellido, mail, password){

    console.log(apellido);
    this.DtUsuario.cedula = cedula;
    this.DtUsuario.nombre = nombre;
    this.DtUsuario.apellido =apellido;
    this.DtUsuario.email= mail;
    this.DtUsuario.password = password;
    this.apiService.ingresarUsuario(this.DtUsuario).subscribe(
        data=>{this.router.navigate(['/setingsUser']);
            alert("Se creo Usuario correctamente");
        },
        err=>{
          //this.loading=false;
          console.log(err.status+err.message);
          if(err.status==403)
          {
            alert('Su sesión ha expirado.');
            this.router.navigate(['/login']);
          }
          else
            alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
            this.router.navigate(['/setingsAsignatura']);
        });
    }

}
