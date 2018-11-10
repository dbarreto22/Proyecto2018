import { Component, OnInit ,ContentChild, Type, Directive} from '@angular/core';
import { ApiService } from  '../api.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { process, State,filterBy, FilterDescriptor, CompositeFilterDescriptor} from '@progress/kendo-data-query';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
    PageChangeEvent,
    RowArgs, SelectableSettings, SelectableMode
} from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
    selector: 'app-insc-carrera',
    templateUrl: './insc-carrera.component.html',
    styleUrls: ['./insc-carrera.component.css'],
    providers: [ApiService,NgbPaginationConfig, StorageService],
    })

    @Directive({
        selector: '[carreras]'
    })
  export class InscCarreraComponent implements OnInit {

    public codigo;
    public carrera;
    public cedula;
    public carreras:  Array<object> = [];
    public checked = false;
    public filter: CompositeFilterDescriptor;
    selectedValue: any[];
    public checkboxOnly = true;
    public selectableSettings: SelectableSettings;
    public mySelection: any[];


    constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService,
        private storageService: StorageService, private router: Router) {
            this.setSelectableSettings();    
            
        }
       
    ngOnInit() {
        
        this.getCarreras(); 
        this.carreras;
       
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
      
      public  getCarreras(){
        this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
            this.carreras  =  data;
            console.log(this.carreras);
        });
       
    }

    cancelar(){
        this.router.navigate(['/']);
        }

    change(e){
        this.carrera =   this.carreras[e.index];
        this.codigo =  this.carrera.codigo;
        console.log(this.codigo);
      }
     
        public inscCarrerra(){
            this.cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;
            console.log(JSON.parse(localStorage.getItem('session')).usr.cedula);
            this.apiService.inscripcionCarrera( this.cedula, this.codigo).subscribe(
                data=>{this.router.navigate(['/']);
                alert("Se inscribio correctamente" );
            },err=>{
                    alert("No se pudo inscribir " + err.message+ err.status);
                this.router.navigate(['/']);
            });
        }


  }