import { Component, OnInit,ContentChild } from '@angular/core';
import {EstudianteService} from '../estudiante.service';
import { ApiService } from  '../api.service';
import {Curso} from './Curso';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [ApiService,NgbPaginationConfig],
})

export class CursosComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
  public cedula = 3891104;
  public idCurso;
  carrera;
  token;
  pager: any = {};
  selectedValue: any[];
   pagedItems: any[];
   error = '';
   page = 1;
   collectionSize;
 displayedColumns = ['ID', 'NOMBRE'];
 
 public  carreras:  Array<object> = [];
 
 //private  apiService:  ApiService
 constructor(config: NgbPaginationConfig, private  apiService:  ApiService) {

 }

 ngOnInit() {
   this.carreras;
   this.getCarreras();
 
 }

 setPage(page: number) {
   if (page < 1 || page > this.pager.totalPages) {
       return;
   }
   if (isNaN(page)) {
       page = 1;
   }

   this.pager = this.apiService.getPager(this.carreras.length, page);

   this.pagedItems = this.carreras.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


 public  getCarreras(){
     this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
         this.carreras  =  data;
         console.log(data);
     });
 }

 change(e, type){
   console.log(e.checked);
   console.log(type);
//   if(e.checked){
     this.selectedValue.push(type);
       this.idCurso = type;
       console.log(this.idCurso);
 }
/*
   else{
    let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.carrera);
    this.codigo = updateItem;
    console.log(this.codigo);
    let index = this.selectedValue.indexOf(updateItem);

    this.selectedValue.splice(index, 1);
   }

 }

 findIndexToUpdate(type) { 
       return type.carreras === this;
   }*/

   public inscCarrerra(){
  // console.log(this.selectedValue[0]);
   //  this.idCurso = this.selectedValue[0];
     this.apiService.inscripcionCurso(this.token,this.cedula, this.idCurso).subscribe();
   }
}