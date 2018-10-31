import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
