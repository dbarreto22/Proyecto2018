import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { carrera } from '../modelos/carrera.model';
import { usuario } from '../modelos/usuario.model';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-listar-carreras',
  templateUrl: './listar-carreras.component.html',
  styleUrls: ['./listar-carreras.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})
export class ListarCarrerasComponent implements OnInit {

  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public carreras: Observable<Array<Object>>;
  public usuarios: Observable<Array<usuario>>
  public carrera;
  public codigo;
  public loading;
  constructor(public http: HttpClient, private apiService: ApiService, private router: Router) {
    this.loading = true;
    this.setSelectableSettings();

    this.carreras = this.apiService.getCarreraByCedula()

    this.carreras.subscribe(
      () => {
        this.loading = false
      },
      err => {
        this.loading = false;
        this.apiService.mensajeConError(err);
        this.router.navigate(['/listarCarreras']);
      }
    )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }

  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }

  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.codigo;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.carreras.subscribe(
      (data: Array<carrera>) => {
        data.forEach(asig => {
          if (asig.codigo = this.mySelection[0]) {
            //this.carrera = asig;
            this.codigo = this.mySelection[0];
            console.log(this.codigo);

          }
        })

      },
      err => {
        this.apiService.mensajeConError(err);
      }
    )
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  

  irACurso() {
    if (this.codigo != undefined) {
      localStorage.setItem('carreraSeleccionada', this.codigo);
      this.router.navigate(['/calificacionesCurso']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }



}
