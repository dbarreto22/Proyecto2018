import { Component, OnInit, Directive } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { State, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SelectableSettings } from '@progress/kendo-angular-grid';
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


    constructor(public http: HttpClient, private apiService: ApiService,
         private router: Router, private route: ActivatedRoute) {
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
            this.apiService.mensajeConError(err);
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
                    this.apiService.mensajeSinError(data,3);
                    this.router.navigate(['/']);
                },
                err => {
                    this.apiService.mensajeConError(err);
                    this.router.navigate(['/inscCarrera']);
                });
        }
        else
            alert('Debe seleccionar una carrera para continuar.');
    }


}