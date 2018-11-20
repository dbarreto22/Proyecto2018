import { Component, OnInit,ContentChild, AfterViewInit, AfterContentInit} from '@angular/core';
import {EstudianteService} from '../estudiante.service';
import { ApiService } from  '../api.service';
import {Curso} from './Curso';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { CompositeFilterDescriptor, State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, SelectableSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { cursos} from '../modelos/cursos.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [ApiService,NgbPaginationConfig, StorageService],
})

export class CursosComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
 

  public idCurso;
  public loading = false;
  public cedula;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public rolElegido;
  public  cursos:  Array<cursos> = [];
  public cursosGrid = new Array<Curso>();
  public state: State = {
    skip: 0,
    take: 10,
  };
  public gridData: GridDataResult = process(this.cursos, this.state);
  
 //private  apiService:  ApiService
 constructor(public http: HttpClient ,config: NgbPaginationConfig, private  apiService:  ApiService
            , private storageService : StorageService, private router: Router,private route: ActivatedRoute) {
              this.setSelectableSettings();
//              this.getCursos();
 }


 ngOnInit() {
  this.getCursos();
  this.getCursosGrid();

  //this.cursosGrid = this.route.snapshot.data.cursos;
  
  //this.cursos;
  this.rolElegido=localStorage.getItem('rolElegido');
 // alert('El rol elegido es '+this.rolElegido);
 document.getSelection();
}

 public setSelectableSettings(): void {
  this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
  };
}

public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.cursosGrid, this.state);
}
  
 public  getCursos(){
  this.loading = true;
     this.apiService.getAllCursos().subscribe((data:cursos[]) => {
       this.loading=false;
       //alert('cosas raras'+JSON.stringify(data[0].asignatura_Carrera.asignatura));
         this.cursos  =  data;
         console.log(data);
         this.getCursosGrid()
     },
    err=>{
      this.loading=false;
      console.log(err.status+err.message);
      if(err.status==403)
      {
        alert('Su sesión ha expirado.');
        this.router.navigate(['/login']);
      }
      else
        alert('Ha sucedido un error al procesar s solicitud, vuelva a intentarlo mas tarde');
    });

 }


public getCursosGrid(){
      this.cursos.forEach(element => {
        var curso= new Curso;
        curso.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo ; 
        curso.codigoCarrera= element.asignatura_Carrera.carrera.codigo;
        curso.idCurso= element.id;
        curso.idAsigCarrera = element.asignatura_Carrera.id;
        curso.nombreAsignatura= element.asignatura_Carrera.asignatura.nombre;
        curso.nombreCarrera=element.asignatura_Carrera.carrera.nombre;
        this.cursosGrid.push(curso);
      });
      console.log(this.cursosGrid);
 }

 cancelar(){
  this.router.navigate(['/']);
  } 
  
 change(e){
  this.idCurso  = this.cursosGrid[e.index].idCurso;
  console.log(this.idCurso);
 }

   public inscCursos(){
    this.cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;
     this.apiService.inscripcionCurso(this.cedula, this.idCurso).subscribe(
      data=>{this.router.navigate(['/inscCursos']);
      alert("Inscripción realizada correctamente");
    },
      err=>{
        alert("No se pudo inscribir " + err.message+ err.status);
        this.router.navigate(['/inscCursos']);}
     );
   }

   public verPrevias(){
     if(this.idCurso!=null){
        localStorage.setItem('idCurso',this.idCurso);
        this.router.navigate(['/grafo']);
      }  
      else alert('Debe seleccionar un curso');
   }
}
