import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { asignatura } from '../modelos/asignatura.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-asignatura',
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
                      <button type="button" class="k-button k-primary" (click)="modificarAsignatura(codigo.value, nombre.value)">
                      Aceptar</button>
                      <button type="button" class="k-button" (click)="cancelar()">Cancelar</button>
                      </div>               
                </form>
            </div>
        </div>
    </div>
</div>
  `,
  styleUrls: ['./modificar-asignatura.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ModificarAsignaturaComponent implements OnInit {

  public codigo;
  public asignatura  = new asignatura();
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.codigo = localStorage.getItem('codigoAsignaturaABM');
    console.log(this.codigo);
    this.getAsignatura();
    this.asignatura;
  }

  getAsignatura(){
    console.log(this.codigo);
    this.apiService.getAsignatura().subscribe((data: asignatura)=> {
      this.asignatura  =  data;
      console.log(this.asignatura);
  });
  }

  cancelar(){
    this.router.navigate(['/setingsCarrera']);
    }

    modificarAsignatura(codigo:string, nombre:string){
      this.asignatura.codigo = codigo;
      this.asignatura.nombre = nombre;
    
      this.apiService.modificarCarrera(this.asignatura).subscribe(
        data=>{this.router.navigate(['/setingsAsignatura']);},err=>{
        alert(err);
        this.router.navigate(['/setingsAsignatura']);
    });
    }


}
