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
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ModificarCarreraComponent implements OnInit {

  public codigo;
  public carrera  = new carrera();
  constructor(public http: HttpClient , private  apiService:  ApiService, private router: Router) {
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


  getCarrera(){
    console.log(this.codigo);
    this.apiService.getCarrera(this.codigo).subscribe((data: carrera)=> {
      this.carrera  =  data;
      console.log(this.carrera);
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

  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

    modificarCarrera(nombre:string){
      if (this.carrera != undefined) {
      this.carrera.nombre = nombre;
      this.apiService.modificarCarrera(this.carrera).subscribe(
        data=>{this.router.navigate(['/setingsCarrera']);
        alert("Se ha modificado correctamente");
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
