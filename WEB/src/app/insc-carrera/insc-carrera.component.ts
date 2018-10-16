import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-insc-carrera',
  templateUrl: './insc-carrera.component.html',
  styleUrls: ['./insc-carrera.component.css']
})
export class InscCarreraComponent implements OnInit {
  
   public carrera1;

  displayedColumns = ['ID', 'NOMBRE'];
  
  public  carreras:  Array<object> = [
  {id: 2, Nombre: 'Carrera 2'},
  {id: 3, Nombre: 'Carrera 3'},
  {id: 4, Nombre: 'Carrera 4'}];
  
  //private  apiService:  ApiService
  constructor() { }
  ngOnInit() {
    this.carreras;
    //  this.getCarreras();
  }
  /*public  getCarreras(){
      this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
          this.carreras  =  data;
          //console.log(data);
      });
  }*/
}