import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-carreras',
  templateUrl: './listar-carreras.component.html',
  styleUrls: ['./listar-carreras.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ListarCarrerasComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carreras: Array<object> = [];
  public carrera;
  public codigo;
  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.getCarreras();
    this.carreras;
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }


  getCarreras() {
    this.apiService.getAllCarrera().subscribe((data: Array<object>) => {
      this.carreras = data;
      console.log(this.carreras);
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
        this.router.navigate(['/listarCarreras']);
      });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  change(e) {
    if (e.selected != false) {
      this.carrera = this.carreras[e.index];
      this.codigo = this.carrera.codigo;
      console.log(this.codigo);
    }
    else {
      this.carrera = undefined;
    }
  }

  irACurso() {
    if (this.codigo != undefined) {
      localStorage.setItem('carreraSeleccionada', this.codigo);
      this.router.navigate(['/listarCarreras']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }



}
