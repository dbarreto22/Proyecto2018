import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { StorageService } from '../storage.service';
import { asignaturaCarrera } from '../modelos/asignaturaCarrera.model';
import { asignatura } from '../modelos/asignatura.model';

@Component({
  selector: 'app-listar-cursos-carreras',
  templateUrl: './listar-cursos-carreras.component.html',
  styleUrls: ['./listar-cursos-carreras.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService]
})
export class ListarCursosCarrerasComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codCarrera;
  public listAsignaturaCarrera = new Array<asignaturaCarrera>();
  public listAsignaturas = new Array<asignatura>();
  public asignatura : asignatura;
  public codigo;
  
  constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
    private storageService: StorageService, private router: Router) {
      this.setSelectableSettings();
      
    }

  ngOnInit() {
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.codCarrera = localStorage.getItem('carreraSeleccionada'); 
    this.getAsignaturaCarrerabyCarrera();
    this.getAsignaturas();

  }


  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: "single",
    };
}

getAsignaturaCarrerabyCarrera(){
  this.apiService.getAsignaturaCarreraByCarrera(this.codCarrera).subscribe((data:  asignaturaCarrera[]) => {
    this.listAsignaturaCarrera  =  data;
});
console.log(this.listAsignaturaCarrera);
}

getAsignaturas(){
  this.listAsignaturaCarrera.forEach(element => {
    this.asignatura.codigo = element.asignatura.codigo;
    this.asignatura.nombre = element.asignatura.nombre;
    this.listAsignaturas.push(this.asignatura);
  });
  console.log(this.listAsignaturas);
}

consultar(){
  localStorage.setItem('AsigSeleccionadaCalif', this.codigo);
  this.router.navigate(['/calificaciones']);
}

cancelar(){
  this.router.navigate(['/calificaciones']);
  }






}
