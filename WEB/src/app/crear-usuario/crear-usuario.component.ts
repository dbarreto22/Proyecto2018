import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-crear-usuario',
  template: `<div class="row example-wrapper">
    <div class="col-xs-12 col-sm-6 offset-sm-3 example-col">
        <div class="card">
            <div class="card-block">
                <form class="k-form">
                    <fieldset>
                        <legend>Ingresar Usuario</legend>
                        <label class="k-form-field">
                            <span>Cedula<span class="k-required">*</span></span>
                            <input name= "cedula" class="k-textbox" placeholder="Nombre" />
                        </label>
                        <label class="k-form-field">
                            <span>Nombre<span class="k-required">*</span></span>
                            <input name= "nombre" class="k-textbox" placeholder="Nombre" />
                        </label>
                        <label class="k-form-field">
                            <span>Apellido<span class="k-required">*</span></span>
                            <input name= "apellido" class="k-textbox" value="Batista" placeholder="Apellido" />
                        </label>
                        <label class="k-form-field">
                        <span>Email <span class="k-required">*</span></span>
                        <input name= "mail" type="email" class="k-textbox" value="" placeholder="mail" />
                        </label>
                        <label class="k-form-field">
                            <span>Password</span>
                            <input name= "password" type="password" class="k-textbox" value="" placeholder="password"/>
                        </label>
                        <div class="text-right">
                      <button type="button" class="k-button">Cancelar</button>
                      <button type="button" class="k-button k-primary">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  `,
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

   public DtUsuario :usuario;


  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
  }



crearUsuario(){

    this.DtUsuario.cedula =document.getElementById("cedula").nodeValue
    console.log(this.DtUsuario.cedula);
}

}
