import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ListarUsuariosComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public usuarios:  Array<usuario> = [];
  public cedulaSelect :string;
  public usuario = new usuario();
  public dialogOpened = false;
constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
  private storageService: StorageService, private router: Router) {
      this.setSelectableSettings();
    
      
  }

  ngOnInit() {
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='1')
    {
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


public  getusuarios(){
  this.apiService.getAllUser().subscribe((data:  Array<usuario>) => {
      this.usuarios  =  data;
      console.log(this.usuarios);
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
    this.router.navigate(['/listarUsuarios']);
  });
}

change(e){
  if (e.selected != false) {
    this.usuario =   this.usuarios[e.index];
  this.cedulaSelect =  this.usuario.cedula;
  console.log(this.cedulaSelect);
   this.dialogOpened = true;
  }
  else {
    this.cedulaSelect = undefined;
  }
}


public MostrarUsuario(){
  if (this.cedulaSelect != undefined) {
    localStorage.setItem('cedulaABM', this.cedulaSelect);
  this.router.navigate(['/modificarUsr']);
}
else
  alert('Debe seleccionar un usuario para continuar.');
}

public action() {
  this.dialogOpened = false;
}

}
