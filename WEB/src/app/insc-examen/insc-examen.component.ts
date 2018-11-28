import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { examenes } from '../modelos/examenes.model';
import { Examen } from '../modelos/examen.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insc-examen',
  templateUrl: './insc-examen.component.html',
  styleUrls: ['./insc-examen.component.css'],
  providers: [ApiService, NgbPaginationConfig, StorageService],
})


export class InscExamenComponent implements OnInit {
  public codigo;
  public examenes:  Observable<Array<examenes>>;
  public examenGrid : Array<examenes>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public idExamen;
  public cedula;
  public loading;

  constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
    private storageService: StorageService, private router: Router) {
    this.setSelectableSettings();
    this.examenes = this.apiService.getExamenByCedula();

    this.examenes.subscribe(
      (data : Array<examenes>) => {
      this.examenGrid = data,
      this.loading = false;
      console.log(this.examenGrid[0].id)

    },
      ee => {
          apiService.mensajeConError(ee);
          this.loading = false
      }
  )
  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '4') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
    this.loading = true;
    

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
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.idExamen = this.mySelection[0];
    console.log(this.idExamen);
      
    
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  

  public inscExamen() {
    if (this.idExamen != undefined) {
      this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
      this.apiService.inscripcionCurso(this.cedula, this.idExamen).subscribe(
        data => {
          this.apiService.mensajeSinError(data,3);
          this.router.navigate(['/']);
        },
        err => {
          this.apiService.mensajeConError(err);
          this.router.navigate(['/inscExamen']);
        });
    }
    else
      alert('Debe seleccionar un examen para continuar.');
  }
}
