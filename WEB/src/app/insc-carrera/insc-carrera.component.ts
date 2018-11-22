import { Component, OnInit, ContentChild, Type, Directive } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State, filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-insc-carrera',
    templateUrl: './insc-carrera.component.html',
    styleUrls: ['./insc-carrera.component.css'],
    providers: [ApiService, NgbPaginationConfig, StorageService],
})

@Directive({
    selector: '[carreras]'
})
export class InscCarreraComponent implements OnInit {

    public codigo;
    public carrera;
    public cedula;
    public carreras: Array<object> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];
    public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
    public mySelection: any[];


    constructor(public http: HttpClient, config: NgbPaginationConfig, private apiService: ApiService,
        private storageService: StorageService, private router: Router, private route: ActivatedRoute) {
        this.setSelectableSettings();

    }

    ngOnInit() {
        let rolElegido = localStorage.getItem('rolElegido');
        if (rolElegido != '4') {
            alert('El rol actual no puede acceder a esta función.');
            this.router.navigate(['/'])
        }
        this.getCarreras();
        this.carreras;

        //this.getCarreras(); 
        this.carreras = this.route.snapshot.data.cursos;

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

    public getCarreras() {
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
          this.router.navigate(['/inscCarrera']);
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
            this.codigo = undefined;
        }
    }

    public inscCarrerra() {
        if (this.codigo != undefined) {
            this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
            console.log(JSON.parse(localStorage.getItem('session')).usr.cedula);
            this.apiService.inscripcionCarrera(this.cedula, this.codigo).subscribe(
                data => {
                    this.router.navigate(['/']);
                    alert("Se inscribio correctamente");
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
                  this.router.navigate(['/inscCarrera']);
                });
        }
        else
            alert('Debe seleccionar una carrera para continuar.');
    }


}