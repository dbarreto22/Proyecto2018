import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import {Curso} from './Curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers:[ApiService]
})


export class CursosComponent implements OnInit {
  //cursos:  Array<object>;


  displayedColumns = ['ID', 'NOMBRE'];
  
  public  cursos :  Array<object> = [
    {id: 1, name: 'Calculo 1'},
    {id: 2, name: 'Calculo 2'},
    {id: 3, name: 'Fisica 1'},
    {id: 4, name: 'Gal 1'},
    {id: 5, name: 'Sistemas Operativos 2'},
    {id: 6, name: 'Infraestructuras'},
    {id: 7, name: 'Matematica Discreta 1'},
    {id: 8, name: 'Logica 1'},
    {id: 9, name: 'Matematica discreta 2'},
    {id: 10, name: 'Gal 2'},
    {id: 11, name: 'Caluclo 3'},
    {id: 12, name: 'Ecuaciones diferenciales'},
    {id: 13, name: 'Programacion 1'},
    {id: 14, name: 'Programacion 2'},
    {id: 15, name: 'Programacion 4'},
    {id: 16, name: 'Sistemas operativos'},
    {id: 17, name: 'Programacion 3'},
    {id: 18, name: 'Proyecto'},
    {id: 19, name: 'Taller de informacion geografica'},
    {id: 20, name: 'Competencias roboticas'}];
  
  //private  apiService:  ApiService
  constructor() { }
  ngOnInit() {
    this.cursos;
    //  this.getCarreras();
  }
inscripcionCurso(id, nombre) 
{
    window.confirm('Desea inscribirse a: ' + nombre);//.valueOf()?this.apiService.inscripcionCarrera(nombre,id):null;
}
  /*public  getCarreras(){
      this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
          this.carreras  =  data;
          //console.log(data);
      });
  }*/
}
