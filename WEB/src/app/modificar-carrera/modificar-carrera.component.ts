import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { carrera } from '../modelos/carrera.model';

@Component({
  selector: 'app-modificar-carrera',
  template: `
  
  <div class="row example-wrapper">
    <div class="col-xs-40 col-sm-6 offset-sm-3 example-col">
        <div class="card">
            <div class="card-block">
                <form class="k-form">
                    <fieldset>
                        <legend>Modificar Carrera</legend>
                        <label class="k-form-field">
                            <span>Codigo</span>
                            <input #codigo   [(ngModel)]="carrera.codigo" [ngModelOptions]="{standalone: true}" class="k-textbox"  />
                        </label>
                        <label class="k-form-field">
                            <span>Nombre</span>
                            <input  #nombre  [(ngModel)]="carrera.nombre" [ngModelOptions]="{standalone: true}" class="k-textbox"  />
                        </label>
                    </fieldset>
                    <div class="text-right">
                      <button type="button" class="k-button k-primary" (click)="modificarCarrera(codigo.value, nombre.value)">
                      Aceptar</button>
                      <button type="button" class="k-button" (click)="cancelar()">Cancelar</button>
                      </div>               
                </form>
            </div>
        </div>
    </div>
</div>
  `,
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
    this.apiService.getCarrera().subscribe((data: carrera)=> {
      this.carrera  =  data;
      console.log(this.carrera);
  });
  }

  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

    modificarCarrera(codigo:string, nombre:string){
      this.carrera.codigo = codigo;
      this.carrera.nombre = nombre;
    
      this.apiService.modificarCarrera(this.carrera).subscribe(
        data=>{this.router.navigate(['/setingsCarrera']);},err=>{
        alert(err);
        this.router.navigate(['/setingsCarrera']);
    });
    }

}
