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
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {}

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
  });
  }

  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

    modificarCarrera(nombre:string){
    
      this.carrera.nombre = nombre;
    
      this.apiService.modificarCarrera(this.carrera).subscribe(
        data=>{this.router.navigate(['/setingsCarrera']);
        alert("Se ha modificado correctamente");
    },err=>{
        alert("No se ha podido modificar " + err.message+ err.status);
        this.router.navigate(['/setingsCarrera']);
    });
    }

}
