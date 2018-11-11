import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ABMUsuarioComponent } from '../abmusuario/abmusuario.component';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})
export class ModificarUsuarioComponent implements OnInit {
  //@Input() public cedula: string;

  public cedula;
  public usuario  = new usuario();
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
      
     }

  ngOnInit() {

      this.cedula = localStorage.getItem('cedulaABM');
      console.log(this.cedula);
      this.getUsuario();
      this.usuario;
  }

getUsuario(){
  console.log(this.cedula);
  this.apiService.getUsuario(this.cedula).subscribe((data: usuario)=> {
    this.usuario  =  data;
    console.log(this.usuario);
});
}

cancelar(){
  this.router.navigate(['/setingsUser']);
  }


modificarUsuario(nombre:string , apellido:string, mail:string, password :string){
  
  this.usuario.nombre = nombre;
  this.usuario.apellido =apellido;
  this.usuario.email= mail;
  this.usuario.password = password;

  this.apiService.modificarUser(this.usuario).subscribe(
    data=>{this.router.navigate(['/setingsUser']);
    alert("No se ha modificado correctamente");
},err=>{
        alert("No se ha podido realizar la modificar"  + err.message+ err.status);
    this.router.navigate(['/setingsUser']);
});
}

}
