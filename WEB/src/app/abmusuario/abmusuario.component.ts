import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-abmusuario',
  templateUrl: './abmusuario.component.html',
  styleUrls: ['./abmusuario.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ABMUsuarioComponent implements OnInit {

@Output() public cedula = new EventEmitter<string>();
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
  });
}

change(e){
  this.usuario =   this.usuarios[e.index];
  this.cedulaSelect =  this.usuario.cedula;
  console.log(this.cedulaSelect);
}




public crearUsuario(){
    this.router.navigate(['/crearUsr']);

}

public eliminarUsuario(){
  this.dialogOpened = true;
}

public confirmarEliminarUsr(){

  this.apiService.deleteUser(this.usuario).subscribe(
    data=>{this.router.navigate(['/setingsUser']);
    alert("Se Elimino Correctamente")
},err=>{
    alert("No se pudo eliminar " + err.message+ err.status);
    this.router.navigate(['/setingsUser']);
});
this.dialogOpened = false;
}

public action() {
  this.dialogOpened = false;
}

public modificarUsuario(){
    localStorage.setItem('cedulaABM', this.cedulaSelect);
    this.router.navigate(['/modificarUsr']);
}

public asignarRol(){
    localStorage.setItem('cedulaABM', this.cedulaSelect);
    this.router.navigate(['/asignarRol']);
}




}
